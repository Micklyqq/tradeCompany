import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable} from "rxjs";
import {UserResponse, UserResponsePagination} from "../interfaces/user";
import {ServerMessage} from "../interfaces/server-message";
import {SaleResponsePagination} from "../interfaces/sale";

@Injectable({
  providedIn: 'root'
})
export class UserService {


  constructor(private http:HttpClient) { }

  userApi = environment.apiUrl+'/users/'

  getUsersByOfficeId(officeId:number):Observable<UserResponse[]>{
    return this.http.get<UserResponse[]>(environment.apiUrl+'/offices/workers/'+officeId);
  }

  getUserById(userId:number):Observable<UserResponse>{
    return this.http.get<UserResponse>(environment.apiUrl+'/users/'+userId);
  }

  getPaginationUsers(officeId:number,page:number,limit:number){
    return this.http.get<UserResponsePagination>(`${this.userApi}${officeId}/pagination?page=${page}&limit=${limit}`);
  }

}
