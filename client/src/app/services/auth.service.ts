import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login,LoginResponse} from "../interfaces/login";
import {Observable, Subject, tap} from "rxjs";
import {environment} from "../../environments/environment.development";
import {Registration, RegistrationResponse} from "../interfaces/registration";
import {ServerMessage} from "../interfaces/server-message";
import {UserResponse, UserUpdate} from "../interfaces/user";
import { jwtDecode } from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private workersListChanged = new Subject<void>()

  authUrl = environment.apiUrl+"/auth/login";
  regUrl = environment.apiUrl+"/auth/registration"
  constructor(private http:HttpClient) { }

  userAuth(user:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.authUrl,user)
  }

  userReg(user:Registration):Observable<RegistrationResponse>{
    return this.http.post<RegistrationResponse>(this.regUrl,user).pipe(
      tap(()=>this.workersListChanged.next())
    );
  }

  deleteWorker(userId:number):Observable<ServerMessage>{
    return this.http.delete<ServerMessage>(environment.apiUrl+'/users/'+userId).pipe(
      tap(()=>this.workersListChanged.next())
    );
  }

  updateWorker(userId:number,userData:UserUpdate):Observable<ServerMessage>{
    return this.http.put<ServerMessage>(environment.apiUrl+'/users/'+userId,userData).pipe(
      tap(()=>this.workersListChanged.next())
    );
  }
  onWorkersListChanged(){
    return this.workersListChanged.asObservable();
  }

  jwtDecode():UserResponse | null{
    const jwt = localStorage.getItem('token');
    if(jwt){
      return jwtDecode(jwt);
    }
    else{
      console.error("JWT token not found");
      return null;
    }

  }

}
