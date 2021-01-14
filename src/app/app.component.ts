import { Component } from '@angular/core';
import { View } from './interfaces/view.interface';
import {views} from './data/views'
import {employeesView} from './data/views.employees'
import {employees} from './data/employees'
import { products } from './data/produts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-grid';
  views: View[] = views
  employeeView: View[] = employeesView
  products: Array<Object> = products
  employees: Array<Object> = employees

}
