import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PrincipalComponent } from './component/principal/principal.component';
import { CompanyComponent } from './component/company/company.component';

const routes: Routes = [
  {path: '', component: PrincipalComponent},
  {path: 'example/company', component: CompanyComponent}
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
