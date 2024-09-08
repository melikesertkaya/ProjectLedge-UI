import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  companySelected: boolean = false;
  selectedCompany: string = '';

  constructor(private router: Router) { }

  selectCompany(company: string): void {
    this.selectedCompany = company;
    this.companySelected = true;
  }

  login(): void {
    this.router.navigate(['/menu'], { queryParams: { tab: 'company' } });
  }

  clear(): void {
    this.username = '';
    this.password = '';
  }
}
