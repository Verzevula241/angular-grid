import { Component, OnInit, Input, EventEmitter } from '@angular/core';
import { Column } from '../../interfaces/column.interface';
import { View } from '../../interfaces/view.interface';
import { productColumns } from '../../data/product.columns'
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { views } from '../../data/views';
import { EditEvent, GridDataResult } from '@progress/kendo-angular-grid';
import { products } from '../../data/produts';

const getLocalViews = (views: View[]):View[] =>{
  const session = localStorage.getItem('views')
  const gridViews = session === null ? views : JSON.parse(session)
  return gridViews 
}
const setDefaulValue = (product: Array<Column>):Column[] =>{
  let endCol: Column[] =[]
  product.forEach((item,index)=>{
      item.locked = false;
      item.hidden = false;
      item.order = index
      endCol.push(item)
  })
  
  return endCol
}
const setId = function ():number {
  return Math.floor(Math.random() * 100);
};

@Component({
  selector: 'app-views-grid',
  templateUrl: './views-grid.component.html',
  styleUrls: ['./views-grid.component.scss']
})
export class ViewsGridComponent implements OnInit {
  @Input() views !: View[]
  public gridView: GridDataResult;
  public activeEdit:boolean = false
  public column: Array<Column>
  public editDataItem: View = {
    id: 0,
    name: '',
    pageSize: 0,
    column: []
  };
  public prodColumns: Array<Column>
  public opened: boolean = false
  public isNew: boolean = false;
  public selectedValue: Array<Column> = [{ field: "ProductName", title: 'Product name' }, { field: "ProductID", title: 'Product id' }]
  public form: FormGroup;
  public data: View = {
    id: 0,
    name: '',
    pageSize: 0,
    column: []
  };

  constructor() {

    this.gridView = {data: getLocalViews(views),total:0}
    this.column = [{ field: 'id', title: 'View id' },{ field: 'name', title: 'View Name' }, { field: 'pageSize', title: 'Page size' }]
    // this.productColumns = productColumns
    this.prodColumns = productColumns
    this.form = new FormGroup({
      name: new FormControl(this.data.name, [Validators.required]),
      pageSize: new FormControl(this.data.pageSize, [Validators.required]),
      column: new FormControl(this.data.column, [Validators.required]),
    });
  }

  public open() {
    this.form.reset();
    this.opened = !this.opened;
  }

  public submitForm(): void {
    let view: View = this.form.value
    view.column = setDefaulValue(view.column)
    view.id = setId()
    this.gridView.data.push(view)
    localStorage.setItem('views',JSON.stringify(this.gridView.data))
    this.form.reset();
    this.opened = !this.opened;
}
  public editHandler(e:EditEvent) {
  this.editDataItem = e.dataItem;
  this.activeEdit = true
  this.isNew = false;
}

public cancelHandler() {
  this.activeEdit = false
}

  ngOnInit(): void {
  }

}
