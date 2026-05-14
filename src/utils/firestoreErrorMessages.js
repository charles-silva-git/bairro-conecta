const FIRESTORE_ERROR_MESSAGES = {
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
    error?.message ||
    fallbackMessage
  );
}
