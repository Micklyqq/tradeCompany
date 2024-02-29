import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {SalesService} from "../services/sales.service";
import {SaleResponse} from "../interfaces/sale";
import {AsyncPipe, CurrencyPipe, DatePipe, NgForOf, NgIf} from "@angular/common";
import {ProductService} from "../services/product.service";
import {Observable, of} from "rxjs";
import {Product, ProductResponse} from "../interfaces/product";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {MatCard, MatCardContent, MatCardHeader, MatCardTitle} from "@angular/material/card";
import {MatDialog} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../dialogs/add-product-dialog/add-product-dialog.component";
import {SaleDialogComponent} from "../dialogs/sale-dialog/sale-dialog.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {HasRoleDirective} from "../directives/has-role.directive";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    NgIf,
    NgForOf,
    DatePipe,
    AsyncPipe,
    ReactiveFormsModule,
    CurrencyPipe,
    MatCard,
    MatCardHeader,
    MatCardTitle,
    MatCardContent,
    MatProgressSpinner,
    HasRoleDirective,
    MatPaginator
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.css'
})
export class SalesComponent implements OnInit{

  constructor(private saleService:SalesService,private productService:ProductService,public dialog:MatDialog) {  }

  @Input()officeId:number | undefined;

  // @Output() saleAdded = new EventEmitter<any>();


  sales:SaleResponse[] | undefined;



  addSaleFormHidden = true;



  products:ProductResponse[] | undefined;

  totalSales = 0;
  pageSize = 21;
  pageIndex = 0;

  isLoading = true;

  ngOnInit() {
    if(this.officeId){
      this.productService.onProductListChanged().subscribe(()=>{
        this.refreshProducts(this.officeId)
      })
      this.saleService.onSaleListChanged().subscribe(()=>{
        this.refreshSales(this.officeId);
      })
     this.saleService.getPaginationSales(this.officeId,this.pageIndex+1,this.pageSize).subscribe(data=>{
       this.isLoading = true;
       this.sales = data.rows;
       this.totalSales = data.count;
       this.isLoading = false;
     });
   this.productService.getAllProducts(this.officeId).subscribe((data)=>{
     this.isLoading = true;
     this.products = data;
     this.isLoading = false;
   });

    }
    else{
      throw new Error("Не удалось загрузить продажи")
    }
  }

  openDialog(dialogName:string,saleId:number|null=null){
    this.dialog.open(SaleDialogComponent,{
      data:{dialogName:dialogName,officeId:this.officeId,saleId:saleId},
      width:'600px'
    })
  }





  deleteSale(saleId:number){

     return this.saleService.deleteSale(saleId).subscribe(data=>data,(error)=>{
       if(error && error.error && error.error.message){
         throw new Error(error.error.message);
       }
     });

  }


  private refreshProducts(officeId:any){
    this.productService.getAllProducts(officeId).subscribe(data=>{
      this.isLoading = true;
      this.products = data;
      this.isLoading = false;
    });
  }

  private refreshSales(officeId:any){
    this.saleService.getPaginationSales(officeId,this.pageIndex+1,this.pageSize).subscribe((data)=>{
      this.isLoading = true;
      this.sales = data.rows;
      this.totalSales = data.count;
      this.isLoading = false;
    });
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshSales(this.officeId);
  }
}
