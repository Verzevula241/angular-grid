import { Component } from '@angular/core';
import { View } from './interfaces/view.interface';
import {views} from './data/views'
import { products } from './data/produts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-grid';
  views: View[] = views
  products: Array<Object> = products

}
