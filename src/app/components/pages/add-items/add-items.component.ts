import { Component, OnInit } from '@angular/core';
import { items } from './items';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiCallsService } from 'src/app/common/services/ApiCalls/api-calls.service';
import { Router } from '@angular/router';
import { HandleDataService } from 'src/app/common/services/Data/handle-data.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-add-items',
  templateUrl: './add-items.component.html',
  styleUrls: ['./add-items.component.scss']
})
export class AddItemsComponent implements OnInit {

  public fromName;
  public toName;
  public date;
  public itemName;
  public quantity;
  public fromPlace;
  public comments;
  public Check;

  public show = true;
  public myFormGroup: FormGroup;
  public model: items;
  public modelSubmitted: items;
  public response: any;
  public USER;
  public toMembers;
  constructor(
    public router: Router,
    public apiCallservice: ApiCallsService,
    public formBuilder: FormBuilder,
    public handleData: HandleDataService,
    public _location: Location
  ) {
    this.USER = this.handleData.user;
    this.toMembers = this.handleData.commonArray;
  }

  ngOnInit() {
    this.model = new items(this.fromName, this.toName, this.date, this.itemName, this.quantity, this.fromName, this.comments, this.Check);
    this.myFormGroup = this.formBuilder.group({
      fromName: [this.handleData.user, Validators.required],
      toName: [this.model.toName, Validators.required],
      date: [this.model.date, Validators.required],
      itemName: [this.model.itemName, Validators.required],
      quantity: [this.model.quantity, Validators.required],
      fromPlace: [this.model.fromPlace, Validators.required],
      comments: [this.model.comments, Validators.required],
      Check: [this.model.Check]
    });
  }

  addItems({ value, valid }: { value: items, valid: boolean }) {
    value['family'] = this.handleData.famID;
    this.apiCallservice.handleData_New('basket/addItem', 1, 0, value)
      .subscribe((res: any) => {
        if (res) {
          alert('Item Added Successfully.')
        }
      });
  }

  back() {
    this._location.back();
  }

}
