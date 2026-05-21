import { collection, getFirestore } from 'firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '../constants/firestore';
import { firebaseApp, firebaseInitializationError, isFirebaseAvailable } from './app';
import { createFirebaseConfigurationError } from './config';

const db = isFirebaseAvailable ? getFirestore(firebaseApp) : null;

function createFirebaseInitializationError() {
  const error = new Error(
    'Nao foi possivel inicializar o Firebase. Revise o arquivo .env e reinicie o projeto.'
  );
  error.code = 'firebase/initialization-failed';
  error.cause = firebaseInitializationError;
  return error;
}

export function ensureFirestoreReady() {
  if (firebaseInitializationError) {
    throw createFirebaseInitializationError();
  }

  if (!isFirebaseAvailable || !db) {
    throw createFirebaseConfigurationError();
  }

  return db;
}

export function getCollectionRef(collectionName) {
  return collection(ensureFirestoreReady(), collectionName);
}

export function getProfessionalsCollectionRef() {
  return getCollectionRef(FIRESTORE_COLLECTIONS.PROFESSIONALS);
}

export { db };
