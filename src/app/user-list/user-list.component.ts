import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { Subscription } from 'rxjs';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  // users = [
  //   {
  //     name: 'Aryan Bhavsar',
  //     age: 20,
  //     phone: 9824990033,
  //     email: 'a@asdnhjb.com',
  //     password: 'a2sdki2',
  //   },
  //   {
  //     name: 'Nandini Bhavsar',
  //     age: 10,
  //     phone: 8765438221,
  //     email: 'nand@bha.com',
  //     password: 'Kis4hsd',
  //   },
  // ];

  users: User[] = [];
  private usersSub: Subscription;

  constructor(private userdata: UserdataService) {
    this.usersSub = Subscription.EMPTY;
  }

  ngOnInit() {
    this.userdata.getUsers();
    this.usersSub = this.userdata
      .userUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  onDelete(postId: string) {
    this.userdata.deleteUser(postId);
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
