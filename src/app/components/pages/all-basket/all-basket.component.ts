import { Component, OnInit } from '@angular/core';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/api-calls.service';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-all-basket',
  templateUrl: './all-basket.component.html',
  styleUrls: ['./all-basket.component.scss']
})
export class AllBasketComponent implements OnInit {

  public USER;
  public toMembers;
  public itemlist;
  public detailedList;
  public show = false;
  public lucky = true;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public handleData: HandleDataService,
    public _location: Location
  ) {
    this.USER = this.handleData.user;
    this.toMembers = this.handleData.commonArray;
  }
  ngOnInit() {
    this.find();
  }

  find() {
    let value = {};
    value['family'] = this.handleData.famID;
    this.apiCallservice.handleData_New('basket/getAllItems', 1, 0, value)
      .subscribe((res: any) => {
        this.itemlist = res;
      });
  }

  getDetails(data) {
    this.show = !this.show;
    this.detailedList = data;
  }
  back() {
    this.show = !this.show;
  }

  backFast() {
    this._location.back();
  }
}
