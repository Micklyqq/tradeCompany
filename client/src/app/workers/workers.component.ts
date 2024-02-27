import {Component, Input, OnInit, ViewChild} from '@angular/core';
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

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, NgIf, MatIcon],
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css'
})
export class WorkersComponent implements OnInit{

  constructor(
    public dialog:MatDialog,
    private userService:UserService,
    private authService:AuthService,

  ) {
  }

  @Input() officeId:number | undefined;
  @ViewChild(MatTable) table: MatTable<UserResponse> | undefined
  displayedColumns:string[] = ['ID','Email','Firstname','Lastname','Phone','Role','Actions']

  workers:UserResponse[] | undefined;
  openDialog(dialogName:string){
    this.dialog.open(WorkersDialogComponent,{
      data:{dialogName:dialogName,officeId:this.officeId},
      width:'600px'
    })
  }
  ngOnInit() {
    if(this.officeId){
      this.userService.getUsersByOfficeId(this.officeId).subscribe(data=>{
        this.workers = data;
      });
    }
    this.authService.onWorkersListChanged().subscribe(()=>this.refreshWorkers());
  }

  editWorker(workerId:number) {

  }

  deleteWorker(workerId:number) {

  }

  refreshWorkers(){
    if(this.officeId){
      this.userService.getUsersByOfficeId(this.officeId).subscribe(data=>this.workers = data);
    }
  }
}
