import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AutInterceptor } from './services/aut.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule , provideAnimations} from '@angular/platform-browser/animations';
import { CompanyComponent } from './component/company/company.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
//Angular material
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
//Prime NG
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import {TableModule} from 'primeng/table';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './component/login/login.component';
import { EmployeeAddComponent } from './component/employee/employee-add/employee-add.component';
import { EmployeeDeleteComponent } from './component/employee/employee-delete/employee-delete.component';
import { EmployeeEditComponent } from './component/employee/employee-edit/employee-edit.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { CompanyAddComponent } from './component/company/company-add/company-add.component';
import { CompanyEditComponent } from './component/company/company-edit/company-edit.component';
import { CompanyDeleteComponent } from './component/company/company-delete/company-delete.component';
import { TimesheetService } from './services/Timesheets/timesheets.service';
import { TimesheetsComponent } from './component/timesheets/timesheets.component';
import { TimesheetDialogComponent } from './component/timesheets/dialog/timesheet-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
@NgModule({
  declarations: [
    AppComponent,
    PrincipalComponent,
    CompanyComponent,
    LoginComponent,
    EmployeeAddComponent,
    EmployeeDeleteComponent,
    EmployeeEditComponent,
    EmployeeComponent,
    CompanyAddComponent,
    CompanyEditComponent,
    CompanyDeleteComponent,
    TimesheetsComponent,
    TimesheetDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    MatButtonModule,
    MatTableModule,
    ButtonModule,
    SplitterModule,
    TabViewModule,
    TableModule,
    DynamicDialogModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  
  providers: [
    provideAnimations(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
