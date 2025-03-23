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
  private readonly apiUrl = 'http://auth-service:8080/api/users';

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

  loginWithEmailAndPassword(email: string, password: string): Promise<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password })
      .toPromise()
      .then((userData: any) => {
        if (userData) {
          this.login(userData);
        }
        return userData;
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
