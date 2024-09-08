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
    const c1 = new Company(1, 'Doğuş', '1234567890', 'Çekmeköy', '123-456-7890', 'alacak', 'css');
    const c2 = new Company(2, 'Gülermak', '0987654321', 'Ataşehir', '987-654-3210', 'verecek', 'finans şehir');
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
