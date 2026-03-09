import { Component } from '@angular/core';
import { NavMenu } from '../nav-menu/nav-menu';

@Component({
  selector: 'app-menu',
  imports: [NavMenu],
  templateUrl: './app-menu.html',
  styleUrl: './app-menu.css',
})
export class AppMenu {}
