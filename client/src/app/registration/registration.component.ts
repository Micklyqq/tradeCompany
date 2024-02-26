import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {Router, RouterLink} from "@angular/router";
import {NgIf} from "@angular/common";
import {PhoneInputDirective} from "../directives/phone-input.directive";

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [
    NgIf,
    ReactiveFormsModule,
    RouterLink,
    PhoneInputDirective
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit{
  regForm:FormGroup = new FormGroup({});

  submitted = false;


  error = '';
  constructor(private formBuilder:FormBuilder,private authService:AuthService,private router:Router) {
  }

  ngOnInit(){
    this.regForm = this.formBuilder.group({
      email:['', [Validators.required, Validators.email, Validators.maxLength(64),Validators.minLength(6)]],
      password:['',[Validators.required, Validators.maxLength(32),Validators.minLength(6)]],
      firstname:['',[Validators.required,Validators.maxLength(64)]],
      lastname:['',[Validators.required,Validators.maxLength(64)]],
      phone:['',[Validators.required]]
    })
  }

  onSubmit() {
    this.submitted=true;
    if (this.regForm.valid) {
      this.authService.userReg(this.regForm.value).subscribe(
        (data: any) => {
          localStorage.setItem("token",data.token);
          this.router.navigate(['/offices'])
        },
        (error) => {
          if(error && error.error && error.error.message){
            this.error = error.error.message;
            this.submitted = false;
          }

        }
      );
    }
  }
}
