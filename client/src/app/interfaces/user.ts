export interface UserResponse{
  id:number,
  officeId:number,
  role:{
    id:number,
    name:string,
  },
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
