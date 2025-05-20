import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User, UserForm } from '../../../models/account/user';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private readonly apiUrl = ' https://api.bridgecare.com.co/usuarios';

  constructor(private http: HttpClient, private authService: AuthService) {}

  getUsers(): Observable<User[]> {
    const token = localStorage.getItem('userToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers });
  }
  
  
  getUser(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/${id}`);
  }

  searchUserByQuery(query: string): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/search?query=${query}`);
  }

  searchUserByEmailAndPassword(email: string, password: string): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/login`, { email, password });
  }

  createUser(user: any): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/register`, user);
  }

  updateUser(id: number, user: any): Observable<User> {
    const token = localStorage.getItem('userToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const token = localStorage.getItem('userToken');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, { headers });
  }
}
