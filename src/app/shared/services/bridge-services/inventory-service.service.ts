import { Inventory } from '../../../models/bridge/inventory';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, uploadBytes, Storage, FirebaseStorage } from "@angular/fire/storage";
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { InventarioDTO } from '../../../models/bridge/inventarioDTO';

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {

  private readonly apiUrl = 'http://localhost:8082/api/inventario';

  constructor(private http: HttpClient) {
  }

  getInventories(): Observable<Inventory[]> {
    const token = localStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Inventory[]>(`http://localhost:8082/api/inventario`, { headers });
  }
  

  getInventoryByBridgeIdentification(bridgeIdentification: string): Observable<Inventory>{
    return this.http.get<Inventory>(`${this.apiUrl}/bridge-identification/${bridgeIdentification}`);
  }

  getInventoriesByMunicipality(municipality: string): Observable<Inventory[]> {
    const params = new HttpParams().set('municipality', municipality);
    return this.http.get<Inventory[]>(`${this.apiUrl}/by-municipality`, { params });
  }

  getInventoryById(id: string): Observable<Inventory> {
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

  deleteInventory(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  checkBridgeIdentificationExists(bridgeIdentification: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.apiUrl}/exists/${bridgeIdentification}`);
  }

  getBridgeBasicInfo(bridgeId: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/basic-info/${bridgeId}`);
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
