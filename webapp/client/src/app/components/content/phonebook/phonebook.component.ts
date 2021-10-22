import { Component, OnInit } from '@angular/core';
import { PhoneBook } from 'src/app/dto/phonebook';
import { PhoneBookService } from 'src/app/services/rest/phonebook.service';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {

  head: string[] = [];
  data: Map<string, string[][]> = new Map<string, string[][]>();

  constructor(private phoneBookService: PhoneBookService) { }

  ngOnInit(): void {
    this.phoneBookService.getPhoneBooks().subscribe(
      phoneBooksReceived => this.initTable(phoneBooksReceived)
    )
  }

  initTable(phoneBooks: PhoneBook[]): void {
    phoneBooks.forEach(phoneBook => {
      var from = phoneBook.from.firstName + " " + phoneBook.from.lastName;
      this.insertData(from, phoneBook.data);
      console.log(this.data);
    })
  }

  insertData(from: string, content: Map<string, string>[]): void {
    var lines: string[][] = [];
    content.forEach(content_line => {
      var line: string[] = [];
      console.log("content_line:")
      console.log(content_line);
      for (const [key, value] of Object.entries(content_line)) {
        if (!this.head.includes(key)) {
          this.head.push(key);
        }
        line[this.head.indexOf(key)] = value;
      }
      lines.push(line);
    });
    this.data.set(from, lines);
  }

}
