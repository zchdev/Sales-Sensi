import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AppMenu } from '../components/menu/app-menu/app-menu';

@Component({
  selector: 'app-private-view',
  imports: [RouterModule, AppMenu],
  templateUrl: './private-view.html',
  styleUrl: './private-view.css',
})
export class PrivateView {}
