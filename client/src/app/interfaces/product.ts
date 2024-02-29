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

export interface ProductResponsePagination{
count:number,
  rows:[
    {
      id:number,
      name:string,
      quantity:number,
      price:number
    }
  ]
}

export interface PaginationRows{
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
