import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getStorage, provideStorage } from "@angular/fire/storage";

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideAnimationsAsync(),
    provideFirebaseApp(() => initializeApp({
      "projectId": "sgpm-puj",
      "appId": "1:1030860372472:web:8e2f02a5ad6b4ee59e7e0d",
      "storageBucket": "sgpm-puj.appspot.com",
      "apiKey": "AIzaSyD0XCGxmdB_6W3bNp_JvQCabUqxzi__xNc",
      "authDomain": "sgpm-puj.firebaseapp.com",
      "messagingSenderId": "1030860372472"
    })),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())      
  ]
};
