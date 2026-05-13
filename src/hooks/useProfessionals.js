import { createContext, useContext, useEffect, useState } from 'react';
import {
  createProfessionalInFirestore,
  deleteProfessionalFromFirestore,
  fetchProfessionals,
  updateProfessionalInFirestore,
} from '../services/professionalsService';
import { getFirestoreErrorMessage } from '../utils/firestoreErrorMessages';
import { sortProfessionalsByName } from '../utils/professionalModel';

const ProfessionalsContext = createContext(null);

export function ProfessionalsProvider({ children }) {
  const [professionals, setProfessionals] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    refreshProfessionals();
  }, []);

  async function refreshProfessionals() {
    try {
      setIsLoading(true);

      const loadedProfessionals = await fetchProfessionals();

      setProfessionals(loadedProfessionals);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage(
        getFirestoreErrorMessage(
          error,
          'Nao foi possivel carregar os profissionais do Firestore.'
        )
      );
    } finally {
      setIsLoading(false);
    }
  }

  async function createProfessional(formData) {
    const newProfessional = await createProfessionalInFirestore(formData);

    setProfessionals((currentProfessionals) =>
      sortProfessionalsByName([newProfessional, ...currentProfessionals])
    );

    return newProfessional;
  }

  async function updateProfessional(professionalId, formData) {
    const updatedProfessional = await updateProfessionalInFirestore(
      professionalId,
      formData
    );

    setProfessionals((currentProfessionals) =>
      sortProfessionalsByName(
        currentProfessionals.map((professional) => {
          if (professional.id !== professionalId) {
            return professional;
          }

          return updatedProfessional;
        })
      )
    );

    return updatedProfessional;
  }

  async function deleteProfessional(professionalId) {
    await deleteProfessionalFromFirestore(professionalId);

    setProfessionals((currentProfessionals) =>
      currentProfessionals.filter(
        (professional) => professional.id !== professionalId
      )
    );
  }

  function getProfessionalById(professionalId) {
    return professionals.find(
      (professional) => professional.id === professionalId
    );
  }

  return (
    <ProfessionalsContext.Provider
      value={{
        professionals,
        isLoading,
        errorMessage,
        refreshProfessionals,
        createProfessional,
        updateProfessional,
        deleteProfessional,
        getProfessionalById,
      }}
    >
      {children}
    </ProfessionalsContext.Provider>
  );
}

export function useProfessionals() {
  const context = useContext(ProfessionalsContext);

  if (!context) {
    throw new Error('useProfessionals must be used within ProfessionalsProvider');
  }

  return context;
}
