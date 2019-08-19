import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HandleDataService {
  public commonArray = [];
  public user;
  public famID;
  constructor() { }

  findUser(userID) {
    this.commonArray.forEach(element => {
      if (element.UserId === userID) {
        this.user = element.name;
      }
    });
  }
}
