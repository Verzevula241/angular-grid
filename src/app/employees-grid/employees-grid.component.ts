import { Component, OnInit, ViewChild } from '@angular/core';
import { products } from './produts';
import { State, process } from '@progress/kendo-data-query';
import { GridDataResult } from '@progress/kendo-angular-grid';
import { SortDescriptor, orderBy } from '@progress/kendo-data-query';

@Component({
    selector: 'app-employees-grid',
    templateUrl: './employees-grid.component.html',
    styleUrls: ['./employees-grid.component.scss']
})
export class EmployeesGridComponent implements OnInit {
    public multiple = false;
    public bindingType: String = 'only2';
    public allowUnsort = true;
    public sort: SortDescriptor[] = [
        {
            field: 'ProductID',
            dir: 'asc'
        }
    ];
    public gridState: State = {
        take: 10
    };
    @ViewChild(EmployeesGridComponent) dataBinding: DataBindingDirective;
    public columns: any[] = [{field: "ProductID"}, {field: "ProductName"}, {field: "UnitPrice"}];
    public gridData: any[] = products;
    public gridView: any[] = [];

    constructor() {
        this.loadProducts();
    }
    ngOnInit(): void {
        throw new Error('Method not implemented.');
    }

    public sortChange(sort: SortDescriptor[]): void {
        this.sort = sort;
        this.loadProducts();
        console.log()
    }

    changeBindingType(e: any) {
        switch (this.bindingType) {
          case 'all' : {
            this.columns = [{field: "ProductID"}, {field: "ProductName"}, {field: "UnitPrice"}];
            this.gridView = this.gridData
            break;
          }
          case 'only2' : {
            this.columns = [{field: "ProductID"},{field: "UnitPrice"}];
            this.gridView = this.gridData
            break;
          }
          case 'only3' : {
            this.columns = [{field: "ProductID"}];
            this.gridView = this.gridData
            break;
          }
        }
      }

    private loadProducts(): void {
        this.gridView = this.gridData
    }
}