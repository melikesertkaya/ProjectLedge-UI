import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent implements OnInit {
  
  id: number = -1;
  employeeName: string = '';
  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.id = +this.route.snapshot.paramMap.get('id')!;
    const employee = this.employeeService.getEmployeeById(this.id);
    if (employee) {
      this.employeeName = employee.lastName;
    }
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.id);
    this.router.navigate(['menu'], { queryParams: { tab: 'employee' } });
  }

  cancel() {
    this.router.navigate(['menu'], { queryParams: { tab: 'employee' } });
  }
}
