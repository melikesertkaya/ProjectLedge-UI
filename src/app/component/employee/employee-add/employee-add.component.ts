import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { Employee } from 'src/app/models/employee/employee.model';
import { DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employeeAddForm!: FormGroup; 

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    public ref: DynamicDialogRef
  ) {}

  ngOnInit(): void {
    this.employeeAddForm = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      siteNumber: ['', Validators.required],
      hourlyRate: ['', [Validators.required, Validators.min(0)]],
      salary: ['', [Validators.required, Validators.min(0)]],
      socialSecurityPremium: ['', [Validators.required, Validators.min(0)]],
    });
  }

  onSubmit() {
    if (this.employeeAddForm.valid) {
      const newEmployee: Employee = this.prepareEmployeeObject();
      this.employeeService.addEmployee(newEmployee).subscribe({
        next: (response) => {
          console.log('Employee added successfully:', response);
          this.ref.close();
        },
        error: (error) => {
          console.error('Error adding employee:', error);
          if (error.status === 400 && error.error.includes('Invalid Construction Site number')) {
            alert('Site number should be a valid GUID.');
          } else {
            alert('An error occurred while adding the employee. Please try again.');
          }
        }
      });
    } else {
      this.displayFormErrors();
    }
  }

  private prepareEmployeeObject(): Employee {
    return {
      id: 0, 
      firstName: this.employeeAddForm.get('firstName')?.value,
      lastName: this.employeeAddForm.get('lastName')?.value,
      siteNumber: this.employeeAddForm.get('siteNumber')?.value, 
      hourlyRate: parseFloat(this.employeeAddForm.get('hourlyRate')?.value || '0'),
      salary: parseFloat(this.employeeAddForm.get('salary')?.value || '0'),
      socialSecurityPremium: parseFloat(this.employeeAddForm.get('socialSecurityPremium')?.value || '0')
    };
  }

  private displayFormErrors() {
    for (const control in this.employeeAddForm.controls) {
      if (this.employeeAddForm.controls.hasOwnProperty(control)) {
        const controlErrors = this.employeeAddForm.controls[control].errors;
        if (controlErrors) {
          console.warn(`Validation errors for ${control}:`, controlErrors);
        }
      }
    }
  }
}
