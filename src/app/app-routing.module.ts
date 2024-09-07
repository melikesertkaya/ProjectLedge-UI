import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './component/principal/principal.component';
import { CompanyComponent } from './component/company/company.component';
import { EmployeeComponent } from './component/employee/employee.component';
import { EmployeeAddComponent } from './component/employee/employee-add/employee-add.component';
import { EmployeeEditComponent } from './component/employee/employee-edit/employee-edit.component';
import { EmployeeDeleteComponent } from './component/employee/employee-delete/employee-delete.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'example/company', component: CompanyComponent},
  {path: 'example/employee', component: EmployeeComponent},
  {path: 'employee/add', component: EmployeeAddComponent},
  {path: 'employee/edit/:id', component: EmployeeEditComponent},
  {path: 'employee/delete/:id', component: EmployeeDeleteComponent},
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
