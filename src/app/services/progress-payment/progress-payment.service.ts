// src/app/services/progress-payment/progress-payment.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { ProgressPayment } from 'src/app/models/progress-payment/progress-payment.model';

@Injectable({
  providedIn: 'root',
})
export class ProgressPaymentService {
  private progressPayments: ProgressPayment[] = [];
  private progressPaymentsSubject = new BehaviorSubject<ProgressPayment[]>([]);
  private currentId = 0; // Keeps track of the last used ID

  constructor() {
    // Initialize with a sample progress payment
    const samplePayment = new ProgressPayment(
      this.getNextId(),
      new Date(),
      1000,
      500,
      2000,
      3000,
      'Site001',
      'Company A'
    );
    this.progressPayments.push(samplePayment);
    this.progressPaymentsSubject.next(this.progressPayments);
  }

  private getNextId(): number {
    return ++this.currentId;
  }

  addProgressPayment(payment: ProgressPayment): void {
    payment.id = this.getNextId(); // Assign the new ID
    this.progressPayments.push(payment);
    this.progressPaymentsSubject.next([...this.progressPayments]);
  }

  deleteProgressPayment(id: number): void {
    this.progressPayments = this.progressPayments.filter(payment => payment.id !== id);
    this.progressPaymentsSubject.next([...this.progressPayments]);
  }

  getProgressPayments(): Observable<ProgressPayment[]> {
    return this.progressPaymentsSubject.asObservable();
  }

  updateProgressPayment(payment: ProgressPayment): void {
    const index = this.progressPayments.findIndex(p => p.id === payment.id);
    if (index !== -1) {
      this.progressPayments[index] = payment;
      this.progressPaymentsSubject.next([...this.progressPayments]);
    }
  }
}
