import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { DialogService } from 'primeng/dynamicdialog';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Personnel } from 'src/app/models/employee/personnel.model';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeDeleteComponent } from './employee-delete/employee-delete.component';
export enum PersonnelRole {
  Worker = 0,
  Supervisor = 1,
  Engineer = 2,
  Manager = 3
}
@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [DialogService]
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string = '';
  isFormVisible: boolean = false; 
  form: FormGroup; 
  personnels: any[] = [];
  newPersonnel: Employee = {
    id: '', 
    firstName: '',
    lastName: '',
    siteNumber: '',
    hourlyRate: 0,
    salary: 0,
    socialSecurityPremium: 0,
  };
  personnelRoles = [
    { key: PersonnelRole.Worker, value: 'Worker' },
    { key: PersonnelRole.Supervisor, value: 'Supervisor' },
    { key: PersonnelRole.Engineer, value: 'Engineer' },
    { key: PersonnelRole.Manager, value: 'Manager' }
  ];
  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private employeeService: EmployeeService,
    public dialogService: DialogService,
    private dialog: MatDialog,
    private fb: FormBuilder 
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.getAllPersonnels();
  }
  getAllPersonnels() {
    this.employeeService.getEmployees().subscribe(
      (data) => {
        this.personnels =this.mapPersonnel(data);
        
      },
    );
  }
  private mapPersonnel(data: any[]): Personnel[] {
    return data.map((personnel) => {
      return new Personnel(
        personnel.Id,  
        personnel.FirstName,  
        personnel.LastName,  
        personnel.DateOfBirth,  
        personnel.Role,  
        personnel.HourlySalary,  
        personnel.TotalSalary,  
        personnel.HourlySgkPremium,  
        personnel.TotalSgkPremium,  
        personnel.ConstructionSiteName ?? 'Unknown',  
        personnel.CompanyName ?? 'Unknown' 
      );
    });
  }
  createPersonnel() {
    this.employeeService.createPersonnel(this.newPersonnel).subscribe(
      (response) => {
        console.log('Personnel created successfully', response);
        this.getAllPersonnels(); 
      },
    );
  }
  loadEmployees() {
    this.employeeService.getEmployees().subscribe({
      next: (employees) => {
        this.employees = employees;
      },
      error: (error) => {
        this.errorMessage = 'Çalışanları getirirken bir hata oluştu. Lütfen daha sonra tekrar deneyin.';
        console.error('Error fetching employees:', error);
      }
    });
  }

  openAddDialog() {
    this.isFormVisible = true; 
  }

  addEmployee() {
    if (this.form.invalid) {
      return; 
    }

    const newEmployee: Employee = this.form.value;

    this.employeeService.addEmployee(newEmployee).subscribe({
      next: () => {
        this.loadEmployees(); 
        this.hideForm(); 
        this.getAllPersonnels(); 
      },
      error: (error) => {
        this.errorMessage = 'Çalışan eklerken bir hata oluştu. Lütfen tekrar deneyin.';
        console.error('Error adding employee:', error);
      }
    });
  }

  hideForm() {
    this.isFormVisible = false; 
    this.form.reset(); 
  }

  openEditDialog(id: number) {
    const dialogRef = this.dialogService.open(EmployeeEditComponent, {
      data: { id },
      header: 'Çalışanı Düzenle',
      width: '70%'
    });

    dialogRef.onClose.subscribe(() => {
      this.loadEmployees();
    });
  }

  navigateToDelete(id: string,firstName:string,lastName:string): void {
    const dialogRef = this.dialog.open(EmployeeDeleteComponent, {
      width: '400px',
      data: { id,firstName,lastName }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) { // If user confirmed deletion
        this.employeeService.deleteEmployee(id).subscribe({
          next: () => {
            console.log('Company deleted successfully.');
            window.location.reload();
          },
          error: (error) => {
            console.error('Error deleting company:', error);
          }
        });
      }
    });
}
goToEmployeeDetails(id: string): void {
  this.router.navigate(['employee-detail', id]);
}
}
