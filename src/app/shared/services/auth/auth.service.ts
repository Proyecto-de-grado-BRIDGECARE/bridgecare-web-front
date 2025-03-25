import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { BehaviorSubject, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserRoleSubject = new BehaviorSubject<string | null>(null);
  private currentUserMunicipalitySubject = new BehaviorSubject<string | null>(null);
  private readonly apiUrl = 'http://localhost:8080/api/auth';

  constructor(private http: HttpClient) {
    this.loadUserRole();
  }

  loadUserRole(): void {
    const user = sessionStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      this.currentUserRoleSubject.next(userData.type);
      this.currentUserMunicipalitySubject.next(userData.municipality || null);
    }
  }

  login(userData: any): void {
    sessionStorage.setItem('user', JSON.stringify(userData));
    this.loadUserRole();
  }

  loginWithEmailAndPassword(correo: string, contrasenia: string): Promise<any> {
    const payload = { correo, contrasenia };
    console.log('Enviando payload:', payload); //Log para verificar
  
    return this.http.post(`${this.apiUrl}/login`, payload)
      .toPromise()
      .then((userData: any) => {
        console.log('Respuesta recibida:', userData); // <Verifica si llega algo
  
        if (userData && userData.token) {
          localStorage.setItem('userToken', userData.token);
          this.login(userData);
          return userData;
        } else {
          throw new Error('Token no proporcionado');
        }
      })
      .catch(error => {
        console.error('Error en loginWithEmailAndPassword:', error);
        throw error;
      });
  }
  

  getUserFromToken(token: string): Promise<any> {
    if (!token) {
      return Promise.reject('Token no encontrado');
    }
  
    const headers = {
      Authorization: `Bearer ${token}`
    };
  
    return this.http.get(`${this.apiUrl}/me`, { headers })
      .toPromise()
      .then((userData: any) => {
        if (userData) {
          localStorage.setItem('userToken', token); // Guardar el token original
          sessionStorage.setItem('user', JSON.stringify(userData));
  
          this.currentUserRoleSubject.next(userData.type);
          this.currentUserMunicipalitySubject.next(userData.municipality || null);
        }
        return userData;
      })
      .catch(error => {
        console.error('Error al obtener usuario desde token:', error);
        throw error;
      });
  }
  
  

  logout(): void {
    localStorage.removeItem('userToken');
    sessionStorage.clear();
    this.currentUserRoleSubject.next(null);
  }
  
  hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    const hashed = bcrypt.hash(password, saltRounds);
    return hashed;
  }

  comparePasswords(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }

  get userMunicipality$() {
    return this.currentUserMunicipalitySubject.asObservable();
  }

  isAdmin$ = this.currentUserRoleSubject.asObservable().pipe(
    map(role => role === '0')
  );

  isStudent$ = this.currentUserRoleSubject.asObservable().pipe(
    map(role => role === '1')
  );

  isMunicipal$ = this.currentUserRoleSubject.asObservable().pipe(
    map(role => role === '2')
  );

  isPrivilegedUser$ = combineLatest([this.isAdmin$, this.isStudent$]).pipe(
    map(([isAdmin, isStudent]) => isAdmin || isStudent)
  );
}
