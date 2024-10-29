import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { Employee } from 'src/app/models/employee/employee.model';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Personnel } from 'src/app/models/employee/personnel.model';
import { PersonelCurrentAccount } from 'src/app/models/timesheet/personelCurrentAccount';
@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);
  private path=environment.apiUrl
  constructor(private httpClient:HttpClient) {
   
  }
  getPersonnelById(id: string): Observable<any> {
    return this.httpClient.get<any>(`${this.path}/${id}`);
  }

  // Get all personnels
  getAllPersonnels(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.path}Personnels/GetAllPersonnels`);
  }

  // Create a new personnel
  createPersonnel(employeeRequest: Employee): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.httpClient.post<any>(`${this.path}/CreatePersonnel`, employeeRequest, { headers });
  }
  addEmployee(employee: Employee): Observable<Employee> {
    return this.httpClient.post<Employee>(`${this.path}Personnels/CreatePersonnel`, employee, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('Employee added:', response);
        const currentEmployees = this.employeesSubject.value;
        this.employeesSubject.next([...currentEmployees, response]); // Update subject
      }),
      catchError(error => {
        console.error('Error adding employee:', error);
        return throwError(() => error);
      })
    );
  }

  // Get All Employees
  getEmployees(): Observable<Employee[]> {
    return this.httpClient.get<Employee[]>(`${this.path}Personnels/GetAllPersonnels`).pipe(
      tap(data => {
        console.log('Fetched employees from API:', data);
        this.employeesSubject.next(data); // Update subject with fetched data
      }),
      catchError(error => {
        console.error('Error fetching employees:', error);
        return throwError(() => error);
      })
    );
  }

  updateEmployee(employee: Employee) {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.employeesSubject.next([...this.employees]);
    }
  }

  getEmployeeById(id: string) {
    const index = this.employees.findIndex(e => e.id === id);
    if (index !== -1) {
      return this.employees[index];
    } else {
      return null;
    }
  }
  getEmployeeByIdx(id: string): Observable<Personnel> {
    return this.httpClient.get<Personnel>(`${this.path}Personnels/GetEmployeeById?id=${id}`).pipe(
        tap(employee => console.log('Fetched employee by ID:', employee)),
        catchError(error => {
            console.error('Error fetching employee by ID:', error);
            return throwError(() => error);
        })
    );
}

  deleteEmployee(id: string): Observable<any> {
    return this.httpClient.post<any>(`${this.path}Personnels/DeletePersonnel`, { id }, { // Pass ID as a string (GUID)
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('Personnel deleted:', response);
        const currentEmployees = this.employeesSubject.value;
        this.employeesSubject.next(currentEmployees.filter(employee => employee.id !== id)); // Update employee list after deletion
      }),
      catchError(error => {
        console.error('Error deleting personnel:', error);
        return throwError(() => error);
      })
    );
  }
  getPersonelCurrentAccount(id: string): Observable<PersonelCurrentAccount> {
    return this.httpClient.get<PersonelCurrentAccount>(`${this.path}Personnels/GetPersonelCurrentAccount?id=${id}`).pipe(
        tap(employee => console.log('Fetched employee by ID:', employee)),
        catchError(error => {
            console.error('Error fetching employee by ID:', error);
            return throwError(() => error);
        })
    );
}
  
}
