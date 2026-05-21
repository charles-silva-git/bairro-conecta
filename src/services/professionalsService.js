import {
  addDoc,
  deleteDoc,
  doc,
  getDocs,
  serverTimestamp,
  updateDoc,
} from 'firebase/firestore';

import { getProfessionalsCollectionRef } from '../firebase';

import {
  buildProfessionalPayload,
  sortProfessionalsByName,
} from '../utils/professionalModel';

function getProfessionalsCollection() {
  return getProfessionalsCollectionRef();
}

/**
 * Converte documento do Firestore para objeto da aplicação
 */
function mapProfessionalDocument(documentSnapshot) {
  const data = documentSnapshot.data();

  return {
    id: documentSnapshot.id,
    name: data.name || '',
    profession: data.profession || '',
    phone: data.phone || '',
    description: data.description || '',
    neighborhood: data.neighborhood || '',
  };
}

/**
 * Busca todos os profissionais
 */
export async function fetchProfessionals() {
  const snapshot = await getDocs(getProfessionalsCollection());

  const professionals = snapshot.docs.map(mapProfessionalDocument);

  return sortProfessionalsByName(professionals);
}

/**
 * Cria novo profissional
 */
export async function createProfessionalInFirestore(formData) {
  const { id, ...professionalData } = buildProfessionalPayload(formData);

  const documentReference = await addDoc(getProfessionalsCollection(), {
    ...professionalData,
    createdAt: serverTimestamp(),
    updatedAt: serverTimestamp(),
  });

  return {
    ...professionalData,
    id: documentReference.id,
  };
}

/**
 * Atualiza profissional existente
 */
export async function updateProfessionalInFirestore(
  professionalId,
  formData
) {
  const professionalsCollection = getProfessionalsCollection();
  const { id, ...professionalData } = buildProfessionalPayload(
    formData,
    professionalId
  );

  const professionalRef = doc(professionalsCollection, professionalId);

  await updateDoc(professionalRef, {
    name: professionalData.name,
    profession: professionalData.profession,
    phone: professionalData.phone,
    description: professionalData.description,
    neighborhood: professionalData.neighborhood,
    updatedAt: serverTimestamp(),
  });

  return {
    ...professionalData,
    id: professionalId,
  };
}

/**
 * Remove profissional
 */
export async function deleteProfessionalFromFirestore(professionalId) {
  const professionalsCollection = getProfessionalsCollection();
  const professionalRef = doc(professionalsCollection, professionalId);

  await deleteDoc(professionalRef);
}
