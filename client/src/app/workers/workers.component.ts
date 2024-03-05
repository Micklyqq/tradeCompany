import {Component, Input, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {AddProductDialogComponent} from "../dialogs/add-product-dialog/add-product-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {WorkersDialogComponent} from "../dialogs/workers-dialog/workers-dialog.component";
import {UserResponse} from "../interfaces/user";
import {UserService} from "../services/user.service";
import {NgIf} from "@angular/common";
import {MatIcon} from "@angular/material/icon";
import {AuthService} from "../services/auth.service";
import {RoleService} from "../services/role.service";
import {RoleResponse} from "../interfaces/role";
import {Subscription} from "rxjs";
import {HasRoleDirective} from "../directives/has-role.directive";
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, NgIf, MatIcon, HasRoleDirective, MatPaginator],
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css'
})
export class WorkersComponent implements OnInit,OnDestroy{

  constructor(
    public dialog:MatDialog,
    private userService:UserService,
    private authService:AuthService,
    private roleService:RoleService,

  ) {
  }

  @Input() officeId:number | undefined;
  @ViewChild(MatTable) table: MatTable<UserResponse> | undefined
  displayedColumns:string[] = ['ID','Email','Firstname','Lastname','Phone','Role']

  workers:UserResponse[] | undefined;
  roleNames:string[] =[];

  totalSales = 0;
  pageSize = 10;
  pageIndex = 0;



  subscription:Subscription[] = [];
  openDialog(dialogName:string,userId:number|null = null){
    this.dialog.open(WorkersDialogComponent,{
      data:{dialogName:dialogName,officeId:this.officeId,userId:userId},
      width:'600px'
    })
  }
  ngOnInit() {
    if(this.officeId){
      this.subscription.push(
        this.userService.getPaginationUsers(this.officeId,this.pageIndex+1,this.pageSize).subscribe(data=>{
          this.workers = data.rows;
          this.totalSales = data.count;
        })
      );
    }
      this.subscription.push(this.roleService.getAllRoles().subscribe((data)=>{
        data.forEach((item)=>{
          this.roleNames[item.id] = item.name;
        })
      }));

    this.userIsDirector();


    this.authService.onWorkersListChanged().subscribe(()=>this.refreshWorkers());
  }
  ngOnDestroy() {
    this.subscription.forEach((data)=>{
      data.unsubscribe();
    })
  }

  userIsDirector(){
    const user = this.authService.jwtDecode();
    if(user) {
      if(user.role.name==="ADMIN"){
        this.displayedColumns.push('Actions');
      }
      if(user.role.name==='Директор'&&user.officeId === this.officeId){
        this.displayedColumns.push('Actions');
      }
    }
  }


  editWorker(workerId:number) {

  }

  deleteWorker(workerId:number) {
    console.log("DELETED")
    return this.authService.deleteWorker(workerId).subscribe({
      next:()=>{},
      error:()=>{

      }
    });
  }

  refreshWorkers(){
    if(this.officeId){
      this.subscription.push(
        this.userService.getPaginationUsers(this.officeId,this.pageIndex+1,this.pageSize).subscribe(data=>{
          this.workers = data.rows;
          this.totalSales = data.count;
        })
      )
    }
  }

  onPageChange(event: PageEvent) {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
    this.refreshWorkers();
  }
}
