import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { EMPTY, Subscription } from 'rxjs';
import { User } from '../model/user.model';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  private usersSub: Subscription;
  confirmDelUser: string = '';

  @ViewChild('callAPIDialog') callAPIDialog!: TemplateRef<any>;

  constructor(private userdata: UserdataService, private dialog: MatDialog) {
    this.usersSub = Subscription.EMPTY;
    // this.callAPIDialog=;
  }

  ngOnInit() {
    this.userdata.getUsers();
    this.usersSub = this.userdata
      .userUpdateListener()
      .subscribe((users: User[]) => {
        this.users = users;
      });
  }

  onDelete(userId: string, userName: string) {
    this.confirmDelUser = userName;
    let dialogRef = this.dialog.open(this.callAPIDialog);
    dialogRef.afterClosed().subscribe((result) => {
      if (result !== undefined) {
        if (result === 'yes') {
          this.userdata.deleteUser(userId);
          console.log('User clicked yes.');
        } else if (result === 'no') {
          console.log('User clicked no.');
        }
      }
    });
  }

  ngOnDestroy() {
    this.usersSub.unsubscribe();
  }
}
