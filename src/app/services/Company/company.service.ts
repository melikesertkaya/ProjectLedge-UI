import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Company } from 'src/app/models/company/company.model';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companies: Company[] = [];
  private companiesSubject = new BehaviorSubject<Company[]>([]);

  constructor() {
    // Create at least one company in the constructor
    const c1 = new Company(1, 'Company A', '1234567890', 'Address 1', '123-456-7890', 'Account1', 'Site1');
    const c2 = new Company(2, 'Company B', '0987654321', 'Address 2', '987-654-3210', 'Account2', 'Site2');
    this.companies.push(c1, c2);

    this.companiesSubject.next([...this.companies]);
  }

  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesSubject.next([...this.companies]);
  }

  updateCompany(company: Company) {
    const index = this.companies.findIndex(c => c.id === company.id);
    if (index !== -1) {
      this.companies[index] = company;
      this.companiesSubject.next([...this.companies]);
    }
  }

  getCompanyById(id: number) {
    const index = this.companies.findIndex(c => c.id === id);
    if (index !== -1) {
      return this.companies[index];
    } else {
      return null;
    }
  }

  deleteCompany(id: number) {
    const index = this.companies.findIndex(c => c.id === id);
    if (index !== -1) {
      this.companies.splice(index, 1);
      this.companiesSubject.next([...this.companies]);
    }
  }

  getCompanies() {
    return this.companiesSubject.asObservable();
  }
}
