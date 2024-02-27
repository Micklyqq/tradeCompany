import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField, MatFormFieldModule} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";
import {ProductService} from "../../services/product.service";
import {DialogProduct, DialogWorkers} from "../../interfaces/dialog";
import {AuthService} from "../../services/auth.service";
import {PhoneInputDirective} from "../../directives/phone-input.directive";

@Component({
  selector: 'app-workers-dialog',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    ReactiveFormsModule,
    MatDialogContent,
    MatFormField,
    MatDialogActions,
    MatFormFieldModule,
    MatInput,
    MatButton,
    MatDialogModule,
    PhoneInputDirective
  ],
  templateUrl: './workers-dialog.component.html',
  styleUrl: './workers-dialog.component.css'
})
export class WorkersDialogComponent implements OnInit{

  constructor(
    private formBuilder:FormBuilder,
    private authService:AuthService,
    public dialogRef:MatDialogRef<WorkersDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogWorkers
  ) {
  }
  submitted = false;



  error = '';

  addUserForm:FormGroup = new FormGroup({});
  updateUserForm:FormGroup = new FormGroup({});

  ngOnInit() {
    this.addUserForm = this.formBuilder.group(({
      email:['', [Validators.required, Validators.email, Validators.maxLength(64),Validators.minLength(6)]],
      password:['',[Validators.required, Validators.maxLength(32),Validators.minLength(6)]],
      firstname:['',[Validators.required,Validators.maxLength(64)]],
      lastname:['',[Validators.required,Validators.maxLength(64)]],
      phone:['',[Validators.required]]
    }));
    this.updateUserForm = this.formBuilder.group(({
      email:['',[Validators.required,Validators.email,Validators.maxLength(64)]],
      password:['',[Validators.required],Validators.minLength(8),Validators.maxLength(32)],
      firstname:['',[Validators.required],Validators.maxLength(32)],
      lastname:['',[Validators.required],Validators.maxLength(32)],
      phone:['',[Validators.required]],
    }))
  }

  onSubmit(){
    this.submitted = true;
    const officeId = this.dialogData.officeId;
    if(officeId && this.addUserForm.valid){
      const data = {
        email:this.addUserForm.value.email,
        password:this.addUserForm.value.password,
        firstname:this.addUserForm.value.firstname,
        lastname:this.addUserForm.value.lastname,
        phone:this.addUserForm.value.phone,
        officeId:officeId
      }
      console.log('yatuta')
      this.authService.userReg(data).subscribe(()=>{

      },(error)=>{
        if(error && error.error && error.error.message){
          this.error = error.error.message;
          this.submitted = false;
        }
      })

    }
  }

  updateSubmit(productId:number){

    const formData = this.updateUserForm.value;
    let dataToSend:any = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] !== '' && formData[key]!==null) {
        dataToSend[key] = formData[key];
      }
    });
    // this.authService.userReg().subscribe(data=>data,(error)=>{
    //   if(error && error.error && error.error.message){
    //     throw new Error(error.error.message);
    //
    //   }
    // });

  }
}
