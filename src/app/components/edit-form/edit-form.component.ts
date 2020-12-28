import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EditEvent, GridComponent } from '@progress/kendo-angular-grid';
import { EditService } from 'src/app/service/editView.service';
import { Column } from '../../interfaces/column.interface';
import { View } from '../../interfaces/view.interface';


@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {


    private editService: EditService = new EditService;
    public gridData: Array<Column> = []
    public view: object = {}
    public editColumn: Column|undefined = {
        field: '',
        title: '',
        locked: false,
        hidden: false,
        width: 0,
        order: 1
    }
    private editedRowIndex: number | undefined = 0;



  constructor() { 

  }

  ngOnInit(): void {
    this.editService.read();
  }
  public editForm: FormGroup = new FormGroup({
      name: new FormControl(),
      ProductName: new FormControl('', Validators.required),
      UnitPrice: new FormControl(0),
      UnitsInStock: new FormControl('', Validators.compose([Validators.required, Validators.pattern('^[0-9]{1,3}')])),
      Discontinued: new FormControl(false)
  });

  @Input() public isNew = false;

  @Input() public set model(data: View) {
    //   this.editForm.reset(column);
    this.gridData = data.column;
    this.view = data;

  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<View> = new EventEmitter();

  public onSave(e: Event): void {
      e.preventDefault();
      this.save.emit(this.editForm.value);
  }

  public onCancel(e: Event): void {
      e.preventDefault();
      this.closeForm();
  }

  public editHandler(e:EditEvent) {
    this.closeEditor(e.sender);

    this.editedRowIndex = e.rowIndex;
    this.editColumn = Object.assign({}, e.dataItem);

    e.sender.editRow(e.rowIndex);
}

 public saveHandler(e:EditEvent) {
        let copy : View = Object.assign({id:0,name:'',pageSize:0,column:[]},this.view)
        copy.column.map((obj,index) => {if(obj.field === e.dataItem.field) {
          copy.column[index] = e.dataItem;
      }else obj});
        this.editService.save(copy, e.isNew);

        e.sender.closeRow(e.rowIndex);

        this.editedRowIndex = undefined;
        this.editColumn = undefined;
    }

private closeEditor(grid:GridComponent, rowIndex = this.editedRowIndex) {
  grid.closeRow(rowIndex);
  //this.editService.resetItem(this.editColumn);
  this.editedRowIndex = undefined;
  this.editColumn = undefined;
}

  public closeForm(): void {
      this.cancel.emit();
  }
}
