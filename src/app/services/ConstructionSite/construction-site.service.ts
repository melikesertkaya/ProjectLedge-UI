import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ConstructionSites } from 'src/app/models/construction-site/construction-site.model';

@Injectable({
  providedIn: 'root'
})
export class ConstructionSitesService {
  private constructionSites: ConstructionSites[] = [];
  private constructionSitesSubject = new BehaviorSubject<ConstructionSites[]>([]);
  private apiUrl = `${environment.apiUrl}`;

  constructor(private httpClient: HttpClient) {
    // Örnek veriler (isteğe bağlı)
    const site1 = new ConstructionSites('Site 1', 1, 'd9b1a78a-0cda-4e9a-93c5-1de99d11f963');
    const site2 = new ConstructionSites('Site 2', 2, 'd9b1a78a-0cda-4e9a-93c5-1de99d11f964');
    this.constructionSites.push(site1, site2);
    this.constructionSitesSubject.next([...this.constructionSites]);
  }

  getAllConstructionSites(): Observable<ConstructionSites[]> {
    return this.httpClient.get<ConstructionSites[]>(`${this.apiUrl}ConstructionSites/GetAllConstructionSites`).pipe(
      tap(data => {
        this.constructionSites = data;
        this.constructionSitesSubject.next([...this.constructionSites]);
      }),
      catchError(error => {
        console.error('Error occurred:', error);
        return throwError(() => error);
      })
    );
  }

  getConstructionSiteById(id: string): Observable<ConstructionSites> {
    return this.httpClient.get<ConstructionSites>(`${this.apiUrl}/${id}`).pipe(
      tap(site => console.log('Fetched construction site:', site)),
      catchError(error => {
        console.error('Error fetching construction site:', error);
        return throwError(() => error);
      })
    );
  }
  getConstructionSitesByCompanyId(companyId: string): Observable<ConstructionSites[]> {
    return this.httpClient.get<ConstructionSites[]>(`${this.apiUrl}ConstructionSites/GetByCompanyId`, {
      params: { id: companyId } // Pass companyId as a query parameter
    });
  }
  
  createConstructionSite(constructionSiteRequest: ConstructionSites): Observable<ConstructionSites> {
    const requestPayload = {
        ConstructionSiteName: constructionSiteRequest.constructionSiteName,
        ConstructionSiteNo: constructionSiteRequest.constructionSiteNo,
        CompanyId: constructionSiteRequest.companyId
    };

    return this.httpClient.post<ConstructionSites>(`${this.apiUrl}ConstructionSites/CreateConstructionSite`, requestPayload, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
        tap(response => console.log('ConstructionSite added:', response)),
        catchError(error => {
            console.error('Error adding ConstructionSite:', error);
            return throwError(() => error);
        })
    );
}
  updateConstructionSite(constructionSite: ConstructionSites): Observable<ConstructionSites> {
    return this.httpClient.put<ConstructionSites>(`${this.apiUrl}ConstructionSites/UpdateConstructionSite`, constructionSite, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    }).pipe(
      tap(response => {
        console.log('Construction site updated:', response);
        const index = this.constructionSites.findIndex(site => site.companyId === constructionSite.companyId);
        if (index !== -1) {
          this.constructionSites[index] = response;
          this.constructionSitesSubject.next([...this.constructionSites]);
        }
      }),
      catchError(error => {
        console.error('Error updating construction site:', error);
        return throwError(() => error);
      })
    );
  }

  deleteConstructionSite(id: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}ConstructionSites/DeleteConstructionSite/${id}`).pipe(
      tap(() => {
        console.log(`Deleted construction site: ${id}`);
        this.constructionSites = this.constructionSites.filter(site => site.companyId !== id);
        this.constructionSitesSubject.next([...this.constructionSites]);
      }),
      catchError(error => {
        console.error('Error deleting construction site:', error);
        return throwError(() => error);
      })
    );
  }

  getConstructionSitesObservable(): Observable<ConstructionSites[]> {
    return this.constructionSitesSubject.asObservable();
  }
}
