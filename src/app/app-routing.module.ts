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
const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'login', component: LoginComponent},
  {path: 'example/company', component: CompanyComponent},
  {path: 'company/add', component: CompanyAddComponent},
  {path: 'company/edit/:id', component: CompanyEditComponent},
  {path: 'company/delete/:id', component: CompanyDeleteComponent},
  {path: 'example/employee', component: EmployeeComponent},
  {path: 'employee/add', component: EmployeeAddComponent},
  {path: 'employee/edit/:id', component: EmployeeEditComponent},
  {path: 'employee/delete/:id', component: EmployeeDeleteComponent},
  {path: 'example/timesheets', component: TimesheetsComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
