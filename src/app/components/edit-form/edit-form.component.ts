import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { EditEvent, GridComponent, SaveEvent } from '@progress/kendo-angular-grid';
import { EditService } from 'src/app/service/editView.service';
import { Column } from '../../interfaces/column.interface';
import { View } from '../../interfaces/view.interface';


function ageRangeValidator(min: number, max: number): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
      if (control.value !== undefined && (isNaN(control.value) || control.value < min || control.value > max)) {
          return { 'ageRange': true };
      }
      return null;
  };
}

function comparisonValidator(g: FormGroup): ValidatorFn {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (g.get('hidden')!.value == true && g.get('locked')!.value == true) { 
        return { 'hiddenValue': false };
    }
    return null;
};
}  

@Component({
  selector: 'app-edit-form',
  templateUrl: './edit-form.component.html',
  styleUrls: ['./edit-form.component.scss']
})
export class EditFormComponent implements OnInit {


    private editService: EditService = new EditService;
    public gridData: Array<Column> = []
    public view: object = {}
    public form: FormGroup = new FormGroup({});
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
  //   this.form= new FormGroup({
  //     title: new FormControl('', [Validators.required]),
  //     hidden: new FormControl(this.hiddenCheck),
  //     locked: new FormControl(this.lockedCheck),
  //     width: new FormControl([Validators.required,ageRangeValidator(20, 500)]),
  // });
  // this.form.validator = comparisonValidator(this.form);
  
 }
  

  @Input() public isNew = false;

  @Input() public set model(data: View) {
    this.gridData = data.column;
    this.view = data;

  }

  @Output() cancel: EventEmitter<any> = new EventEmitter();
  @Output() save: EventEmitter<View> = new EventEmitter();

  // public onSave(e: Event): void {
  //     e.preventDefault();
  //     this.save.emit(this.editForm.value);
  // }

  public onCancel(e: Event): void {
      e.preventDefault();
      this.closeForm();
  }
  

  public editHandler(e:EditEvent) {
    this.closeEditor(e.sender);
    this.editedRowIndex = e.rowIndex;
    this.editColumn = Object.assign({}, e.dataItem);
    this.form= new FormGroup({
      title: new FormControl(e.dataItem.title, [Validators.required]),
      hidden: new FormControl(e.dataItem.hidden),
      locked: new FormControl(e.dataItem.locked),
      width: new FormControl(e.dataItem.width,[Validators.required,ageRangeValidator(0, 500)]),
  });
  this.form.validator = comparisonValidator(this.form);
    e.sender.editRow(e.rowIndex,this.form);
}

 public saveHandler(e:SaveEvent) {
        let copy : View = Object.assign({id:0,name:'',pageSize:0,column:[]},this.view)
        copy.column.map((obj,index) => {if(obj.field === e.dataItem.field) {
          let Col: Column = Object.assign({field: e.dataItem.field,order: index},e.formGroup.value)

          copy.column[index] = Col;
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
public cancelHandler(e: EditEvent) {
  this.closeEditor(e.sender, e.rowIndex);
}
  public closeForm(): void {
      this.cancel.emit();
  }
}
