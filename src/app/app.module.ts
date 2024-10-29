import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AutInterceptor } from './services/aut.interceptor';

// Angular Material
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule,MatDateFormats, MAT_DATE_FORMATS, DateAdapter, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';

// PrimeNG
import { SplitterModule } from 'primeng/splitter';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { TableModule } from 'primeng/table';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

// Components
import { CompanyComponent } from './component/company/company.component';
import { PrincipalComponent } from './component/principal/principal.component';
import { LoginComponent } from './component/login/login.component';
import { EmployeeAddComponent } from './component/employee/employee-add/employee-add.component';
import { EmployeeDeleteComponent } from './component/employee/employee-delete/employee-delete.component';
import { EmployeeEditComponent } from './component/employee/employee-edit/employee-edit.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { CompanyAddComponent } from './component/company/company-add/company-add.component';
import { CompanyEditComponent } from './component/company/company-edit/company-edit.component';
import { CompanyDeleteComponent } from './component/company/company-delete/company-delete.component';
import { TimesheetsComponent } from './component/timesheets/timesheets.component';
import { TimesheetDialogComponent } from './component/timesheets/dialog/timesheet-dialog.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { ProgressPaymentComponent } from './component/progress-payment/progress-payment.component';
import { ProgressPaymentDialogComponent } from './component/progress-payment/progress-payment-add/progress-payment-add.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
// Services
import { TimesheetService } from './services/Timesheets/timesheets.service';
import { CompanyDetailComponent } from './component/company/company-detail/company-detail.component';
import { ConstructionSitesDetailComponent } from './component/construction-sites/construction-sites-detail';
import { EmployeeDetailComponent } from './component/employee/employee-detail/employee-detail.component';
const CUSTOM_DATE_FORMATS: MatDateFormats = {
  parse: { dateInput: 'DD-MM-YYYY' },
  display: {
    dateInput: 'DD-MM-YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'DD-MM-YYYY',
    monthYearA11yLabel: 'MMMM YYYY',
  }
};
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
    TimesheetDialogComponent,
    InvoiceComponent,
    ProgressPaymentComponent,
    ProgressPaymentDialogComponent,
    CompanyDetailComponent,
    ConstructionSitesDetailComponent,
    EmployeeDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatTableModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSelectModule,
    ButtonModule,
    SplitterModule,
    TabViewModule,
    TableModule,
    DynamicDialogModule,
    MatCheckboxModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AutInterceptor,
      multi: true
    },
    { provide: MAT_DATE_FORMATS, useValue: CUSTOM_DATE_FORMATS },
    { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }, // Use UK locale for dd-MM-yyyy format
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
