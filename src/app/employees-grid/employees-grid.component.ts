import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { products } from '../data/produts';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { View } from '../interfaces/view.interface'
import { Column } from '../interfaces/column.interface';


const getSessionId = (): number => {
  const session = sessionStorage.getItem('sessionId')
  return session === null ? -1 : +session
}
const getLocalViews = (views: View[]): View[] => {
  const session = localStorage.getItem('views')
  const gridViews = session === null ? views : JSON.parse(session)
  return gridViews
}

@Component({
  selector: 'app-employees-grid',
  templateUrl: './employees-grid.component.html',
  styleUrls: ['./employees-grid.component.scss']
})

export class EmployeesGridComponent implements OnInit {


  @Input() public set views(product: View[]) {
    this.boxViews = getLocalViews(product)
  }

  @Input() data !: Array<Object>
  public multiple = false;
  public boxViews: View[] = []
  public pageSize = 10;
  public skip = 0;
  public bindingType: number = getSessionId()
  public allowUnsort = true;
  public columns: Array<Column>;
  public gridData: any[] = products;
  public gridView: GridDataResult;
  public sort: SortDescriptor[] = [
    {
      field: 'ProductID',
      dir: 'asc'
    }
  ];



  constructor() {
    this.columns = []
    this.gridView = { data: [], total: 0 }
  }
  ngOnInit(): void {
    ;
    this.loadView(this.bindingType)
  }

  public sortChange(sort: SortDescriptor[]): void {
    this.sort = sort;
    this.loadProducts()
    console.log()
  }
  public pageChange(event: PageChangeEvent): void {
    this.skip = event.skip;
    this.loadProducts()
  }

  changeBindingType(e: any) {
    sessionStorage.setItem('sessionId', `${this.bindingType}`)
    this.loadView(this.bindingType)
  }

  private loadProducts(): void {
    this.gridView = {
      data: orderBy(this.gridData.slice(this.skip, this.skip + this.pageSize), this.sort),
      total: this.gridData.length
    }
  }
  private loadView(item: number): void {
    if (typeof item === 'string') { item = +item }
    let table = this.boxViews.find(x => x.id === item)
    console.log()
    if (!table || table === undefined) { return this.loadView(-1) } //добавить ошибку
    this.columns = table.column
    this.pageSize = table.pageSize
    if (this.columns) {
      this.loadProducts()
    }
    else {
      this.gridView = {
        data: orderBy([{}], this.sort),
        total: this.gridData.length
      }
    }

  }
}