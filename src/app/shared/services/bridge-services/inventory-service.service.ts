import { Injectable, inject } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  Firestore,
  getDoc,
  updateDoc,
  DocumentReference,
  DocumentData, where, getDocs, query
} from '@angular/fire/firestore';
import { Inventory } from '../../../models/bridge/inventory';
import { Observable } from 'rxjs';
import { getDownloadURL, ref, uploadBytes, Storage, FirebaseStorage } from "@angular/fire/storage";
import { AbstractControl, AsyncValidatorFn, FormControl, ValidationErrors } from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class InventoryServiceService {
  private collection = collection(this.firestore, 'inventories');

  constructor(private firestore: Firestore, private storage: Storage) {
  }

  getInventories(): Observable<Inventory[]> {
    return collectionData(this.collection, {idField: 'id'}) as Observable<Inventory[]>;
  }

  async getInventoryByBridgeIdentification(bridgeIdentification: string): Promise<{
    id: string,
    data: Inventory
  } | undefined> {
    console.log(`Fetching inventory with bridgeIdentification: ${bridgeIdentification}`);
    const q = query(this.collection, where('generalInformation.bridgeIdentification', '==', bridgeIdentification));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      const docSnapshot = querySnapshot.docs[0];
      const data = docSnapshot.data() as Inventory;
      console.log(`Inventory data for bridgeIdentification ${bridgeIdentification}:`, data);
      return {id: docSnapshot.id, data: data};
    } else {
      console.log(`No inventory found with bridgeIdentification: ${bridgeIdentification}`);
      return undefined;
    }
  }

  getInventoriesByMunicipality(municipality: string): Observable<Inventory[]> {
    const queryRef = query(this.collection, where('stakeholders.municipality', '==', municipality));
    return collectionData(queryRef, { idField: 'id' }) as Observable<Inventory[]>;
  }

  async getBridgeName(bridgeIdentification: string): Promise<string | undefined> {
    try {
      const q = query(this.collection, where('generalInformation.bridgeIdentification', '==', bridgeIdentification));
      const inventoriesSnapshot = await getDocs(q);
      if (inventoriesSnapshot.empty) {
        return undefined;
      } else {
        const inventoryData = inventoriesSnapshot.docs[0].data();
        return inventoryData['generalInformation'].name;
      }
    } catch (error) {
      console.error('Error fetching bridge name:', error);
      return undefined;
    }
  }


  async createInventory(inventory: Inventory): Promise<void> {
    await addDoc(this.collection, inventory);
  }

  async updateInventory(id: string, inventory: Inventory): Promise<void> {
    await updateDoc(doc(this.firestore, `inventories/${id}`), {...inventory});
  }

  async deleteInventory(id: string): Promise<void> {
    await deleteDoc(doc(this.firestore, `inventories/${id}`));
  }

  async uploadImage(file: File, path: string): Promise<string> {
    const storageRef = ref(this.storage, path);
    const snapshot = await uploadBytes(storageRef, file);
    return getDownloadURL(snapshot.ref);
  }

  checkBridgeIdentificationUnique(): AsyncValidatorFn {
    return async (control: AbstractControl): Promise<ValidationErrors | null> => {
      const value = control.value;
      
      if (!value) {
        return null;
      }
  
      const q = query(this.collection, where('generalInformation.bridgeIdentification', '==', value));
      const querySnapshot = await getDocs(q);
  
      return querySnapshot.empty ? null : { bridgeIdentificationNotUnique: true };
    };
  }

  async checkBridgeIdentificationExists(id: string): Promise<boolean> {
    const q = query(this.collection, where('generalInformation.bridgeIdentification', '==', id));
    return getDocs(q).then(querySnapshot => {
      return !querySnapshot.empty;
    });
  }  

  async getBridgeBasicInfo(bridgeId: any) {
    try {
      const q = query(this.collection, where('generalInformation.bridgeIdentification', '==', bridgeId));
      const inventoriesSnapshot = await getDocs(q);
      if (inventoriesSnapshot.empty) {
        return undefined;
      } else {
        const inventoryData = inventoriesSnapshot.docs[0].data();
        return {
          bridgeIdentification: inventoryData['generalInformation'].bridgeIdentification,
          name: inventoryData['generalInformation'].name,
          pr: inventoryData['generalInformation'].pr,
          regional: inventoryData['generalInformation'].regional,
          regionalIdentification: inventoryData['generalInformation'].regionalIdentification,
          road: inventoryData['generalInformation'].road,
          roadIdentification: inventoryData['generalInformation'].roadIdentification,
        };
      }
    } catch (error) {
      console.error('Error fetching bridge name:', error);
      return undefined;
    }
  }
}
