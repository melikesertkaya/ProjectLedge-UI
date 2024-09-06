import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  public changeValue: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  constructor() { }
}
