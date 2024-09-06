import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { Employee } from 'src/app/models/employee/employee.model';

@Component({
  selector: 'app-employee-add',
  templateUrl: './employee-add.component.html',
  styleUrls: ['./employee-add.component.css']
})
export class EmployeeAddComponent implements OnInit {
  employeeForm: FormGroup = new FormGroup({});

  constructor(private formBuilder: FormBuilder, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
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
    if (this.employeeForm.valid) {
      const id = this.employeeForm.get('id')?.value;
      const firstName = this.employeeForm.get('firstName')?.value;
      const lastName = this.employeeForm.get('lastName')?.value;
      const siteNumber = this.employeeForm.get('siteNumber')?.value;
      const hourlyRate = this.employeeForm.get('hourlyRate')?.value;
      const salary = this.employeeForm.get('salary')?.value;
      const socialSecurityPremium = this.employeeForm.get('socialSecurityPremium')?.value;

      const employee = new Employee(
        parseInt(id, 10),
        firstName,
        lastName,
        siteNumber,
        parseFloat(hourlyRate),
        parseFloat(salary),
        parseFloat(socialSecurityPremium)
      );
      
      this.employeeService.addEmployee(employee);
      this.employeeForm.reset();
    }
  }
}
