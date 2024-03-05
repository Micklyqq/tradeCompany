export interface DialogProduct{
  dialogName:string,
  officeId:number,
  productId?:number|null
}

export interface DialogSale{
  dialogName:string,
  officeId:number,
}

export interface DialogWorkers{
  dialogName:string,
  officeId:number,
  userId?:number,
}
