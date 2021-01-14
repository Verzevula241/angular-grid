import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AddEvent, EditEvent, SaveEvent } from '@progress/kendo-angular-grid';
import { Column } from 'src/app/interfaces/column.interface';
import { Sort } from 'src/app/interfaces/sort.interface';
import { View } from 'src/app/interfaces/view.interface';
import { EditService } from 'src/app/service/editView.service';

@Component({
  selector: 'app-sort-window',
  templateUrl: './sort-window.component.html',
  styleUrls: ['./sort-window.component.scss']
})

export class SortWindowComponent implements OnInit {
  public opened: boolean = false
  public fields: Array<Column> = [
    {
      field: '',
      title: '',
      locked: false,
      hidden: false,
      width: 0,
      order: 1
  }
  ]
  public view: View = {
    id: 0,
    name: '',
    pageSize: 0,
    column: []
  };
  public gridData: Array<Sort> = []
  public comboDir: Array<string>= ["asc","desc"]
  public formGroup: FormGroup = new FormGroup({});
  private editService: EditService = new EditService;
  constructor() { }


  @Input() public set model(data: View) {
    this.view = data;
    this.fields = data.column
    if(data.sort){
    this.gridData = data.sort
    }
  }
  @Input() public set open(open:boolean) {
    this.opened = open;
  }
  @Output() cancel: EventEmitter<any> = new EventEmitter();

  ngOnInit(): void {
    this.editService.read()
  }

  public openWin() {
    this.opened = !this.opened;
  }

  public submitForm(): void {
    this.opened = !this.opened;
  }

  public addHandler(e:AddEvent) {
    this.closeEditor(e.sender,e.rowIndex);

    this.formGroup = new FormGroup({
        'Field': new FormControl("",[Validators.required]),
        'dir': new FormControl("",[Validators.required]),
    });

    e.sender.addRow(this.formGroup);
}
public saveHandler(e:SaveEvent) {
    let sort: Sort = {"field":e.dataItem.Field,"dir":e.dataItem.dir}
    this.gridData.push(sort)
    this.view.sort = this.gridData
    this.editService.save(this.view,false)
    this.formGroup.reset();
    e.sender.closeRow(e.rowIndex);
}

public removeHandler(e: EditEvent) {
  if(this.view.sort){
  this.view.sort.splice(e.rowIndex, 1); 
  this.editService.removeSort(this.view,e.dataItem);
 if(this.view.sort.length === 0){delete this.view.sort}
  this.formGroup.reset();
  this.ngOnInit();
  }
}

private closeEditor(grid:any, rowIndex:number) {
  grid.closeRow(rowIndex);
  this.formGroup =  new FormGroup({});
}

  public closeForm(): void {
    this.cancel.emit();
}
}
