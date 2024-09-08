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
  employeeAddForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService,  public ref: DynamicDialogRef) { }

  ngOnInit(): void {
    this.employeeAddForm = this.formBuilder.group({
      id: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      siteNumber: ['', Validators.required],
      hourlyRate: ['', Validators.required],
      salary: ['', Validators.required],
      socialSecurityPremium: ['', Validators.required],
    });
  }

  addEmployee() {
    if (this.employeeAddForm.valid) {
      const id = this.employeeAddForm.get('id')?.value;
      const firstName = this.employeeAddForm.get('firstName')?.value;
      const lastName = this.employeeAddForm.get('lastName')?.value;
      const siteNumber = this.employeeAddForm.get('siteNumber')?.value;
      const hourlyRate = this.employeeAddForm.get('hourlyRate')?.value;
      const salary = this.employeeAddForm.get('salary')?.value;
      const socialSecurityPremium = this.employeeAddForm.get('socialSecurityPremium')?.value;

      const employee = new Employee(
        parseInt(id, 10),
        firstName,
        lastName,
        siteNumber,
        parseFloat(hourlyRate),
        parseFloat(salary),
        parseFloat(socialSecurityPremium)
      );
      

      try {
        this.employeeService.addEmployee(employee);
         this.ref.close(); // Close the dialog after adding the company
       } catch (error) {
         console.error('Error adding company:', error);
         // Handle error if necessary
       }
    }
  }
}
