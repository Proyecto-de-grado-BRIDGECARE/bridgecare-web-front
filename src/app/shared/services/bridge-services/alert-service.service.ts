import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AlertaServiceService {
  private baseUrl = 'http://localhost:8086/api/alerta';

  constructor(private http: HttpClient) {}

  obtenerAlertasInspeccion(inspectionId: number): Observable<any[]> {
    const token = localStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<any[]>(`${this.baseUrl}/inspeccion/${inspectionId}`, {headers});
  }
}
