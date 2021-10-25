import { Component, OnInit } from '@angular/core';
import { PhoneBook } from 'src/app/dto/phonebook';
import { PhoneBookService } from 'src/app/services/rest/phonebook.service';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {

  nbCards = 0;
  compilationHead: string[] = [];
  phoneBooksCompilation: Map<string, string[][]> = new Map<string, string[][]>();

  constructor(private phoneBookService: PhoneBookService) { }

  ngOnInit(): void {
    this.phoneBookService.getPhoneBooks().subscribe(
      phoneBooksReceived => this.initTable(phoneBooksReceived)
    )
  }

  initTable(phoneBooks: PhoneBook[]): void {
    this.nbCards = 0;
    phoneBooks.forEach(phoneBook => {
      var from = phoneBook.from.firstName + " " + phoneBook.from.lastName;
      this.insertData(from, phoneBook.data);
    })
  }

  insertData(from: string, content: Map<string, string>[]): void {
    var lines: string[][] = [];
    content.forEach(content_line => {
      var line: string[] = [];
      this.nbCards++;
      for (const [key, value] of Object.entries(content_line)) {
        if (!this.compilationHead.includes(key)) {
          this.compilationHead.push(key);
        }
        line[this.compilationHead.indexOf(key)] = value;
      }
      lines.push(line);
    });
    this.phoneBooksCompilation.set(from, lines);
  }

}
