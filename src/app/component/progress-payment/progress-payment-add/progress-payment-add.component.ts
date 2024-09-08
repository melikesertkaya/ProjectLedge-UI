import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProgressPayment } from 'src/app/models/progress-payment/progress-payment.model';
import { ProgressPaymentService } from 'src/app/services/progress-payment/progress-payment.service';

@Component({
  selector: 'app-progress-payment-add',
  templateUrl: './progress-payment-add.component.html',
  styleUrls: ['./progress-payment-add.component.css']
})
export class ProgressPaymentDialogComponent implements OnInit {
  form: FormGroup;

  constructor(
    private fb: FormBuilder,
    private progressPaymentService: ProgressPaymentService,
    private dialogRef: MatDialogRef<ProgressPaymentDialogComponent>
  ) {
    this.form = this.fb.group({
      date: [new Date(), Validators.required],
      euroBalance: [0, Validators.required],
      dollarBalance: [0, Validators.required],
      tlBalance: [0, Validators.required],
      amount: [0, Validators.required],
      siteName: ['', Validators.required],
      companyName: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  addProgressPayment(): void {
    if (this.form.valid) {
      const date = this.form.get('date')?.value;
      const euroBalance = this.form.get('euroBalance')?.value;
      const dollarBalance = this.form.get('dollarBalance')?.value;
      const tlBalance = this.form.get('tlBalance')?.value;
      const amount = this.form.get('amount')?.value;
      const siteName = this.form.get('siteName')?.value;
      const companyName = this.form.get('companyName')?.value;

      const progressPayment = new ProgressPayment(
        0, // Placeholder ID, set by backend or later logic
        new Date(date),
        euroBalance,
        dollarBalance,
        tlBalance,
        amount,
        siteName,
        companyName
      );

      this.progressPaymentService.addProgressPayment(progressPayment);
      this.dialogRef.close(); // Close the dialog after adding the payment
    }
  }
}
