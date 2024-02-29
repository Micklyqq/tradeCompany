export interface Office {
  id:number,
  name:string,
  adress:string,
  logo:string | null,
  createdAt:string,
  updatedAt:string,
  werehouse:{},
  sales:[]
}

export interface CreateOffice{
  name:string,
  adress:string,
}
