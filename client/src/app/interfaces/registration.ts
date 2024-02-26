export interface Registration{
  email:string,
  password:string,
  firstname:string,
  lastname:string,
  phone:string
}

export interface RegistrationResponse{
  token:string
}
