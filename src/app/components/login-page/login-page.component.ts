import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { login } from './login';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/api-calls.service';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  providers: [ApiCallsService]
})
export class LoginPageComponent implements OnInit {
  public familyId: any;
  public username: any;
  public password: any;
  public show = true;
  public myFormGroup: FormGroup;
  public model: login;
  public modelSubmitted: login;
  public response: any;
  public logindetailslist;

  constructor(
    public formBuilder: FormBuilder,
    public apiCallservice: ApiCallsService,
    public router: Router,
    public handleData: HandleDataService
  ) { }

  ngOnInit() {
    this.model = new login(this.familyId, this.username, this.password);
    this.myFormGroup = this.formBuilder.group({
      familyId: [this.model.familyId, Validators.required],
      username: [this.model.username, Validators.required],
      password: [this.model.password, Validators.required],
    });
  }

  ValidatePassKey(tb) {
    document.getElementById(tb).focus();
  }

  login({ value, valid }: { value: login, valid: boolean }) {
    const username = value.username;
    const password = value.password;
    this.apiCallservice.handleData_New('login/getLoginDetailsbyid', 1, 0, { "famID": value.familyId, "username": username, "password": password })
      .subscribe((res: any) => {
        this.logindetailslist = res.status;
        this.handleData.commonArray = res.userData;
        this.handleData.famID = value.familyId;
        this.handleData.findUser(value.username);
        console.log(this.handleData);
        if (this.logindetailslist === true) {
          this.show = !this.show;
          this.router.navigate(['Home']);
        } else {
          alert('Wrong Credentials..!');
        }
      });

  }

}
