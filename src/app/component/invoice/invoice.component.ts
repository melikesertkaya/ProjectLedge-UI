import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice } from 'src/app/models/invoice/invoice.model';
import { InvoiceService } from 'src/app/services/Invoice/invoice.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  form: FormGroup;
  invoices$ = this.invoiceService.getInvoices();

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService) {
    this.form = this.fb.group({
      type: ['Purchase', Validators.required],
      companyName: ['', Validators.required],
      description: ['', Validators.required],
      amount: [0, Validators.required],
      vat: [0, Validators.required],
      date: [new Date(), Validators.required],
      siteCode: ['', Validators.required],
      invoiceNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {}

  getNextId(): number {
    // Get the current highest ID from localStorage or set to 0 if not available
    const currentId = Number(localStorage.getItem('currentInvoiceId')) || 0;
    const newId = currentId + 1;
    localStorage.setItem('currentInvoiceId', newId.toString());
    return newId;
  }

  addInvoice() {
    if (this.form.valid) {
      const type = this.form.get('type')?.value;
      const companyName = this.form.get('companyName')?.value;
      const description = this.form.get('description')?.value;
      const amount = this.form.get('amount')?.value;
      const vat = this.form.get('vat')?.value;
      const date = this.form.get('date')?.value;
      const siteCode = this.form.get('siteCode')?.value;
      const invoiceNumber = this.form.get('invoiceNumber')?.value;

      const invoice = new Invoice(
        this.getNextId(), // Get the next ID
        type,
        companyName,
        description,
        amount,
        vat,
        new Date(date),
        siteCode,
        invoiceNumber
      );

      this.invoiceService.addInvoice(invoice)
    }
  }

  deleteInvoice(id: number) {
    this.invoiceService.deleteInvoice(id);
  }
}
