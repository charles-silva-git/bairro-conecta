export const firebaseConfig = {
  apiKey: 'AIzaSyAIspSn2-odZqF5bJQ9sXMj6MJn3-nJAZ8',
  authDomain: 'bairro-conecta-9ee36.firebaseapp.com',
  projectId: 'bairro-conecta-9ee36',
  storageBucket: 'bairro-conecta-9ee36.firebasestorage.app',
  messagingSenderId: '1052882613805',
  appId: '1:1052882613805:web:1f4f693e7012ebabe4eaa4',
};

export const isFirebaseConfigured = Object.values(firebaseConfig).every(
  (value) => Boolean(value)
);
