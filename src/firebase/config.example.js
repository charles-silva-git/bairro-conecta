export const firebaseConfig = {
  apiKey: 'COLE_SUA_API_KEY_AQUI',
  authDomain: 'COLE_SEU_AUTH_DOMAIN_AQUI',
  projectId: 'COLE_SEU_PROJECT_ID_AQUI',
  storageBucket: 'COLE_SEU_STORAGE_BUCKET_AQUI',
  messagingSenderId: 'COLE_SEU_MESSAGING_SENDER_ID_AQUI',
  appId: 'COLE_SEU_APP_ID_AQUI',
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => value && !value.startsWith('COLE_')
);
