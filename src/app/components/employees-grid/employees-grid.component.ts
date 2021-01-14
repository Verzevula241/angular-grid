import { Component, Input, OnInit, ViewChild } from '@angular/core';
// import { products } from '../../data/produts';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult, PageChangeEvent } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import { View } from '../../interfaces/view.interface'
import { Column } from '../../interfaces/column.interface';
import { EditService } from 'src/app/service/editView.service';


const getSessionId = (): number => {
  const session = sessionStorage.getItem('sessionId')
  return session === null ? -1 : +session
}

@Component({
  selector: 'app-employees-grid',
  templateUrl: './employees-grid.component.html',
  styleUrls: ['./employees-grid.component.scss']
})

export class EmployeesGridComponent implements OnInit {


  @Input() public set views(product: View[]) {
    this.boxViews = this.editService.getLocalViews(product)
    
  }
  @Input() public set data(product: Array<Object>) {
    this.gridData = product
  }
  private editService: EditService = new EditService;
  public multiple = false;
  public boxViews: View[] = []
  public pageSize = 10;
  public skip = 0;
  public bindingType: number = getSessionId()
  public allowUnsort = true;
  public columns: Array<Column>;
  public gridData: any[] = [];
  public gridView: GridDataResult;
  public sort: SortDescriptor[] = [
   
  ];



  constructor() {
    this.columns = []
    this.gridView = { data: [], total: 0 }
  }
  ngOnInit(): void {
    this.editService.read();
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
    this.sort = []
    if (typeof item === 'string') { item = +item }
    let table = this.boxViews.find(x => x.id === item);
    if (!table || table === undefined) { 
      this.bindingType = -1
      return this.loadView(this.bindingType) 
    } //добавить ошибку
    if(table.sort){
      this.sort = table.sort
    }
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