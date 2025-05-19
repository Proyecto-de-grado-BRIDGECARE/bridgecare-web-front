import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaServiceService {
  private baseUrl = 'https://api.bridgecare.com.co/alerta';

  constructor(private http: HttpClient) {}

  obtenerAlertasInspeccion(inspectionId: number): Observable<any[]> {
    const token = localStorage.getItem('userToken');

    if (!token) {
      console.warn('❌ No se encontró token en localStorage');
      return new Observable<any[]>(observer => {
        observer.error('No token available');
        observer.complete();
      });
    }

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(`${this.baseUrl}/inspeccion/${inspectionId}`, { headers });
  }
}
