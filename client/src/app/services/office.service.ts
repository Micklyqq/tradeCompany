import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable, Subject, tap} from "rxjs";
import {CreateOffice, Office} from "../interfaces/office";

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  private officeListChanged = new Subject<void>;

  constructor(private http:HttpClient) {}

  officeApi = environment.apiUrl+"/offices"
  getOfficesList():Observable<Office[]>{
    return this.http.get<Office[]>(this.officeApi)
  }

  getOneOffice(officeId:number):Observable<Office>{
    return this.http.get<Office>(this.officeApi+"/"+officeId)
  }

  createOffice(officeData:CreateOffice){
    return this.http.post(this.officeApi,officeData).pipe(
      tap(()=>{
        this.officeListChanged.next();
      })
    );
  }

  onOfficeListChanged(){
    return this.officeListChanged.asObservable();
  }
}
