import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {Office} from "../interfaces/office";

@Injectable({
  providedIn: 'root'
})
export class OfficeService {

  constructor(private http:HttpClient) {}

  officeApi = environment.apiUrl+"/offices"
  getOfficesList():Observable<Office[]>{
    return this.http.get<Office[]>(this.officeApi)
  }

  getOneOffice(officeId:number):Observable<Office>{
    return this.http.get<Office>(this.officeApi+"/"+officeId)
  }
}
