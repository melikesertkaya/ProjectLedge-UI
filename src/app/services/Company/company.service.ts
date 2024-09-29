import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Company } from 'src/app/models/company/company.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private companies: Company[] = [];
  private companiesSubject = new BehaviorSubject<Company[]>([]);
  private path=environment.apiUrl
  constructor(private httpClient:HttpClient) {
    const c1 = new Company('1', 'Doğuş', '1234567890', 'Çekmeköy', '123-456-7890', 'code1', 'Description1', 1, 'Bill1', 1);
    const c2 = new Company('2', 'Gülermak', '0987654321', 'Ataşehir', '987-654-3210', 'code2', 'Description2', 2, 'Bill2', 2);
    this.companies.push(c1, c2);
    this.companiesSubject.next([...this.companies]);
  }

  addCompany(company: Company): Observable<Company> {
    return this.httpClient.post<Company>(`${this.path}Companies/CreateCompany`, company, {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }).pipe(
        tap(response => console.log('Company added:', response)),
        catchError(error => {
            console.error('Error adding company:', error);
            return throwError(() => error);
        })
    );
}

  updateCompany(company: Company): Observable<Company> {
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.httpClient.put<Company>(`${this.path}Companies/UpdateCompany`, company, { headers });
  }

  getCompanyById(id: string): Observable<Company> {
    return this.httpClient.get<Company>(`${this.path}Companies/GetCompanyById/${id}`);
  }

  deleteCompany(name: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.path}Companies/DeleteCompany/${name}`).pipe(
        tap(() => console.log(`Deleted company: ${name}`)),
        catchError(error => {
            console.error('Error deleting company:', error);
            return throwError(() => error);
        })
    );
}

  getCompanies(): Observable<Company[]> {
    return this.httpClient.get<Company[]>(`${this.path}Companies/GetAllCompanies`).pipe(
        tap(data => console.log('API Data:', data)),
        catchError(error => {
            console.error('Error occurred:', error);
            return throwError(() => error);
        })
    );
}
getCompaniesName(): Observable<string[]> {
  return this.httpClient.get<string[]>(`${this.path}Companies/GetAllCompaniesName`).pipe(

      tap(data => console.log('API Data:', data)),
      catchError(error => {
          console.error('Error occurred:', error);
          return throwError(() => error);
      })
  );
}
getCompanyByNamex(name: string): Observable<Company> {
  return this.httpClient.get<Company>(`${this.path}Companies/GetAllCompaniesNamex/${name}`).pipe(
    tap(company => console.log('Fetched company by name:', company)),
    catchError(error => {
      console.error('Error fetching company by name:', error);
      return throwError(() => error);
    })
  );
}

}