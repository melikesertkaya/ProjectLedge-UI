import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { TimesheetDialogComponent } from '../timesheets/dialog/timesheet-dialog.component';
import { TimesheetService } from 'src/app/services/Timesheets/timesheets.service';
import { EmployeeService } from 'src/app/services/Employee/employee.service';

@Component({
  selector: 'app-timesheets',
  templateUrl: './timesheets.component.html',
  styleUrls: ['./timesheets.component.css']
})
export class TimesheetsComponent implements OnInit {
  timesheetForm: FormGroup;  // Initialize in constructor
  employees: any[] = [];  // Replace with your employee model
  timesheets$ = this.timesheetService.getTimesheets(); // Assuming an observable from your service

  constructor(
    private fb: FormBuilder,
    private timesheetService: TimesheetService,
    private employeeService: EmployeeService,
    public dialog: MatDialog
  ) { 
    this.timesheetForm = this.fb.group({
      employeeId: [''],
      date: [''],
      hoursWorked: [0],
      overtimeHours: [0],
      dailySalary: [0],
      hourlyWage: [0],
      dailySocialSecurityPremium: [0],
      hourlySocialSecurityPremium: [0]
    });
  }

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe(data => {
      this.employees = data;
    });
  }

  openDialog(timesheet?: any): void {
    const dialogRef = this.dialog.open(TimesheetDialogComponent, {
      width: '500px',
      data: timesheet || {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (timesheet) {
          // Update timesheet
          this.timesheetService.updateTimesheet(result);
        } else {
          // Add new timesheet
          this.timesheetService.addTimesheet(result);
        }
      }
    });
  }

  deleteTimesheet(id: number): void {
    this.timesheetService.deleteTimesheet(id);
  }

  getEmployeeName(employeeId: number): string {
    const employee = this.employees.find(e => e.id === employeeId);
    return employee ? `${employee.firstName} ${employee.lastName}` : 'Unknown';
  }
}
