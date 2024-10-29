import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, catchError, Observable, tap, throwError  } from 'rxjs';
import { UserRequest } from 'src/app/models/user/user.request';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private users: any[] = []; // Kullanıcıları saklamak için bir dizi
  private path=environment.apiUrl
  constructor(private httpClient:HttpClient) {}

  register(newUser: UserRequest):  Observable<boolean> {
    return this.httpClient.post<boolean>(`${this.path}Users/CreateUser`, newUser, {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }).pipe(
        tap(response => {
          
        }),
        catchError(error => {
          console.error('Error adding employee:', error);
          return throwError(() => error);
        })
      );
  }
 

  login(username: string, password: string): Observable<boolean> {
    const url = `${this.path}Users/ConfirmUserNameAndPassword?userName=${encodeURIComponent(username)}&password=${encodeURIComponent(password)}`;
    return this.httpClient.get<boolean>(url);
  }

}
