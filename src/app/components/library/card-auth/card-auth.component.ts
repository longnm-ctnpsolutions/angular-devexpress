import { CommonModule } from '@angular/common';
import { Component, NgModule, Input } from '@angular/core';

@Component({
  selector: 'app-card-auth',
  imports: [
    CommonModule,
  ],
  standalone:true,
  templateUrl: './card-auth.component.html',
  styleUrls: ['./card-auth.component.scss'],
})
export class CardAuthComponent {
  @Input()
  title!: string;

  @Input()
  description!: string;
}

