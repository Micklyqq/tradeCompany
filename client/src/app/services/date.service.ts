import {Injectable} from '@angular/core';
import {SaleResponse} from "../interfaces/sale";
import {Chart, registerables} from "chart.js";

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {
    Chart.register(...registerables);
  }

  private chart: Chart | null = null;

  getCurrentWeek(){
    let startOfWeek:Date;
    let endOfWeek:Date;

    const today = new Date();
    const currentDay = today.getDay();

    startOfWeek = new Date(today);

    startOfWeek.setDate(today.getDate()-currentDay+(currentDay ===0 ? -6 : 1));

    endOfWeek = new Date(today);
    endOfWeek.setDate(startOfWeek.getDate() + 6)

    return {
      startDate:this.formatDate(startOfWeek)+"T00:00:00.00Z",
      endDate:this.formatDate(endOfWeek)+"T23:59:59.00Z"
    }
  }

  salesByDateAmount(sales: SaleResponse[]): { date: string, totalAmount: number }[] {

    const salesMap: { [date: string]: number } = {};

    for (let i = 0; i < sales.length; i++) {
      const sale = sales[i];
      sales[i].date = sale.date.split("T")[0];
    }
    // Сначала проходим по всем продажам и суммируем общий доход для каждой даты
    for (const sale of sales) {
      const date = sale.date;
      if (!salesMap[date]) {
        salesMap[date] = 0;
      }
      salesMap[date] += sale.amount;
    }

    // Затем преобразуем суммарные значения в массив объектов с нужной структурой
    const salesChartData: { date: string, totalAmount: number }[] = [];
    for (const date in salesMap) {
      if (salesMap.hasOwnProperty(date)) {
        salesChartData.push({ date, totalAmount: salesMap[date] });
      }
    }

    return salesChartData;
  }

  formatDate(date: Date): string {
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }

  createSalesChart(canvas:HTMLCanvasElement,sales:SaleResponse[]):void{
    const salesForChart = this.salesByDateAmount(sales);
    if (this.chart) {
      this.chart.destroy(); // Уничтожаем предыдущий график, если он существует
    }
    this.chart = new Chart(canvas,{
      type:'bar',
      data:{
        labels:salesForChart.map(sale=>sale.date),
        datasets:[{
          label:'Общий доход',
          data:salesForChart.map(sale=>sale.totalAmount),
          backgroundColor: '#165BAA',
          borderWidth: 1
        }]
      },
      options:{
        scales:{
          y:{
            beginAtZero:true
          }
        }
      }
    })
  }
}
