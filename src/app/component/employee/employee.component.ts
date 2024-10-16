import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { DialogService } from 'primeng/dynamicdialog';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [DialogService]
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];
  errorMessage: string = '';
  isFormVisible: boolean = false; // Track form visibility
  form: FormGroup; // Reactive form for employee

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private employeeService: EmployeeService,
    public dialogService: DialogService,
    private fb: FormBuilder // Inject FormBuilder for reactive forms
  ) {
    this.form = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      position: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadEmployees();
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
    this.isFormVisible = true; // Show the form
  }

  addEmployee() {
    if (this.form.invalid) {
      return; // If the form is invalid, do not proceed
    }

    const newEmployee: Employee = this.form.value;

    this.employeeService.addEmployee(newEmployee).subscribe({
      next: () => {
        this.loadEmployees(); // Refresh employee list after adding
        this.hideForm(); // Hide the form
      },
      error: (error) => {
        this.errorMessage = 'Çalışan eklerken bir hata oluştu. Lütfen tekrar deneyin.';
        console.error('Error adding employee:', error);
      }
    });
  }

  hideForm() {
    this.isFormVisible = false; // Hide the form
    this.form.reset(); // Reset the form fields
  }

  openEditDialog(id: number) {
    const dialogRef = this.dialogService.open(EmployeeEditComponent, {
      data: { id },
      header: 'Çalışanı Düzenle',
      width: '70%'
    });

    // Refresh employees list after the dialog is closed
    dialogRef.onClose.subscribe(() => {
      this.loadEmployees();
    });
  }

  navigateToDelete(id: number) {
    this.router.navigate(['employee/delete', id]);
  }
}
