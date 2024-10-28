import { Component, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/services/Employee/employee.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
@Component({
  selector: 'app-employee-delete',
  templateUrl: './employee-delete.component.html',
  styleUrls: ['./employee-delete.component.css']
})
export class EmployeeDeleteComponent  {
  
  constructor(
    public dialogRef: MatDialogRef<EmployeeDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { id: string,firstName: string,lastName: string }
  ) {}
  

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog without deleting
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Confirm deletion
  }
}
