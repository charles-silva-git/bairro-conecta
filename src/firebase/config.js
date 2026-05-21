const FIREBASE_ENV_FIELDS = {
  apiKey: 'EXPO_PUBLIC_FIREBASE_API_KEY',
  authDomain: 'EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN',
  projectId: 'EXPO_PUBLIC_FIREBASE_PROJECT_ID',
  storageBucket: 'EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET',
  messagingSenderId: 'EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID',
  appId: 'EXPO_PUBLIC_FIREBASE_APP_ID',
};

const FIREBASE_PLACEHOLDER_PATTERNS = [/^COLE_/i, /^YOUR_/i, /^<.*>$/];

const FIREBASE_CONFIG_MESSAGE =
  'Configure o Firebase para usar esta funcionalidade.';

function readEnvironmentValue(environmentKey) {
  return String(process.env[environmentKey] || '').trim();
}

function isPlaceholderValue(value) {
  return FIREBASE_PLACEHOLDER_PATTERNS.some((pattern) => pattern.test(value));
}

function isValidFirebaseValue(field, value) {
  if (!value || isPlaceholderValue(value)) {
    return false;
  }

  switch (field) {
    case 'apiKey':
      return value.length >= 20;
    case 'authDomain':
      return value.includes('.');
    case 'projectId':
      return /^[a-z0-9-]+$/i.test(value);
    case 'storageBucket':
      return value.includes('.');
    case 'messagingSenderId':
      return /^\d+$/.test(value);
    case 'appId':
      return value.includes(':');
    default:
      return true;
  }
}

export const firebaseConfig = Object.freeze(
  Object.keys(FIREBASE_ENV_FIELDS).reduce((config, field) => {
    config[field] = readEnvironmentValue(FIREBASE_ENV_FIELDS[field]);
    return config;
  }, {})
);

export const missingFirebaseConfigKeys = Object.entries(FIREBASE_ENV_FIELDS)
  .filter(([field]) => !firebaseConfig[field])
  .map(([, environmentKey]) => environmentKey);

export const invalidFirebaseConfigKeys = Object.entries(FIREBASE_ENV_FIELDS)
  .filter(
    ([field, environmentKey]) =>
      firebaseConfig[field] && !isValidFirebaseValue(field, firebaseConfig[field])
  )
  .map(([, environmentKey]) => environmentKey);

export const isFirebaseConfigured =
  missingFirebaseConfigKeys.length === 0 &&
  invalidFirebaseConfigKeys.length === 0;

export const firebaseConfigurationMessage = FIREBASE_CONFIG_MESSAGE;

export const firebaseConfigurationDetails = [
  missingFirebaseConfigKeys.length > 0
    ? `Ausentes: ${missingFirebaseConfigKeys.join(', ')}`
    : '',
  invalidFirebaseConfigKeys.length > 0
    ? `Invalidas: ${invalidFirebaseConfigKeys.join(', ')}`
    : '',
]
  .filter(Boolean)
  .join(' | ');

let hasLoggedFirebaseWarning = false;

export function createFirebaseConfigurationError() {
  const error = new Error(FIREBASE_CONFIG_MESSAGE);
  error.code = 'firebase/configuration-missing';
  error.details = firebaseConfigurationDetails;
  return error;
}

export function logFirebaseConfigurationStatus() {
  const isDevelopment =
    typeof __DEV__ !== 'undefined' ? __DEV__ : process.env.NODE_ENV !== 'production';

  if (!isDevelopment || hasLoggedFirebaseWarning || isFirebaseConfigured) {
    return;
  }

  hasLoggedFirebaseWarning = true;

  console.warn(
    `[firebase] Configuracao incompleta. Defina as variaveis em .env antes de usar o Firestore. ${firebaseConfigurationDetails}`
  );
}
