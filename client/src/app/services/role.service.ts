import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {RoleResponse} from "../interfaces/role";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { }


  getAllRoles():Observable<RoleResponse[]>{
    return this.http.get<RoleResponse[]>(environment.apiUrl+'/roles');
  }

  hasRole(params:{roles:string[],officeId:number|null}):boolean{
   const user = this.authService.jwtDecode();

   if(!user){
     return false;
   }

   if(user.officeId===params.officeId && params.roles.some(role=>user.role.name ===role)){
     return true;
   }
   else return user.role.name === 'ADMIN';

  }

}
