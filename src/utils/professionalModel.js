import { PROFESSIONAL_FIELD_LIMITS } from '../constants/firestore';

export function createInitialProfessionalForm() {
  return {
    name: '',
    profession: '',
    phone: '',
    description: '',
    neighborhood: '',
  };
}

function normalizeTextValue(value) {
  return value.trim().replace(/\s+/g, ' ');
}

export function formatPhoneValue(value) {
  const digits = value
    .replace(/\D/g, '')
    .slice(0, PROFESSIONAL_FIELD_LIMITS.phoneDigits);

  if (digits.length <= 2) {
    return digits;
  }

  if (digits.length <= 7) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
  }

  if (digits.length <= 10) {
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 6)}-${digits.slice(6)}`;
  }

  return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function validateProfessionalForm(formData) {
  const errors = {};
  const phoneDigits = formData.phone.replace(/\D/g, '');

  if (!normalizeTextValue(formData.name)) {
    errors.name = 'Informe o nome do profissional.';
  } else if (
    normalizeTextValue(formData.name).length > PROFESSIONAL_FIELD_LIMITS.name
  ) {
    errors.name = `O nome deve ter no maximo ${PROFESSIONAL_FIELD_LIMITS.name} caracteres.`;
  }

  if (!normalizeTextValue(formData.profession)) {
    errors.profession = 'Informe a profissao principal.';
  } else if (
    normalizeTextValue(formData.profession).length >
    PROFESSIONAL_FIELD_LIMITS.profession
  ) {
    errors.profession = `A profissao deve ter no maximo ${PROFESSIONAL_FIELD_LIMITS.profession} caracteres.`;
  }

  if (phoneDigits.length < 10) {
    errors.phone = 'Informe um telefone valido com DDD.';
  }

  if (!normalizeTextValue(formData.description)) {
    errors.description = 'Descreva os servicos oferecidos.';
  } else if (
    normalizeTextValue(formData.description).length >
    PROFESSIONAL_FIELD_LIMITS.description
  ) {
    errors.description = `A descricao deve ter no maximo ${PROFESSIONAL_FIELD_LIMITS.description} caracteres.`;
  }

  if (!normalizeTextValue(formData.neighborhood)) {
    errors.neighborhood = 'Informe o bairro de atendimento.';
  } else if (
    normalizeTextValue(formData.neighborhood).length >
    PROFESSIONAL_FIELD_LIMITS.neighborhood
  ) {
    errors.neighborhood = `O bairro deve ter no maximo ${PROFESSIONAL_FIELD_LIMITS.neighborhood} caracteres.`;
  }

  return errors;
}

export function buildProfessionalPayload(formData, professionalId) {
  return {
    id: professionalId || `${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    name: normalizeTextValue(formData.name),
    profession: normalizeTextValue(formData.profession),
    phone: formatPhoneValue(formData.phone),
    description: normalizeTextValue(formData.description),
    neighborhood: normalizeTextValue(formData.neighborhood),
  };
}

export function sortProfessionalsByName(professionals) {
  return [...professionals].sort((firstProfessional, secondProfessional) =>
    firstProfessional.name.localeCompare(secondProfessional.name, 'pt-BR')
  );
}
