import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import { MatFormFieldModule} from "@angular/material/form-field";
import {
  MAT_DATE_RANGE_SELECTION_STRATEGY,
  MatDatepickerModule,
} from "@angular/material/datepicker";
import {provideNativeDateAdapter} from "@angular/material/core";
import {SalesService} from "../services/sales.service";
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {SaleResponse, SalesByDate} from "../interfaces/sale";
import {DateService} from "../services/date.service";
import {DatePipe, NgIf} from "@angular/common";
import {MatInput} from "@angular/material/input";
import {FiveDayRangeSelectionStrategy} from "../services/date-range-picker-strategy.service";
import {MatProgressSpinner} from "@angular/material/progress-spinner";

@Component({
  selector: 'app-sale-week-graph',
  standalone: true,
  imports: [MatFormFieldModule, MatDatepickerModule, DatePipe, ReactiveFormsModule, MatInput, MatProgressSpinner, NgIf],
  providers: [
    provideNativeDateAdapter(),
    {
      provide:MAT_DATE_RANGE_SELECTION_STRATEGY,
      useClass:FiveDayRangeSelectionStrategy,
    }
  ],
  templateUrl: './sale-week-graph.component.html',
  styleUrl: './sale-week-graph.component.css'
})
export class SaleWeekGraphComponent implements OnInit{

  constructor(
    private saleService:SalesService,
    private formBuilder:FormBuilder,
    private dateService:DateService
  ) {  }

  @Input() officeId:number|undefined;
  @ViewChild('salesChartCanvas') salesChartCanvas!:ElementRef<HTMLCanvasElement>

  sales:SaleResponse[] | undefined;
  saleInterval:SalesByDate | undefined;

  saleForm:FormGroup = new FormGroup({});
  isLoading = true;



  ngOnInit() {
    this.saleForm = this.formBuilder.group(({
      startDate:['',[Validators.required]],
      endDate:['',[Validators.required]],
    }))
    if(this.officeId){
      let salesByDate:any = this.dateService.getCurrentWeek();
      salesByDate.officeId = this.officeId;
      this.saleInterval = salesByDate;

    }
    if(this.saleInterval){
      this.saleService.getSalesByDate(this.saleInterval).subscribe(data=>{
        this.sales = data;
        this.dateService.createSalesChart(this.salesChartCanvas.nativeElement,this.sales)
        this.isLoading = false;
        console.log(this.isLoading)
      });
    }



  }

  onDateChange(){
    const startDate = this.saleForm.get('startDate')?.value;
    const endDate = this.saleForm.get('endDate')?.value;

    if(startDate && endDate){
      this.isLoading = true;
      if(this.saleInterval){
        this.saleInterval.startDate = startDate;
        this.saleInterval.endDate = endDate;
      }
      let salesByDate:any = {
        officeId:this.officeId,
        startDate:this.dateService.formatDate(startDate),
        endDate:this.dateService.formatDate(endDate)
      }
      this.saleService.getSalesByDate(salesByDate).subscribe(data=>{
        this.sales = data;

        const canvas = this.salesChartCanvas.nativeElement;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height); // Очистить существующий график
          this.dateService.createSalesChart(canvas, this.sales); // Создать новый график
        }
        this.isLoading = false;

      });
    }
  }
}
