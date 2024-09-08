import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ProgressPaymentService } from 'src/app/services/progress-payment/progress-payment.service';
import { ProgressPaymentDialogComponent } from '../progress-payment/progress-payment-add/progress-payment-add.component';

@Component({
  selector: 'app-progress-payment',
  templateUrl: './progress-payment.component.html',
  styleUrls: ['./progress-payment.component.css']
})
export class ProgressPaymentComponent implements OnInit {
  progressPayments$ = this.progressPaymentService.getProgressPayments(); // Observable to fetch progress payments

  constructor(
    private progressPaymentService: ProgressPaymentService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {}

  openAddDialog(): void {
    const dialogRef = this.dialog.open(ProgressPaymentDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(() => {
      // Optionally refresh the data after dialog is closed
    });
  }

  deleteProgressPayment(id: number): void {
    this.progressPaymentService.deleteProgressPayment(id);
  }
}
