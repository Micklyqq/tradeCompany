import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Login,LoginResponse} from "../interfaces/login";
import {Observable} from "rxjs";
import {environment} from "../../environments/environment.development";
import {Registration, RegistrationResponse} from "../interfaces/registration";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.apiUrl+"/auth/login";
  regUrl = environment.apiUrl+"/auth/registration"
  constructor(private http:HttpClient) { }

  userAuth(user:Login):Observable<LoginResponse>{
    return this.http.post<LoginResponse>(this.authUrl,user)
  }

  userReg(user:Registration):Observable<RegistrationResponse>{
    return this.http.post<RegistrationResponse>(this.regUrl,user);
  }
}
