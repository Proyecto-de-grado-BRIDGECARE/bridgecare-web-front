import { Injectable, inject } from '@angular/core';
import {
  Firestore,
  addDoc,
  collection,
  collectionData,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { User, UserForm } from '../../../models/account/user';
import { AuthService } from '../auth/auth.service';

const PATH = 'users';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private _firestore = inject(Firestore);

  private _collection = collection(this._firestore, PATH);

  getUsers() {
    return collectionData(this._collection, { idField: 'id' }) as Observable<
      User[]
    >;
  }

  async getUser(id: string) {
    try {
      const snapshot = await getDoc(this.document(id));
      return snapshot.data() as User;
    } catch (error) {
      //catch error
      return undefined;
    }
  }

  async searchUserByQuery(searchTerm: string): Promise<User[]> {
    const searchLower = searchTerm.toLowerCase();
    const nameQuery = query(this._collection, where('name', '>=', searchLower), where('name', '<=', searchLower + '\uf8ff'));
    const surnameQuery = query(this._collection, where('surname', '>=', searchLower), where('surname', '<=', searchLower + '\uf8ff'));
    const emailQuery = query(this._collection, where('email', '>=', searchLower), where('email', '<=', searchLower + '\uf8ff'));
    const identificationQuery = query(this._collection, where('identification', '>=', searchLower), where('identification', '<=', searchLower + '\uf8ff'));
  
    let queries = [nameQuery, surnameQuery, emailQuery, identificationQuery];
    const querySnapshots = await Promise.all(queries.map(q => getDocs(q)));
  
    const users = new Map();
    querySnapshots.forEach(snapshot => {
      snapshot.forEach(doc => {
        users.set(doc.id, { id: doc.id, ...doc.data() } as User);
      });
    });
  
    return Array.from(users.values());
  }

  async searchUserByEmailAndPassword(email: string, password: string): Promise<User | null> {
    const q = query(this._collection, where('email', '==', email));
    const querySnapshot = await getDocs(q);
    
    if (!querySnapshot.empty) {
      const userDoc = querySnapshot.docs[0];
      const user = { id: userDoc.id, ...userDoc.data() } as User;
  
      const passwordsMatch = await this.authService.comparePasswords(password, user.password);
      if (passwordsMatch) {
        return user;
      }
    }

    return null;
  }

  createUser(user: UserForm) {
    return addDoc(this._collection, user);
  }

  updateUser(id: string, user: UserForm) {
    return updateDoc(this.document(id), { ...user });
  }

  deleteUser(id: string) {
    return deleteDoc(this.document(id));
  }

  private document(id: string) {
    return doc(this._firestore, `${PATH}/${id}`);
  }

  constructor(private authService: AuthService) { }
}
