import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-company-delete',
  templateUrl: './company-delete.component.html',
  styleUrls: ['./company-delete.component.css']
})
export class CompanyDeleteComponent {
  constructor(
    public dialogRef: MatDialogRef<CompanyDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { companyName: string }
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // Close dialog without deleting
  }

  onConfirm(): void {
    this.dialogRef.close(true); // Confirm deletion
  }
}
