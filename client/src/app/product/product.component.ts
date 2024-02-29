import {ChangeDetectionStrategy, Component, DoCheck, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ProductService} from "../services/product.service";
import {
  PaginationRows,
  Product,
  ProductResponse,
  ProductResponsePagination,
  UpdateProduct
} from "../interfaces/product";
import {ActivatedRoute} from "@angular/router";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Observable, Subject} from "rxjs";
import {SalesService} from "../services/sales.service";
import {MatDialog} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../dialogs/add-product-dialog/add-product-dialog.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HasRoleDirective} from "../directives/has-role.directive";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    CurrencyPipe,
    MatProgressSpinner,
    HasRoleDirective,
    MatPaginator
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

  products:PaginationRows[] | undefined;

  isLoading = true;

  totalProducts = 0;
  pageSize = 6;
  pageIndex = 0;


  ngOnInit() {
    if(this.officeId){
      this.saleService.onSaleListChanged().subscribe(()=>{
        this.refreshProducts(this.officeId);
      })
      this.productService.onProductListChanged().subscribe(()=>{
        this.refreshProducts(this.officeId);
      })
      this.productService.getPaginationProducts(this.officeId,this.pageIndex+1,this.pageSize).subscribe((data)=>{
        this.products = data.rows;
        this.totalProducts = data.count
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
    this.productService.delProduct(productId).subscribe(()=>{
    });
  }

  refreshProducts(officeId:any){
    this.productService.getPaginationProducts(officeId,this.pageIndex+1,this.pageSize).subscribe((data)=>{
      this.isLoading = true;
      this.products = data.rows;
      this.totalProducts = data.count;
      this.isLoading = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshProducts(this.officeId);
  }


}
