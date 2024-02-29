import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Office} from "../interfaces/office";
import {OfficeService} from "../services/office.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgIf} from "@angular/common";
import {environment} from "../../environments/environment.development";
import {ProductComponent} from "../product/product.component";
import {PageNotFoundComponent} from "../page-not-found/page-not-found.component";
import {SalesComponent} from "../sales/sales.component";
import {OfficeIdService} from "../services/office-id.service";
import {ImageLoaderService} from "../services/image-loader.service";
import {TopSellersComponent} from "../top-sellers/top-sellers.component";
import {SaleWeekGraphComponent} from "../sale-week-graph/sale-week-graph.component";
import {MatProgressSpinner} from "@angular/material/progress-spinner";
import {WorkersComponent} from "../workers/workers.component";
import {UserResponse} from "../interfaces/user";
import {UserService} from "../services/user.service";

@Component({
  selector: 'app-office-details',
  standalone: true,
  imports: [
    NgIf,
    ProductComponent,
    PageNotFoundComponent,
    SalesComponent,
    TopSellersComponent,
    SaleWeekGraphComponent,
    MatProgressSpinner,
    WorkersComponent,
  ],
  templateUrl: './office-details.component.html',
  styleUrl: './office-details.component.css'
})
export class OfficeDetailsComponent implements OnInit,OnDestroy{

 // @ViewChild(ProductComponent) productComponent!:ProductComponent;
  // @ViewChild(SalesComponent) saleComponent!:SalesComponent;

  office:Office | undefined;

  onImageLoadError:any;

  officeIdFromRoute:number | undefined;

  currentNavElement:string = 'sales';
  dataIsLoading = true;

  director:string | undefined;


  constructor(
    private officeService:OfficeService,
    private route:ActivatedRoute,
    private officeIdService:OfficeIdService,
    private imageLoader:ImageLoaderService,
    private router:Router,
    private userService:UserService,
  ) {  }

  ngOnInit() {
const routeParams =this.route.snapshot.paramMap;
this.officeIdFromRoute = Number(routeParams.get('officeId'));
this.officeIdService.setOfficeId(this.officeIdFromRoute);
   this.officeService.getOneOffice(this.officeIdFromRoute).subscribe(data=>{
     this.office = data;
     this.dataIsLoading = false;
   });
     this.onImageLoadError =  this.imageLoader.onImageLoadError;
     this.userService.getUsersByOfficeId(this.officeIdFromRoute).subscribe((data)=>{
       console.log(data[0].role.name);
       const find =  data.find((item)=>item.role.name==='Директор')

       if(find){
         this.director = find.firstname+' '+find.lastname;
       }
     })
  }

  ngOnDestroy() {
    this.officeIdService.resetOfficeId();
  }

  switchNavigation(name:string){
    this.currentNavElement = name;

  }

  goBack():void{
    this.router.navigate(['..']);
  }


// onSaleAdded(sale:any){
//   this.productComponent.updateProductQuantity(sale.productId,sale.quantity);
// }
//
// onProductAdded(product:ProductResponse){
//     this.saleComponent.updateProductList(product);
// }


  protected readonly environment = environment;
}
