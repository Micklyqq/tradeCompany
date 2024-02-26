import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators} from "@angular/forms";
import {NgIf} from "@angular/common";
import {ProductService} from "../../services/product.service";
import {OfficeIdService} from "../../services/office-id.service";
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "@angular/material/dialog";
import {MatFormField,MatFormFieldModule} from "@angular/material/form-field";
import { DialogProduct} from "../../interfaces/dialog";
import {MatInput} from "@angular/material/input";
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'app-add-product-dialog',
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
  templateUrl: './add-product-dialog.component.html',
  styleUrl: './add-product-dialog.component.css'
})
export class AddProductDialogComponent implements OnInit{

  constructor(
    private formBuilder:FormBuilder,
    private productService:ProductService,
    public dialogRef:MatDialogRef<AddProductDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public dialogData:DialogProduct
    ) {
  }
  submitted = false;



  error = '';

  addProductForm:FormGroup = new FormGroup({});
  updateProductForm:FormGroup = new FormGroup({});

  ngOnInit() {
    this.addProductForm = this.formBuilder.group(({
      name:['',[Validators.required]],
      price:['',[Validators.required]],
      quantity:['',[Validators.required]]
    }));
    this.updateProductForm = this.formBuilder.group(({
      name:[''],
      price:[''],
      quantity:['']
    }))
  }

  onSubmit(){
    this.submitted = true;
    const officeId = this.dialogData.officeId;
    if(officeId && this.addProductForm.valid){
      const data = {
        name:this.addProductForm.value.name,
        price:parseFloat(this.addProductForm.value.price),
        quantity:parseInt(this.addProductForm.value.quantity)
      }
      this.productService.addProductToWarehouse(officeId,data).subscribe(()=>{

      },(error)=>{
        if(error && error.error && error.error.message){
          this.error = error.error.message;
          this.submitted = false;
        }
      })

    }
  }

  updateSubmit(productId:number){

    const formData = this.updateProductForm.value;
    let dataToSend:any = {};
    Object.keys(formData).forEach(key => {
      if (formData[key] !== '' && formData[key]!==null) {
        dataToSend[key] = formData[key];
      }
    });
    this.productService.updateProduct(productId,dataToSend).subscribe(data=>data,(error)=>{
      if(error && error.error && error.error.message){
        throw new Error(error.error.message);

      }
    });

  }
}
