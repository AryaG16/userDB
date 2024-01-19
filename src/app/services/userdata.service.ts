import { Injectable } from '@angular/core';
import { User } from '../model/user.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserdataService {
  private users: User[] = [
    {
      _id: '',
      name: 'Aryan Bhavsar',
      age: 20,
      phone: 9824990033,
      email: 'a@asdnhjb.com',
      password: 'a2sdki2',
    },
    {
      _id: '',
      name: 'Nandini Bhavsar',
      age: 10,
      phone: 8765438221,
      email: 'nand@bha.com',
      password: 'Kis4hsd',
    },
  ];
  private usersUpdated = new Subject<User[]>();

  constructor(private http: HttpClient, private router: Router) {}

  userUpdateListener() {
    return this.usersUpdated.asObservable();
  }

  getUsers() {
    this.http
      .get<{ message: string; users: any }>('http://localhost:3000/api/users')
      .pipe(
        map((response) => {
          return response.users.map((user: any) => {
            return {
              name: user.name,
              age: user.age,
              phone: user.phone,
              email: user.email,
              password: user.password,
              _id: user._id,
            };
          });
        })
      )
      .subscribe((transformedPosts) => {
        this.users = transformedPosts;
        this.usersUpdated.next([...this.users]);
      });
  }

  getUser(id: string) {
    return this.http.get<{
      _id: string;
      name: string;
      age: number;
      phone: number;
      email: string;
      password: string;
    }>('http://localhost:3000/api/users/' + id);
  }

  updateUser(
    _id: string,
    name: string,
    age: number,
    phone: number,
    email: string,
    password: string
  ) {
    const user: User = {
      _id: _id,
      name: name,
      age: age,
      phone: phone,
      email: email,
      password: password,
    };
    this.http
      .put<{ message: string }>('http://localhost:3000/api/users/' + _id, user)
      .subscribe((response) => {
        const updatedUsers = [...this.users];
        const oldUserIndex = updatedUsers.findIndex((p) => p._id === user._id);
        updatedUsers[oldUserIndex] = user;
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
        this.router.navigate(['']);
      });
  }

  deleteUser(userId: string) {
    this.http
      .delete('http://localhost:3000/api/users/' + userId)
      .subscribe(() => {
        const updatedUsers = this.users.filter((user) => user._id !== userId);
        this.users = updatedUsers;
        this.usersUpdated.next([...this.users]);
      });
  }
}
