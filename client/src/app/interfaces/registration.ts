export interface Registration{
  email:string,
  password:string,
  firstname:string,
  lastname:string,
  phone:string,
  officeId:number
}

export interface RegistrationResponse{
  token:string
}
