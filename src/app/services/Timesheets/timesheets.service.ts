import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Timesheet } from 'src/app/models/timesheet/timesheet.model';

@Injectable({
  providedIn: 'root'
})
export class TimesheetService {

  private timesheets: Timesheet[] = [];
  private timesheetsSubject = new BehaviorSubject<Timesheet[]>([]);

  constructor() {
    // Create some sample timesheets in the constructor
    const t1 = new Timesheet(1, 1, '2024-09-01', 8, 2, 200, 25, 16, 2);
    const t2 = new Timesheet(2, 2, '2024-09-01', 7, 1, 180, 30, 15, 3);
    const t3 = new Timesheet(3, 3, '2024-09-01', 8, 3, 220, 30, 18, 2.5);
    const t4 = new Timesheet(4, 4, '2024-09-01', 6, 2, 190, 32, 14, 3);
    const t5 = new Timesheet(5, 5, '2024-09-01', 8, 4, 230, 30, 20, 2.7);
    this.timesheets.push(t1, t2, t3, t4, t5);

    this.timesheetsSubject.next([...this.timesheets]);
  }

  addTimesheet(timesheet: Timesheet) {
    this.timesheets.push(timesheet);
    this.timesheetsSubject.next([...this.timesheets]);
  }

  updateTimesheet(timesheet: Timesheet) {
    const index = this.timesheets.findIndex(t => t.id === timesheet.id);
    if (index !== -1) {
      this.timesheets[index] = timesheet;
      this.timesheetsSubject.next([...this.timesheets]);
    }
  }

  getTimesheetById(id: number) {
    const index = this.timesheets.findIndex(t => t.id === id);
    if (index !== -1) {
      return this.timesheets[index];
    } else {
      return null;
    }
  }

  deleteTimesheet(id: number) {
    const index = this.timesheets.findIndex(t => t.id === id);
    if (index !== -1) {
      this.timesheets.splice(index, 1);
      this.timesheetsSubject.next([...this.timesheets]);
    }
  }

  getTimesheets() {
    return this.timesheetsSubject.asObservable();
  }
}
