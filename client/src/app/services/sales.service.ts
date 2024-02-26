import { Injectable } from '@angular/core';
import {SaleAdd, SaleResponse, SalesByDate} from "../interfaces/sale";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment.development";
import {Observable, Subject, tap} from "rxjs";
import {TopSellers} from "../interfaces/topSellers";

@Injectable({
  providedIn: 'root'
})
export class SalesService {
  private saleListChanged = new Subject<void>()

  constructor(private http:HttpClient) { }

  salesApi = environment.apiUrl+"/sales/"
  addSale(saleData:SaleAdd):Observable<SaleResponse>{
    return this.http.post<SaleResponse>(this.salesApi,saleData).pipe(
      tap(()=>{
        this.saleListChanged.next();
      })
    );
  }

  getAllSales(officeId:number):Observable<SaleResponse[]>{
    return this.http.get<SaleResponse[]>(this.salesApi+"getAll/"+officeId);
  }

  deleteSale(saleId:number){
    return this.http.delete(this.salesApi+saleId).pipe(
      tap(()=>{
        this.saleListChanged.next();
      })
    );
  }

  getTopSellers(officeId:number){
    return this.http.get<TopSellers[]>(this.salesApi+'topSeller/'+officeId);
  }

  onSaleListChanged():Observable<void>{
    return this.saleListChanged.asObservable();
  }

  getSalesByDate(interval:SalesByDate){
    return this.http.post<SaleResponse[]>(this.salesApi+'salesByDate',interval)
  }
}
