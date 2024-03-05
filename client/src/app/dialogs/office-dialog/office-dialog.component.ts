import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
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
import {DialogProduct} from "../../interfaces/dialog";
import {OfficeService} from "../../services/office.service";
import {Subscriber, Subscription} from "rxjs";

@Component({
  selector: 'app-office-dialog',
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
    MatDialogModule
  ],
  templateUrl: './office-dialog.component.html',
  styleUrl: './office-dialog.component.css'
})
export class OfficeDialogComponent implements OnInit,OnDestroy {

  constructor(
    private formBuilder:FormBuilder,
    private officeService:OfficeService,
    public dialogRef:MatDialogRef<OfficeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogProduct,
  ) {}

  submitted = false;
  error = '';

  subscription:Subscription[] = [];

  addOfficeForm:FormGroup = new FormGroup({});

  ngOnInit() {
    this.addOfficeForm = this.formBuilder.group(({
      name:['',[Validators.required]],
      city:['',[Validators.required]],
      address:['',[Validators.required]]
    }));
  }

  ngOnDestroy() {
    this.subscription.forEach((sub)=>sub.unsubscribe());
  }

  onSubmit(){
    this.submitted = true;
    if(this.addOfficeForm.valid){
      const data = {
        name:this.addOfficeForm.value.name,
        adress:this.addOfficeForm.value.city+','+this.addOfficeForm.value.address
      }
     this.subscription.push(
       this.officeService.createOffice(data).subscribe({
         next:()=>{},
         error:(error)=>{
           if(error && error.error && error.error.message){
             this.error = error.error.message;
             this.submitted = false;
           }
         }
       })
     )

    }
  }



}
