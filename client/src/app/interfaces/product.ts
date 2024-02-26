export interface Product{
  name:string,
  quantity:number,
  price:number
}

export interface ProductResponse{
  id:number,
  name:string,
  quantity:number,
  price:number
}

export interface UpdateProduct{
  name?:string,
  quantity?:number,
  price?:number,
}
