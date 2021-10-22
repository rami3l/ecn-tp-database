import { Component, OnInit } from '@angular/core';
import { PhoneBook } from 'src/app/dto/phonebook';
import { PhoneBookService } from 'src/app/services/rest/phonebook.service';

@Component({
  selector: 'app-phonebook',
  templateUrl: './phonebook.component.html',
  styleUrls: ['./phonebook.component.scss']
})
export class PhonebookComponent implements OnInit {

  phoneBooks: PhoneBook[] | undefined;

  constructor(private phoneBookService: PhoneBookService) { }

  ngOnInit(): void {
    this.phoneBookService.getPhoneBooks().subscribe(
      phoneBooksReceived => this.phoneBooks = phoneBooksReceived
    )
  }

  fromFieldToString(from: Map<string, string>): string {
    var display = ""
    from.forEach((key, value) => {
      display += key + ": "
    })
    return "";
  }

}
