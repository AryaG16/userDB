import { Component } from '@angular/core';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent {
  users = [
    {
      name: 'Aryan Bhavsar',
      age: 20,
      phone: 9824990033,
      email: 'a@asdnhjb.com',
      password: 'a2sdki2',
    },
    {
      name: 'Nandini Bhavsar',
      age: 10,
      phone: 8765438221,
      email: 'nand@bha.com',
      password: 'Kis4hsd',
    },
  ];
}
