import { Inventory } from '../../../models/bridge/inventory';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { GeographicInformation } from '../../../models/bridge/posicionGeografica';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  private readonly apiUrl = 'https://api.bridgecare.com.co/inventario';

  constructor(private http: HttpClient) {
  }

  getInventories(): Observable<Inventory[]> {
    const token = localStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Inventory[]>(`${this.apiUrl}/all`, { headers });
  }
  
  getInventoryByBridgeId(puenteId: number): Observable<Inventory> {
    const token = localStorage.getItem('userToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<Inventory>(`${this.apiUrl}/puente/${puenteId}`, { headers });
  }
  

  getInventoriesByMunicipality(municipality: string): Observable<Inventory[]> {
    const params = new HttpParams().set('municipality', municipality);
    return this.http.get<Inventory[]>(`${this.apiUrl}/by-municipality`, { params });
  }

  getInventoryById(id: number): Observable<Inventory> {
    return this.http.get<Inventory>(`${this.apiUrl}/${id}`);
  }
  

  getBridgeName(bridgeIdentification: string): Observable<string> {
    return this.http.get(`${this.apiUrl}/bridge-name/${bridgeIdentification}`, { responseType: 'text' });
  }

  createInventory(inventory: Inventory): Observable<any> {
    return this.http.post(`${this.apiUrl}`, inventory);
  }

  updateInventory(id: string, inventory: Inventory): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, inventory);
  }

  deleteInventory(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  checkBridgeIdentificationExists(bridgeIdentification: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${bridgeIdentification}`);
  }

  getBridgeBasicInfo(bridgeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/basic-info/${bridgeId}`);
  }

  getGeographicInventories(): Observable<GeographicInformation[]> {
    const token = localStorage.getItem('userToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
    return this.http.get<GeographicInformation[]>(`${this.apiUrl}/mapa`, {headers});
  }


  async uploadImage(file: File, path: string): Promise<string> {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('path', path); // opcional, depende de cómo organices archivos en backend
  
    const response = await this.http.post<{ url: string }>(
      'http://localhost:8080/api/files/upload',
      formData
    ).toPromise();
  
    return response?.url ?? '';
  }
}
