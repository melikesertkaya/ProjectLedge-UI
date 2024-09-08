import { Component, OnInit } from '@angular/core';
import { Employee } from 'src/app/models/employee/employee.model';
import { Router, ActivatedRoute } from '@angular/router';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { DialogService } from 'primeng/dynamicdialog';
import { EmployeeEditComponent } from './employee-edit/employee-edit.component';
import { EmployeeAddComponent } from './employee-add/employee-add.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css'],
  providers: [DialogService]
})
export class EmployeeComponent implements OnInit {
  employees: Employee[] = [];

  constructor(
    private route: ActivatedRoute, 
    private router: Router, 
    private employeeService: EmployeeService,
    public dialogService: DialogService
  ) {}

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((employees) => {
      this.employees = employees;
    });
  }

  openAddDialog() {
    this.dialogService.open(EmployeeAddComponent, {
      header: 'Add Employee',
      width: '70%'
    });
  }

  openEditDialog(id: number) {
    const ref = this.dialogService.open(EmployeeEditComponent, {
      data: {
        id: id
      },
      header: 'Edit Employee',
      width: '70%'
    });
  }

  navigateToDelete(id: number) {
    this.router.navigate(['employee/delete', id]);
  }
}
