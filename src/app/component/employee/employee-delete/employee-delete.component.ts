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

  constructor(private route: ActivatedRoute, private router: Router, private employeeService: EmployeeService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.id = +params.get('id')!;
    });
  }

  deleteEmployee() {
    this.employeeService.deleteEmployee(this.id);
    // Navigate back to the list after deletion
    this.router.navigate([''], { queryParams: { tab: 'employee' } });
  }

  cancel() {
    // Navigate back to the list without deleting
    this.router.navigate([''], { queryParams: { tab: 'employee' } });
  }
}
