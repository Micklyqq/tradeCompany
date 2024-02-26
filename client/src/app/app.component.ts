import {Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet,Router} from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import {TopBarComponent} from "./top-bar/top-bar.component";
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  imports: [CommonModule, RouterOutlet, AuthComponent, TopBarComponent],
})
export class AppComponent {
  title = 'client';
}
