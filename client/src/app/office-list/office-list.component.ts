import {Component, OnInit} from '@angular/core';
import {OfficeService} from "../services/office.service";
import {Office} from "../interfaces/office";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";
import {environment} from "../../environments/environment.development";
import {RouterLink} from "@angular/router";
import {ImageLoaderService} from "../services/image-loader.service";


@Component({
  selector: 'app-office-list',
  standalone: true,
  imports: [
    NgForOf,
    NgIf,
    RouterLink,
    NgOptimizedImage
  ],
  templateUrl: './office-list.component.html',
  styleUrl: './office-list.component.css'
})
export class OfficeListComponent implements OnInit{
  constructor(private officeService:OfficeService,private imageLoader:ImageLoaderService) {

  }

  onImageLoadError:any;

  officeList:Office[] = [];
  altImg:string = "../../assets/img/noImage.jpg"

  ngOnInit() {
    this.officeService.getOfficesList().subscribe((data:Office[])=>{
      this.officeList=data;
    });
    this.onImageLoadError =  this.imageLoader.onImageLoadError;
  }



  protected readonly environment = environment;
}
