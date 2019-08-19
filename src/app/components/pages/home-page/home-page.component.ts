import { Component, OnInit } from '@angular/core';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Location } from '@angular/common';
@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public USER;
  constructor(public handleData: HandleDataService,
    public _location: Location
  ) {
    this.USER = this.handleData.user;
  }

  ngOnInit() {
  }

  back() {
    this._location.back();
  }

}
