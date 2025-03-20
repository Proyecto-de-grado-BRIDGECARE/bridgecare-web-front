import {inject, Injectable} from '@angular/core';
import { ref, listAll, deleteObject } from '@angular/fire/storage';
import { Storage, uploadBytes, getDownloadURL } from '@angular/fire/storage';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  DocumentReference,
  Firestore,
  getDocs,
  query,
  updateDoc,
  where
} from '@angular/fire/firestore';

import {map, Observable, of, switchMap} from "rxjs";
import {Inspection} from "../../../models/bridge/inspection";


const PATH = 'inventories';

@Injectable({
  providedIn: 'root'
})
export class InspectionServiceService {

  private _firestore = inject(Firestore);
  private _storage = inject(Storage);
  private _collection = collection(this._firestore, PATH);
  inspection: any;

  getInspections(bridgeIdentification: number): Observable<any[]> {
    const q = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeIdentification));
    return collectionData(q, {idField: 'id'}).pipe(
      switchMap((inventories: any[]) => {
        if (inventories.length === 0) {
          return of([]);
        } else {
          const inventoryId = inventories[0].id;
          const inventoryDocRef = doc(this._firestore, `${PATH}/${inventoryId}`);
          const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
          return collectionData(inspectionCollectionRef).pipe(
            map(inspections => {
              return inspections.map(inspection => ({
                id: inspection['inspectionId'],
                administrator: inspection['administrator'],
                inspector: inspection['inspector'],
                date: inspection['date']
              }));
            })
          );
        }
      })
    );
  }

  async setInspection(bridgeId: any, inspection: Inspection): Promise<DocumentReference> {
    const q = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
    const inventoriesSnapshot = await getDocs(q);
    const inventoryDocRef = inventoriesSnapshot.docs[0].ref;
    const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
    return addDoc(inspectionCollectionRef, inspection);

  }

  async getInspection(bridgeIdentification: any, inspectionId: any): Promise<Inspection | null> {
    try {
      // Search the inventory with the provided ID
      const inventoryQuery = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeIdentification));
      const inventorySnapshot = await getDocs(inventoryQuery);
      //verify if the inventory was found
      if (inventorySnapshot.empty) {
        console.error('No se encontró ningún inventario con el ID proporcionado');
        return null;
      }
      //Get the reference to the found inventory document
      const inventoryDocRef = inventorySnapshot.docs[0].ref;
      console.log('Path al inventario:', inventoryDocRef.path);
      //Get the inspections inside the inventory
      const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
      console.log('Path a las inspecciones:', inspectionCollectionRef.path);

      const inspectionsQuery = query(inspectionCollectionRef, where('inspectionId', '==', parseInt(inspectionId)));
      const inspectionsSnapshot = await getDocs(inspectionsQuery);
      // Verify if any inspection was found with the provided ID
      if (inspectionsSnapshot.empty) {
        console.error('No se encontró ninguna inspección con el ID proporcionado');
        return null;
      }
      // Get the first found inspection document (assuming there is only one match)
      const inspectionData = inspectionsSnapshot.docs[0].data();
      console.log('Información de la inspección:', inspectionData);

      // Convert the data to the types defined in the model
      return {
        inspectionId: inspectionData['inspectionId'],
        date: inspectionData['date'],
        temperature: inspectionData['temperature'],
        inspector: inspectionData['inspector'],
        administrator: inspectionData['administrator'],
        nextInspectionYear: inspectionData['nextInspectionYear'],
        inspectionComponents: inspectionData['inspectionComponents'],
        generalComments: inspectionData['generalComments']
      };
    } catch (error) {
      console.error('Error al obtener la inspección:', error);
      return null;
    }
  }

  async generateInspectionId(): Promise<number | null> {
    let id: number;
    let repeat: boolean;

    do {
      id = Math.floor(Math.random() * 1000000);
      repeat = await this.checkIfIdExists(id);
    } while (repeat);

    return id;
  }

  async checkIfIdExists(id: number): Promise<boolean> {
    try {
      const inventoriesSnapshot = await getDocs(this._collection);

      for (const inventoryDoc of inventoriesSnapshot.docs) {
        const inspectionCollectionRef = collection(inventoryDoc.ref, 'inspections');
        const inspectionsSnapshot = await getDocs(inspectionCollectionRef);

        for (const inspectionDoc of inspectionsSnapshot.docs) {
          if (inspectionDoc.id === id.toString()) {
            return true;
          }
        }
      }
      return false;
    } catch (error) {
      console.error('Error al verificar la existencia del ID de inspección:', error);
      return true;
    }
  }

  async updateInspection(bridgeId: any, updatedInspection: Inspection): Promise<void> {
    try {
      // Search the inventory with the provided ID
      const inventoryQuery = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
      const inventorySnapshot = await getDocs(inventoryQuery);
      // Verify if the inventory was found
      if (inventorySnapshot.empty) {
        console.error('No se encontró ningún inventario con el ID proporcionado');
        return;
      }
      //Get the reference to the found inventory document
      const inventoryDocRef = inventorySnapshot.docs[0].ref;
      //Get the inspections inside the inventory
      const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
      // Perform a query to find the specific inspection
      const inspectionQuery = query(inspectionCollectionRef, where('inspectionId', '==', updatedInspection.inspectionId));
      const inspectionSnapshot = await getDocs(inspectionQuery);
      // Verify if the inspection was found
      if (inspectionSnapshot.empty) {
        console.error('No se encontró ninguna inspección con el ID proporcionado');
        return;
      }
      //Get the reference to the found inspection document
      const inspectionDocRef = inspectionSnapshot.docs[0].ref;
      // Update the inspection data with the new data
      await updateDoc(inspectionDocRef, {...updatedInspection});

      console.log('Inspección actualizada con éxito');
    } catch (error) {
      console.error('Error al actualizar la inspección:', error);
    }
  }

  async updateInspectionPhotos(bridgeId: number, inspectionId: number, photos: string[]): Promise<void> {
    const inventoryQuery = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
    const inventorySnapshot = await getDocs(inventoryQuery);
    if (inventorySnapshot.empty) {
      console.error('No se encontró ningún inventario con el ID proporcionado');
      return;
    }
    const inventoryDocRef = inventorySnapshot.docs[0].ref;
    const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
    const inspectionQuery = query(inspectionCollectionRef, where('inspectionId', '==', inspectionId));
    const inspectionSnapshot = await getDocs(inspectionQuery);
    if (inspectionSnapshot.empty) {
      console.error('No se encontró ninguna inspección con el ID proporcionado');
      return;
    }
    const inspectionDocRef = inspectionSnapshot.docs[0].ref;
    await updateDoc(inspectionDocRef, { photos: photos });
  }

  async deleteInspection(bridgeId: any, id: any): Promise<void> {
    try {
      const inventoryQuery = query(this._collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
      const inventorySnapshot = await getDocs(inventoryQuery);
      if (inventorySnapshot.empty) {
        console.error('No se encontró ningún inventario con el ID proporcionado');
        return;
      }
      const inventoryDocRef = inventorySnapshot.docs[0].ref;
      const inspectionCollectionRef = collection(inventoryDocRef, 'inspections');
      const inspectionQuery = query(inspectionCollectionRef, where('inspectionId', '==', id));
      const inspectionSnapshot = await getDocs(inspectionQuery);
      if (inspectionSnapshot.empty) {
        console.error('No se encontró ninguna inspección con el ID proporcionado');
        return;
      }
      const inspectionDocRef = inspectionSnapshot.docs[0].ref;

      await this.deleteInspectionPhotosFolder(bridgeId, id); // Delete all photos from the folder

      await deleteDoc(inspectionDocRef); // Delete inspection
      console.log('Inspección eliminada con éxito');
    } catch (error) {
      console.error('Error al eliminar la inspección:', error);
    }
  }


  async deleteInspectionPhotosFolder(bridgeId: number, inspectionId: number): Promise<void> {
    try {
      const folderRef = ref(this._storage, `images/${bridgeId}/inspections/${inspectionId}`);
      const listResult = await listAll(folderRef);
      const deletionPromises = listResult.items.map(itemRef => deleteObject(itemRef));
      await Promise.all(deletionPromises);
      console.log('Todas las fotos de la carpeta han sido eliminadas');
    } catch (error) {
      console.error('Error al eliminar las fotos de la carpeta:', error);
    }
  }


  async uploadPhoto(bridgeId: number, inspectionId: number, file: File): Promise<string> {
    const storageRef = ref(this._storage, `images/${bridgeId}/inspections/${inspectionId}/${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
  }

  async deletePhoto(bridgeId: number, inspectionId: number, photoUrl: string): Promise<void> {
    try {
      const storageRef = ref(this._storage, photoUrl);
      await deleteObject(storageRef);
      console.log(`Foto eliminada: ${photoUrl}`);
    } catch (error) {
      console.error('Error al eliminar la foto:', error);
    }
  }


}
