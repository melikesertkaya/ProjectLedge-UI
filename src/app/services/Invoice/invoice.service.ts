// src/app/services/receipt-management/invoice.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Invoice } from 'src/app/models/invoice/invoice.model';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private invoices: Invoice[] = [];
  private invoicesSubject = new BehaviorSubject<Invoice[]>([]);

  constructor() {
    // Initialize with a sample invoice
    const sampleInvoice = new Invoice(1, 'Alış', 'Doğuş', 'alacaklar', 1000, 18, new Date(), 'CSS', 'INV001');
    this.invoices.push(sampleInvoice);
    this.invoicesSubject.next(this.invoices);
  }

  addInvoice(invoice: Invoice): void {
    this.invoices.push(invoice);
    this.invoicesSubject.next([...this.invoices]);
  }

  deleteInvoice(id: number): void {
    this.invoices = this.invoices.filter((invoice) => invoice.id !== id);
    this.invoicesSubject.next([...this.invoices]);
  }

  getInvoices(): Observable<Invoice[]> {
    return this.invoicesSubject.asObservable();
  }

  updateInvoice(invoice: Invoice): void {
    const index = this.invoices.findIndex((inv) => inv.id === invoice.id);
    if (index !== -1) {
      this.invoices[index] = invoice;
      this.invoicesSubject.next([...this.invoices]);
    }
  }
}
