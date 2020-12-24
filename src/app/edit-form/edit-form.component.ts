import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Column } from '../interfaces/column.interface';
import { View } from '../interfaces/view.interface';

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {

    public gridData: Array<Column> = []
    public editColumn: Column = {
        field: '',
        title: '',
        locked: false,
        hidden: false,
        width: 200,
        order: 1
    }
    public Columns = Object.keys(this.editColumn)
  constructor() { 
  }

  ngOnInit(): void {

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
    this.gridData = data.column
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

  public closeForm(): void {
      this.cancel.emit();
  }
}
