import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Invoice } from 'src/app/models/invoice/invoice.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class InvoiceService {
  private apiUrl = `${environment.apiUrl}Invoice`; // Set the base API path for invoices

  constructor(private http: HttpClient) {}

  // Get all invoices
  getInvoices(): Observable<Invoice[]> {
    return this.http.get<Invoice[]>(`${this.apiUrl}/GetAllInvoiceAsync`).pipe(
      tap(data => console.log('Invoices fetched:', data)),
      catchError(error => {
        console.error('Error fetching invoices:', error);
        return throwError(() => error);
      })
    );
  }

  // Add a new invoice
  addInvoice(invoice: Invoice): Observable<Invoice> {
    return this.http.post<Invoice>(`${this.apiUrl}/CreateInvoice`, invoice, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      tap(response => console.log('Invoice created:', response)),
      catchError(error => {
        console.error('Error creating invoice:', error);
        return throwError(() => error);
      })
    );
  }
  
  // Get invoice by id
  getInvoiceById(id: number): Observable<Invoice> {
    return this.http.get<Invoice>(`${this.apiUrl}/${id}`).pipe(
      tap(data => console.log(`Invoice fetched by ID: ${id}`, data)),
      catchError(error => {
        console.error('Error fetching invoice by ID:', error);
        return throwError(() => error);
      })
    );
  }

  // Delete an invoice by id
  deleteInvoice(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`Invoice deleted with ID: ${id}`)),
      catchError(error => {
        console.error('Error deleting invoice:', error);
        return throwError(() => error);
      })
    );
  }
}
