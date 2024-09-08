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
    // Create some default companies in the constructor
    this.initializeCompanies();
  }

  private initializeCompanies() {
    const c1 = new Company(1, 'Company A', '1234567890', 'Address 1', '555-0101', 'Account1', 'Site1');
    const c2 = new Company(2, 'Company B', '0987654321', 'Address 2', '555-0102', 'Account2', 'Site2');
    const c3 = new Company(3, 'Company C', '1122334455', 'Address 3', '555-0103', 'Account3', 'Site3');
    const c4 = new Company(4, 'Company D', '5566778899', 'Address 4', '555-0104', 'Account4', 'Site4');
    const c5 = new Company(5, 'Company E', '6677889900', 'Address 5', '555-0105', 'Account5', 'Site5');
    
    this.companies = [c1, c2, c3, c4, c5];
    this.companiesSubject.next([...this.companies]);
  }

  // Add a company
  addCompany(company: Company) {
    this.companies.push(company);
    this.companiesSubject.next([...this.companies]);
  }

  // Update an existing company
  updateCompany(updatedCompany: Company) {
    const index = this.companies.findIndex(c => c.id === updatedCompany.id);
    if (index !== -1) {
      this.companies[index] = updatedCompany;
      this.companiesSubject.next([...this.companies]);
    } else {
      console.error('Company not found for update:', updatedCompany);
    }
  }

  // Get a company by ID
  getCompanyById(id: number) {
    const index = this.companies.findIndex(e => e.id === id);
    if (index !== -1) {
      return this.companies[index];
    } else {
      return null;
    }
  }

  // Delete a company by ID
  deleteCompany(id: number) {
    const index = this.companies.findIndex(c => c.id === id);
    if (index !== -1) {
      this.companies.splice(index, 1);
      this.companiesSubject.next([...this.companies]);
    } else {
      console.error('Company not found for deletion with ID:', id);
    }
  }

  // Get all companies as an observable
  getCompanies() {
    return this.companiesSubject.asObservable();
  }
}
