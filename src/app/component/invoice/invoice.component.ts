import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Invoice, InvoiceType } from 'src/app/models/invoice/invoice.model';
import { InvoiceService } from 'src/app/services/Invoice/invoice.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { CompanyService } from 'src/app/services/Company/company.service';
import { Company, CurrentAccountType, KdvType } from 'src/app/models/company/company.model';
@Component({
  selector: 'app-invoice',
  templateUrl: './invoice.component.html',
  styleUrls: ['./invoice.component.css']
})
export class InvoiceComponent implements OnInit {
  form: FormGroup;
  invoices$!: Observable<Invoice[]>;
  isFormVisible = false;
  invoices: Invoice[] = [];
  companies: string[] = [];

  constructor(private fb: FormBuilder, private invoiceService: InvoiceService, private companyService: CompanyService) {
    this.form = this.fb.group({
      type: ['', Validators.required],
      companyName: ['', Validators.required],
      description: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(0)]],
      vat: [0, [Validators.required, Validators.min(0)]],
      date: [new Date().toISOString().substring(0, 10), Validators.required],
      siteCode: ['', Validators.required],
      invoiceNumber: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.fetchInvoices();
    this.getInvoices();
    this.getCompanyName();
  }

  fetchInvoices(): void {
    this.invoices$ = this.invoiceService.getInvoices().pipe(
      map(invoices => invoices.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()))
    );
  }

  showForm() {
    this.isFormVisible = true;
  }

  hideForm() {
    this.isFormVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.form.reset({
      type: '', // Leave it empty to allow user selection
      companyName: '',
      description: '',
      amount: 0,
      vat: 0,
      date: new Date().toISOString().substring(0, 10),
      siteCode: '',
      invoiceNumber: ''
    });
  }

  addInvoice() {
    if (this.form.valid) {
      const invoice: Invoice = {
        type: this.form.value.type, // Get selected type
        companyName: this.form.value.companyName,
        description: this.form.value.description,
        amount: this.form.value.amount,
        vat: this.form.value.vat,
        date: new Date(this.form.value.date),
        siteCode: this.form.value.siteCode,
        invoiceNumber: this.form.value.invoiceNumber
      };

      this.invoiceService.addInvoice(invoice).subscribe({
        next: (response: Invoice) => {
          console.log('Invoice added:', response);
          this.fetchInvoices();
          this.hideForm();
        },
        error: (error) => {
          console.error('Error adding invoice:', error);
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }


  deleteInvoice(id?: number) {
    if (id !== undefined) {
      this.invoiceService.deleteInvoice(id).subscribe({
        next: () => {
          console.log(`Invoice deleted with ID: ${id}`);
          this.fetchInvoices();
        },
        error: (error) => {
          console.error('Error deleting invoice:', error);
        }
      });
    } else {
      console.warn('Cannot delete invoice: ID is undefined');
    }
  }
  getInvoices() {
    this.invoiceService.getInvoices().subscribe(
      (invoices) => {
        console.log('Fetched invoices:', invoices); // Log the invoices
        this.invoices = invoices.map(invoice => {
          // Ensure the date is parsed correctly
          return {
            ...invoice,
            date: new Date(invoice.date) // Convert to Date object
          };
        });
      },
      (error) => {
        console.error('Error fetching invoices:', error);
      }
    );
}
isValidDate(date: Date): boolean {
  return date instanceof Date && !isNaN(date.getTime());
}
getCompanyName() {
  this.companyService.getCompaniesName().subscribe(
    (companies) => {
      this.companies = companies; // Assign the company names to this.companies
    },
    (error) => {
      console.error('Error fetching companies:', error);
    }
  );
}
}
