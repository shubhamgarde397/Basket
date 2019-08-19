import { Injectable } from '@angular/core';
import { Consts } from '../../consts/const';


@Injectable({
  providedIn: 'root'
})
export class GetFullApiService {

  public data: any;
  public urlno: string = 'http://' + Consts.URL + ':' + Consts.PORT_NUMBER;

  constructor() { }

  appendAPIwithIDS(api, noOfIDs: number, id1?, id2?, id3?) {
    switch (noOfIDs) {
      case 0: return `${this.urlno + '/' + api}`;
      case 1: return `${this.urlno + '/' + api}/${id1}`;
      case 2: return `${this.urlno + '/' + api}/${id1}/${id2}`;
      case 3: return `${this.urlno + '/' + api}/${id1}/${id2}/${id3}`;
      default: return `${this.urlno + '/' + api}`;
    }
  }
}
