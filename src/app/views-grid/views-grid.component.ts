import { Component, OnInit } from '@angular/core';
import { views } from '../employees-grid/views';
import { Column } from '../interfaces/column.interface';

@Component({
  selector: 'app-views-grid',
  templateUrl: './views-grid.component.html',
  styleUrls: ['./views-grid.component.scss']
})
export class ViewsGridComponent implements OnInit {
  public gridData: any[] = views;
  public column: Array<Column>
  constructor() { 
    this.column = [{field: 'name', title: 'View Name'},{field: 'pageSize', title: 'Page size'}]
  }


  ngOnInit(): void {
  }

}
