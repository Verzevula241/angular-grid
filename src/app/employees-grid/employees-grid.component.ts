import { Component, OnInit, ViewChild } from '@angular/core';
import { products } from './produts';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult ,PageChangeEvent} from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';
import {View} from '../interfaces/view.interface'
import {views} from './views'

@Component({
    selector: 'app-employees-grid',
    templateUrl: './employees-grid.component.html',
    styleUrls: ['./employees-grid.component.scss']
})

export class EmployeesGridComponent implements OnInit {
    public multiple = false;
    public listItems = views
    public pageSize = 10;
    public skip = 0;
    public bindingType: any = sessionStorage.getItem('sessionId')?sessionStorage.getItem('sessionId'): -1
    public allowUnsort = true;
    public columns: Array<any>;
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
      this.gridView = {data:[],total:0}
    }
    ngOnInit(): void {;
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
        sessionStorage.setItem('sessionId', this.bindingType)
        this.loadView(this.bindingType)
      }

    private loadProducts(): void {
      this.gridView = {
        data: orderBy(this.gridData.slice(this.skip, this.skip + this.pageSize), this.sort),
        total: this.gridData.length
      }
    }
    private loadView(item: number): void{
      let table = views.find(x => x.id === item)
      if(!table){Error('I was created using a function call!'); return;} //добавить ошибку
      this.columns = table.column
      if(this.columns){
       this.loadProducts()
      }
      else{
        this.gridView = {
          data: orderBy([{}], this.sort),
          total: this.gridData.length
        }
      }
      
    }
}