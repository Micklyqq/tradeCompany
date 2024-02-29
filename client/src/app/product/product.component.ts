import {ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../services/product.service";
import {Product, ProductResponse, UpdateProduct} from "../interfaces/product";
import {ActivatedRoute} from "@angular/router";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {SalesService} from "../services/sales.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../dialogs/add-product-dialog/add-product-dialog.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HasRoleDirective} from "../directives/has-role.directive";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    CurrencyPipe,
    MatProgressSpinner,
    HasRoleDirective
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{


  constructor(private productService:ProductService,
              private route:ActivatedRoute,
              private formBuilder:FormBuilder,
              private saleService:SalesService,
              public dialog:MatDialog
              ) {  }

  @Input() officeId:number | undefined;

  // @Output() productAdded = new EventEmitter<ProductResponse>;

  productDefaultLogo = '../../assets/img/product-default.png'

  products:ProductResponse[] | undefined;

  isLoading = true;


  ngOnInit() {
    if(this.officeId){
      this.saleService.onSaleListChanged().subscribe(()=>{
        this.refreshProducts(this.officeId);
      })
      this.productService.onProductListChanged().subscribe(()=>{
        this.refreshProducts(this.officeId);
      })
      this.productService.getAllProducts(this.officeId).subscribe((data)=>{
        this.products = data;
        this.isLoading = false;
      });


    }
  }

openDialog(dialogName:string,productId:number|null=null){
     this.dialog.open(AddProductDialogComponent,{
      data:{dialogName:dialogName,officeId:this.officeId,productId:productId},
       width:'600px'
    })
}

  deleteProduct(productId:number){
    this.productService.delProduct(productId).subscribe(data=>{
      this.products = this.products?.filter(item=>item.id!==Number(data.productId));
    });
  }

  refreshProducts(officeId:any){
    this.productService.getAllProducts(officeId).subscribe((data)=>{
      this.isLoading = true;
      this.products = data
      this.isLoading = false;
    });
  }


}
