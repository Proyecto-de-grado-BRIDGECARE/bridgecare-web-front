import { Injectable } from '@angular/core';
import * as bcrypt from 'bcryptjs';
import { BehaviorSubject, combineLatest, firstValueFrom } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

interface LoginResponse {
  token: string;
  [key: string]: any; // Allows additional fields if needed
}


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

  private login(userData: LoginResponse) {
    // console.log('👤 Login realizado con:', userData);
    sessionStorage.setItem('user', JSON.stringify(userData));
    this.loadUserRole();
  }

  async loginWithEmailAndPassword(correo: string, contrasenia: string): Promise<LoginResponse> {
    const payload = {
      correo: correo,
      contrasenia: contrasenia
    };

    // Encode credentials for Basic Auth
    const basicAuth = btoa(`${correo}:${contrasenia}`);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Basic ${basicAuth}`
    });

    // console.log('📤 Payload enviado:', JSON.stringify(payload, null, 2));
    // console.log('📤 Headers enviados:', headers);

    try {
      const userData = await firstValueFrom(
        this.http.post<LoginResponse>(`${this.apiUrl}/login`, payload, { headers })
      );

      // console.log('📦 Respuesta del login:', userData);

      if (userData?.token) {
        localStorage.setItem('userToken', userData.token);
        console.log('🔐 Token guardado:', userData.token);
        this.login(userData);
      }

      return userData;
    } catch (error) {
      console.error('❌ Error en loginWithEmailAndPassword:', error);
      throw error;
    }
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
        console.log('✅ Datos originales desde /me:', userData);
  
        // Transformamos campos para que coincidan con el frontend
        const transformedUser = {
          ...userData,
          type: userData.tipoUsuario,
          municipality: userData.municipio
        };
  
        // Guardamos subjects
        sessionStorage.setItem('user', JSON.stringify(transformedUser));
        this.currentUserRoleSubject.next(transformedUser.type ?? null);
        this.currentUserMunicipalitySubject.next(transformedUser.municipality ?? null);
  
        return transformedUser;
      })
      .catch(error => {
        console.error('❌ Error al obtener usuario desde token:', error);
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
