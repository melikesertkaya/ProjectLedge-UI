import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './component/principal/principal.component';
import { CompanyComponent } from './component/company/company.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { EmployeeAddComponent } from './component/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './component/employee/employee-edit/employee-edit.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'example/company', component: CompanyComponent},
  {path: 'example/employee', component: EmployeeComponent},
  {path: 'example/employeeAdd', component: EmployeeAddComponent},
  {path: 'example/employeeEdit/:id', component: EmployeeEditComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
