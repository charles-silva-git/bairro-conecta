import { getApp, getApps, initializeApp } from 'firebase/app';
import {
  firebaseConfig,
  isFirebaseConfigured,
  logFirebaseConfigurationStatus,
} from './config';

let firebaseApp = null;
let firebaseInitializationError = null;

if (isFirebaseConfigured) {
  try {
    firebaseApp = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  } catch (error) {
    firebaseInitializationError = error;

    const isDevelopment =
      typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production';

    if (isDevelopment) {
      console.error('[firebase] Falha ao inicializar o Firebase.', error);
    }
  }
} else {
  logFirebaseConfigurationStatus();
}

export const isFirebaseAvailable =
  Boolean(firebaseApp) && firebaseInitializationError === null;

export { firebaseApp, firebaseInitializationError };
