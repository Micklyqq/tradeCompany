import { Injectable } from '@angular/core';
import {Product, ProductResponse, UpdateProduct} from "../interfaces/product";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable, Subject, tap} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private productListChanged = new Subject<void>();

  warehouseApi = environment.apiUrl+"/warehouse/"
  constructor(private http:HttpClient) { }

  getAllProducts(officeId:number):Observable<ProductResponse[]>{
    return this.http.get<ProductResponse[]>(this.warehouseApi+officeId);
  }
  addProductToWarehouse(officeId:number,product:Product){
   return this.http.post<ProductResponse>(this.warehouseApi+officeId,product).pipe(
     tap(()=>{
       this.productListChanged.next();
     })
   );
  }

  delProduct(productId:number){
    return this.http.delete<{productId:string}>(this.warehouseApi+productId).pipe(
      tap(()=>{
        this.productListChanged.next();
      })
    );
  }

  updateProduct(productId:number,data:UpdateProduct){
   return this.http.put(this.warehouseApi+productId,data).pipe(
     tap(()=>{
       this.productListChanged.next();
     })
   );
  }

  onProductListChanged():Observable<void>{
    return this.productListChanged.asObservable();
  }



}
