export interface SaleAdd {
  quantity:number,
  date:string,
  officeId:number,
  productId:number
}
export interface SaleResponse{
  id:number,
  quantity:number,
  date:string,
  product:
    {
      name:string,
      id:number,
    }
    amount:number,
}

export interface SalesByDate{
 officeId:number,
startDate:Date,
endDate?:Date,
}

export interface SaleResponsePagination{
  count:number,
  rows:[
    {
      id:number,
      quantity:number,
      date:string,
      product:
        {
          name:string,
          id:number,
        }
      amount:number,
    }
  ]
}
