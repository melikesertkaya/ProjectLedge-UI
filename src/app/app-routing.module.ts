import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './component/principal/principal.component';
import { CompanyComponent } from './component/company/company.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { EmployeeAddComponent } from './component/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './component/employee/employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './component/employee/employee-delete/employee-delete.component';
import { LoginComponent } from './component/login/login.component';
import { CompanyAddComponent } from './component/company/company-add/company-add.component';
import { CompanyEditComponent } from './component/company/company-edit/company-edit.component';
import { CompanyDeleteComponent } from './component/company/company-delete/company-delete.component';
import { TimesheetsComponent } from './component/timesheets/timesheets.component';
import { InvoiceComponent } from './component/invoice/invoice.component';
import { ProgressPaymentComponent } from './component/progress-payment/progress-payment.component';
import { CompanyDetailComponent } from './component/company/company-detail/company-detail.component'; // Adjust the path as necessary

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' }, // Redirect to login by default
  { path: 'login', component: LoginComponent },
  { path: 'menu', component: PrincipalComponent, children: [
    { path: '', redirectTo: 'company', pathMatch: 'full' }, // Default to 'company' tab
    { path: 'company', component: CompanyComponent },
    { path: 'employee', component: EmployeeComponent },
    { path: 'timesheets', component: TimesheetsComponent },
    { path: 'invoice', component: InvoiceComponent },
    { path: 'progress-payment', component: ProgressPaymentComponent },
    { path: 'company-detail/:name', component: CompanyDetailComponent },
  ]},
  { path: 'company/add', component: CompanyAddComponent },
  { path: 'company/edit/:id', component: CompanyEditComponent },
  { path: 'company/delete/:id', component: CompanyDeleteComponent },
  { path: 'employee/add', component: EmployeeAddComponent },
  { path: 'employee/edit/:id', component: EmployeeEditComponent },
  { path: 'employee/delete/:id', component: EmployeeDeleteComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
