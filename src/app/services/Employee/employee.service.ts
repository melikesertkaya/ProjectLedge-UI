import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Employee } from 'src/app/models/employee/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  private employees: Employee[] = [];
  private employeesSubject = new BehaviorSubject<Employee[]>([]);

  constructor() {
    // Create at least one employee in the constructor
    const e1 = new Employee(1, 'Enes', 'Aslan', 'Doğuş', 25, 50000, 2000);
    const e2 = new Employee(2, 'Ali', 'Deniz', 'Gülermak', 30, 55000, 2100);
    const e3 = new Employee(3, 'Fatih', 'Yılmaz', 'Doğuş', 30, 60000, 2200);
    const e4 = new Employee(4, 'Süleyman', 'Hakkı', 'Doğuş', 30, 62000, 2300);
    const e5 = new Employee(5, 'Ferat', 'Kaya', 'Gülermak', 30, 64000, 2400);
    this.employees.push(e1, e2, e3, e4, e5);

    this.employeesSubject.next([...this.employees]);
  }

  addEmployee(employee: Employee) {
    this.employees.push(employee);
    this.employeesSubject.next([...this.employees]);
  }

  updateEmployee(employee: Employee) {
    const index = this.employees.findIndex(e => e.id === employee.id);
    if (index !== -1) {
      this.employees[index] = employee;
      this.employeesSubject.next([...this.employees]);
    }
  }

  getEmployeeById(id: number) {
    const index = this.employees.findIndex(e => e.id === id);
    if (index !== -1) {
      return this.employees[index];
    } else {
      return null;
    }
  }

  deleteEmployee(id: number) {
    const index = this.employees.findIndex(e => e.id === id);

    if (index !== -1) {
      this.employees.splice(index, 1);
      this.employeesSubject.next([...this.employees]);
    }
  }

  getEmployees() {
    return this.employeesSubject.asObservable();
  }
}
