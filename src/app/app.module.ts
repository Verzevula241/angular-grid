import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { EmployeesGridComponent } from './components/employees-grid/employees-grid.component';
import { ButtonsModule } from '@progress/kendo-angular-buttons';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GridModule } from '@progress/kendo-angular-grid';
import { DropDownsModule } from '@progress/kendo-angular-dropdowns';
import { LayoutModule } from '@progress/kendo-angular-layout';
import { ViewsGridComponent } from './components/views-grid/views-grid.component';
import { WindowModule } from '@progress/kendo-angular-dialog';
import { InputsModule } from '@progress/kendo-angular-inputs';
import { EditFormComponent } from './components/edit-form/edit-form.component';
import { DialogModule } from '@progress/kendo-angular-dialog';
import { SortWindowComponent } from './components/sort-window/sort-window.component';



@NgModule({
  declarations: [
    AppComponent,
    EmployeesGridComponent,
    ViewsGridComponent,
    EditFormComponent,
    SortWindowComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonsModule,
    BrowserAnimationsModule,
    GridModule,
    FormsModule,
    DropDownsModule,
    LayoutModule,
    WindowModule,
    InputsModule,
    ReactiveFormsModule,
    DialogModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
