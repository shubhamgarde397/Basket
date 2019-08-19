import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { data } from './data';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/api-calls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
  providers: [ApiCallsService]
})
export class RegisterComponent implements OnInit {
  public familyId: any;
  public name: any;
  public username: any;
  public password: any;
  public show = true;
  public myFormGroup: FormGroup;
  public model: data;
  public modelSubmitted: data;
  public response: any;
  public logindetailslist;

  constructor(
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handleData: HandleDataService,
    public _location: Location
  ) { }

  ngOnInit() {
    this.model = new data(this.familyId, this.name, this.username, this.password);
    this.myFormGroup = this.formBuilder.group({
      familyId: [this.model.familyId, Validators.required],
      name: [this.model.name, Validators.required],
      username: [this.model.username, Validators.required],
      password: [this.model.password, Validators.required],
    });
  }

  login({ value, valid }: { value: data, valid: boolean }) {
    let memberData = { name: value.name, UserId: value.username };
    let loginData = { username: value.username, password: value.password, familyId: value.familyId };
    this.apiCallservice.handleData_New('login/register', 1, 0, { memberData: memberData, loginData: loginData })
      .subscribe((res: any) => {

        if (res.done === 0) {
          alert('Registeration Successful!');
          this.router.navigate(['']);
        }

      });

  }

  back() {
    this._location.back();
  }

}
