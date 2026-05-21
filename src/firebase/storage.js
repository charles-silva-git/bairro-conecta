import { getStorage } from 'firebase/storage';
import { firebaseApp, isFirebaseAvailable } from './app';

const storage = isFirebaseAvailable ? getStorage(firebaseApp) : null;

export { storage };
