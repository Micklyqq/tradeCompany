import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {NgIf} from "@angular/common";
import {Router, RouterLink} from "@angular/router";
import {Subscription} from "rxjs";
import {MatError, MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatDialogActions} from "@angular/material/dialog";
import {MatInputModule} from "@angular/material/input";

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgIf,
    RouterLink,
    MatFormField,
    MatDialogActions,
    MatError,
    MatFormFieldModule, MatInputModule,
  ],
  templateUrl: './auth.component.html',
  styleUrl: './auth.component.css',
})
  export class AuthComponent implements OnInit,OnDestroy{

  authForm:FormGroup = new FormGroup({});

  submitted = false;

  subscription:Subscription[] = [];


    error = '';
    constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) {
    }

    ngOnInit(){
      this.authForm = this.formBuilder.group({
        email:['', [Validators.required, Validators.email, Validators.maxLength(64),Validators.min(6)]],
        password:['',[Validators.required, Validators.maxLength(32),Validators.min(6)]]
      })
    }

  onSubmit() {
      this.submitted=true;
    if (this.authForm.valid) {
     this.subscription.push( this.authService.userAuth(this.authForm.value).subscribe(
       (data: any) => {
         localStorage.setItem("token",data.token);
         this.router.navigate(['/offices']).then(() => {
           window.location.reload();
         });
       },
       (error) => {
         if(error && error.error && error.error.message){
           this.error = error.error.message;
           this.submitted = false;
         }

       }
     ))
    }
  }

  ngOnDestroy() {
      this.subscription.forEach((data)=>data.unsubscribe());
  }
}
