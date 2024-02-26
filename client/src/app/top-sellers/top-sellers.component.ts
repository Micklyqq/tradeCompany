import {Component, Input, OnInit} from '@angular/core';
import {TopSellers} from "../interfaces/topSellers";
import {SalesService} from "../services/sales.service";
import {OfficeIdService} from "../services/office-id.service";
import {CurrencyPipe, NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-top-sellers',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    CurrencyPipe
  ],
  templateUrl: './top-sellers.component.html',
  styleUrl: './top-sellers.component.css'
})
export class TopSellersComponent implements OnInit{

  constructor(private salesService:SalesService,private officeIdService:OfficeIdService) {
  }

  @Input() officeId:number | undefined;


  topSellers:TopSellers[] | undefined;


  ngOnInit() {

      if(this.officeId){
        this.salesService.getTopSellers(this.officeId).subscribe((data)=>this.topSellers = data);
      }
    }




  protected readonly top = top;
}
