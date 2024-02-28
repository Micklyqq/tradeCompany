export interface UserResponse{
  id:number,
  officeId:number,
  roleId:number,
  email:string,
  firstname:string,
  lastname:string,
  phone:string,
}

export interface UserUpdate{
  roleId?:number,
  email?:string,
  password?:string,
  firstname?:string,
  lastname?:string,
  phone?:string,
}
