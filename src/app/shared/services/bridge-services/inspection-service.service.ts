import {inject, Injectable} from '@angular/core';
import {map, Observable, of, switchMap} from "rxjs";
import {Inspection} from "../../../models/bridge/inspection";
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class InspectionServiceService {
  private readonly apiUrl = 'https://api.bridgecare.com.co/inspeccion';

  constructor(private http: HttpClient){
  }

  getInspectionsByBridge(bridgeId: number): Observable<Inspection[]> {
    const token = localStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Inspection[]>(`${this.apiUrl}/puente/${bridgeId}`, { headers });
  }

  getInspectionById(inspectionId: number): Observable<Inspection> {
    const token = localStorage.getItem('userToken');
    const headers = { Authorization: `Bearer ${token}` };
    return this.http.get<Inspection>(`${this.apiUrl}/${inspectionId}`, { headers });
  }

  // async deleteInspectionPhotosFolder(bridgeId: number, inspectionId: number): Promise<void> {
  //   try {
  //     const folderRef = ref(this._storage, `images/${bridgeId}/inspections/${inspectionId}`);
  //     const listResult = await listAll(folderRef);
  //     const deletionPromises = listResult.items.map(itemRef => deleteObject(itemRef));
  //     await Promise.all(deletionPromises);
  //     console.log('Todas las fotos de la carpeta han sido eliminadas');
  //   } catch (error) {
  //     console.error('Error al eliminar las fotos de la carpeta:', error);
  //   }
  // }

  // async uploadPhoto(bridgeId: number, inspectionId: number, file: File): Promise<string> {
  //   const storageRef = ref(this._storage, `images/${bridgeId}/inspections/${inspectionId}/${file.name}`);
  //   await uploadBytes(storageRef, file);
  //   return await getDownloadURL(storageRef);
  // }

  // async deletePhoto(bridgeId: number, inspectionId: number, photoUrl: string): Promise<void> {
  //   try {
  //     const storageRef = ref(this._storage, photoUrl);
  //     await deleteObject(storageRef);
  //     console.log(`Foto eliminada: ${photoUrl}`);
  //   } catch (error) {
  //     console.error('Error al eliminar la foto:', error);
  //   }
  // }
}
