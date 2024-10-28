import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { Employee } from 'src/app/models/employee/employee.model';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogRef } from 'primeng/dynamicdialog';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit {
  editForm: FormGroup = new FormGroup({});
  id: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private router: Router,
    public ref: DynamicDialogRef,
    public config: DynamicDialogConfig
  ) {}

  ngOnInit(): void {
    this.id = this.config.data.id;

    // Get the employee data for pre-filling the form
    const employee = this.employeeService.getEmployeeById(this.id);

    this.editForm = this.formBuilder.group({
      firstName: [employee?.firstName, Validators.required],
      lastName: [employee?.lastName, Validators.required],
      siteNumber: [employee?.siteNumber, Validators.required],
      hourlyRate: [employee?.hourlyRate, Validators.required],
      salary: [employee?.salary, Validators.required],
      socialSecurityPremium: [employee?.socialSecurityPremium, Validators.required],
    });
  }

  updateEmployee() {
    if (this.editForm.valid) {
      const updatedEmployee = new Employee(
        this.id,
        this.editForm.get('firstName')?.value,
        this.editForm.get('lastName')?.value,
        this.editForm.get('siteNumber')?.value,
        parseFloat(this.editForm.get('hourlyRate')?.value),
        parseFloat(this.editForm.get('salary')?.value),
        parseFloat(this.editForm.get('socialSecurityPremium')?.value)
      );

      this.employeeService.updateEmployee(updatedEmployee);
      this.ref.close(); // Close the dialog
    }
  }
}
