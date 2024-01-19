import { Component, OnInit } from '@angular/core';
import { UserdataService } from '../services/userdata.service';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-user-add-edit',
  templateUrl: './user-add-edit.component.html',
  styleUrls: ['./user-add-edit.component.css'],
})
export class UserAddEditComponent implements OnInit {
  user: any;
  private mode = 'create';
  private userId: any;
  constructor(
    private userdata: UserdataService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has('id')) {
        this.mode = 'edit';
        this.userId = paramMap.get('id');
        console.log('id:', this.userId);
        this.userdata.getUser(this.userId).subscribe((response) => {
          console.log(response);
          this.user = {
            _id: response.userExists._id,
            name: response.userExists.name,
            age: response.userExists.age,
            phone: response.userExists.phone,
            email: response.userExists.email,
            password: response.userExists.password,
          };
        });
      } else {
        this.mode = 'create';
        this.userId = '';
      }
    });
  }

  onSaveUser(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === 'create') {
      this.userdata.addUser(
        form.value.name,
        form.value.age,
        form.value.phone,
        form.value.email,
        form.value.password
      );
    } else {
      this.userdata.updateUser(
        this.userId,
        form.value.name,
        form.value.age,
        form.value.phone,
        form.value.email,
        form.value.password
      );
    }
    form.reset();
  }
}
