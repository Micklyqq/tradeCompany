import {Component, OnInit} from '@angular/core';
import {UserResponse} from "../interfaces/user";
import {AuthService} from "../services/auth.service";
import {NgIf} from "@angular/common";
import {RoleResponse} from "../interfaces/role";
import {RoleService} from "../services/role.service";
import {Office} from "../interfaces/office";
import {OfficeService} from "../services/office.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit{

  constructor(
    private authService:AuthService,
    private officeService:OfficeService,
    private router:Router,
              ) {
  }

  user:UserResponse | null = null;
  office:Office | undefined;


  ngOnInit() {
    this.user = this.authService.jwtDecode();
    if(this.user){
      this.officeService.getOneOffice(this.user.officeId).subscribe({
        next:(data)=>{
          this.office = data;
        },
        error:()=>{

        }
      })
    }

  }

  goToOffice(id: number | undefined) {
    if(id){
      this.router.navigate([`/offices/${id}`]);
    }
  }
}
