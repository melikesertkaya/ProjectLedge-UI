import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Timesheet } from 'src/app/models/timesheet/timesheet.model';

@Component({
  selector: 'app-timesheet-dialog',
  templateUrl: './timesheet-dialog.component.html',
  styleUrls: ['./timesheet-dialog.component.css']
})
export class TimesheetDialogComponent implements OnInit {
  form!: FormGroup;  // Definite assignment assertion

  constructor(
    public dialogRef: MatDialogRef<TimesheetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Timesheet,
    private fb: FormBuilder
  ) { }

  ngOnInit(): void {
    this.form = this.fb.group({
      date: [this.data.date || '', Validators.required],
      hoursWorked: [this.data.hoursWorked || 0, Validators.required],
      overtimeHours: [this.data.overtimeHours || 0, Validators.required],
      dailySalary: [this.data.dailySalary || 0, Validators.required],
      hourlyWage: [this.data.hourlyWage || 0, Validators.required],
      dailySocialSecurityPremium: [this.data.dailySocialSecurityPremium || 0, Validators.required],
      hourlySocialSecurityPremium: [this.data.hourlySocialSecurityPremium || 0, Validators.required]
    });
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save(): void {
    if (this.form.valid) {
      this.dialogRef.close(this.form.value);
    }
  }
}
