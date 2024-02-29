import {Component, OnInit} from '@angular/core';
import {OfficeService} from "../services/office.service";
import {Office} from "../interfaces/office";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {environment} from "../../environments/environment.development";
import {RouterLink} from "@angular/router";
import {ImageLoaderService} from "../services/image-loader.service";
import {HasRoleDirective} from "../directives/has-role.directive";
import {MatDialog} from "@angular/material/dialog";
import {AddProductDialogComponent} from "../dialogs/add-product-dialog/add-product-dialog.component";
import {OfficeDialogComponent} from "../dialogs/office-dialog/office-dialog.component";


@Component({
  selector: 'app-office-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NgOptimizedImage,
    HasRoleDirective
  ],
  templateUrl: './office-list.component.html',
  styleUrl: './office-list.component.css'
})
export class OfficeListComponent implements OnInit{
  constructor(private officeService:OfficeService,private imageLoader:ImageLoaderService, public dialog:MatDialog) {

  }

  onImageLoadError:any;

  officeList:Office[] = [];
  altImg:string = "../../assets/img/noImage.jpg"

  ngOnInit() {
    this.officeService.onOfficeListChanged().subscribe(()=>{
      this.refreshOffices();
    })
    this.officeService.getOfficesList().subscribe((data:Office[])=>{
      this.officeList=data;
    });
    this.onImageLoadError =  this.imageLoader.onImageLoadError;
  }



  protected readonly environment = environment;

  openDialog(dialogName:string,officeId:number | null = null) {
    this.dialog.open(OfficeDialogComponent,{
      data:{dialogName:dialogName},
      width:'600px'
    })
  }

  refreshOffices(){
    this.officeService.getOfficesList().subscribe((data:Office[])=>{
      this.officeList = data;
    })
  }
}
