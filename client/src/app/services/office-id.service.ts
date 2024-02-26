import { Injectable } from '@angular/core';
import {Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class OfficeIdService {

  constructor() { }

  officeId = new Subject<number | null>();

  setOfficeId(id:number){
    this.officeId.next(id);
  }

  getOfficeId(){
    return this.officeId.asObservable();
  }

  resetOfficeId(){
    this.officeId.next(null);
  }
}
