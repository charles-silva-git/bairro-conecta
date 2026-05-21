import { getAuth } from 'firebase/auth';
import { firebaseApp, isFirebaseAvailable } from './app';

const auth = isFirebaseAvailable ? getAuth(firebaseApp) : null;

export { auth };
