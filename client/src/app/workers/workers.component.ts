import {Component, Input} from '@angular/core';
import {MatTable, MatTableModule} from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';
import {AddProductDialogComponent} from "../dialogs/add-product-dialog/add-product-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {WorkersDialogComponent} from "../dialogs/workers-dialog/workers-dialog.component";

@Component({
  selector: 'app-workers',
  standalone: true,
  imports: [MatButtonModule, MatTableModule],
  templateUrl: './workers.component.html',
  styleUrl: './workers.component.css'
})
export class WorkersComponent {

  constructor(public dialog:MatDialog) {
  }

  @Input() officeId:number | undefined;
  openDialog(dialogName:string){
    this.dialog.open(WorkersDialogComponent,{
      data:{dialogName:dialogName,officeId:this.officeId},
      width:'600px'
    })
  }
}
