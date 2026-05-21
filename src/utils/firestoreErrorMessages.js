const FIRESTORE_ERROR_MESSAGES = {
  'firebase/configuration-missing':
    'Configure o Firebase para usar esta funcionalidade.',
  'firebase/initialization-failed':
    'Nao foi possivel inicializar o Firebase. Revise as variaveis do ambiente e reinicie o projeto.',
  'permission-denied':
    'Sem permissao no Firestore. Verifique as regras de seguranca do projeto.',
  unauthenticated:
    'Esta acao exige autenticacao. Revise as regras do Firestore ou o fluxo de login.',
  unavailable:
    'O Firestore esta indisponivel no momento. Tente novamente em instantes.',
  'not-found': 'O cadastro selecionado nao foi encontrado.',
};

export function getFirestoreErrorMessage(error, fallbackMessage) {
  const normalizedCode = error?.code?.replace('firestore/', '');

  return (
    FIRESTORE_ERROR_MESSAGES[normalizedCode] ||
    (typeof error?.message === 'string' && error.message.trim()) ||
    fallbackMessage
  );
}
