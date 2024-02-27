import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {RoleResponse} from "../interfaces/role";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private http:HttpClient) { }

  getAllRoles():Observable<RoleResponse[]>{
    return this.http.get<RoleResponse[]>(environment.apiUrl+'/roles');
  }
}
