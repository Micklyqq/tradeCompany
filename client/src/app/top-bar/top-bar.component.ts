import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router, RouterLink, RouterLinkActive} from "@angular/router";
import {NgIf} from "@angular/common";
import {OfficeIdService} from "../services/office-id.service";

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    NgIf
  ],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.css'
})
export class TopBarComponent implements OnInit{

  constructor(private router:Router,private officeIdService:OfficeIdService) {  }

  token = localStorage.getItem('token');

  isOfficeDetailsPage:number | null = null;

  ngOnInit() {
    this.officeIdService.getOfficeId().subscribe(officeId=>this.isOfficeDetailsPage = officeId);
  }


}
