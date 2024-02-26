import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogActions, MatDialogContent, MatDialogRef} from "@angular/material/dialog";
import { DialogSale} from "../../interfaces/dialog";
import {SalesService} from "../../services/sales.service";
import {MatError, MatFormField,MatFormFieldModule} from "@angular/material/form-field";
import {NgForOf, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {ProductService} from "../../services/product.service";
import {ProductResponse} from "../../interfaces/product";
import {MatOption, MatSelect} from "@angular/material/select";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";

@Component({
  selector: 'app-sale-dialog',
  standalone: true,
  imports: [
    MatDialogContent,
    MatFormField,
    ReactiveFormsModule,
    NgIf,
    MatInput,
    MatError,
    MatDialogActions,
    NgForOf,
    MatSelect,
    MatOption,
    MatFormFieldModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDatepickerModule
  ],
  providers:[provideNativeDateAdapter()],
  templateUrl: './sale-dialog.component.html',
  styleUrl: './sale-dialog.component.css'
})
export class SaleDialogComponent implements OnInit{

  constructor(private formBuilder:FormBuilder,
              public dialogRef:MatDialogRef<SaleDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public dialogData:DialogSale,
              private saleService:SalesService,
              private productService:ProductService
              ) {
  }

  products:ProductResponse[] | undefined;
  selectedProduct:ProductResponse | undefined;
  selectedProductId:number | undefined;
  ngOnInit() {
    this.productService.onProductListChanged().subscribe(()=>{
      this.refreshProducts(this.dialogData.officeId);
    })
    this.addSaleForm = this.formBuilder.group(({
      quantity:['',Validators.required],
      date:['',Validators.required],
      productId:['',Validators.required]

    }))
    this.productService.getAllProducts(this.dialogData.officeId).subscribe((data)=>this.products = data);
  }

  submitted = false;

  error = '';

  addSaleForm:FormGroup = new FormGroup({});
  onSubmit(){
    this.submitted = true;
    if(this.dialogData.officeId && this.addSaleForm.valid){
      const data = {
        quantity:parseInt(this.addSaleForm.value.quantity),
        officeId:this.dialogData.officeId,
        date:this.addSaleForm.value.date,
        productId:parseInt(this.addSaleForm.value.productId)
      }
      this.saleService.addSale(data).subscribe(()=>{
        this.refreshProducts(this.dialogData.officeId);
      },(error)=>{
        if(error && error.error && error.error.message){
          this.error = error.error.message;
          this.submitted = false;
          return;
        }
      })

    }

  }

  onProductSelected(productId:number){
  this.selectedProduct = this.products?.find(product=>product.id === productId)
    this.selectedProductId = productId;
  }
  private refreshProducts(officeId:any){
    this.productService.getAllProducts(officeId).subscribe(data=>{
      this.products = data;
      if(this.selectedProductId){
        this.onProductSelected(this.selectedProductId)
      }
    });

  }
}
