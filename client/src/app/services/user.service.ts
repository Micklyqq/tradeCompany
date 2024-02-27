import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {UserResponse} from "../interfaces/user";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  getUsersByOfficeId(officeId:number):Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(environment.apiUrl+'/offices/workers/'+officeId);
  }
}
