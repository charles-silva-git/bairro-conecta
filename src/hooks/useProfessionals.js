import { createContext, useContext, useState } from 'react';
import {
  buildProfessionalPayload,
  initialProfessionals,
  sortProfessionalsByName,
} from '../utils/professionalModel';

const ProfessionalsContext = createContext(null);

export function ProfessionalsProvider({ children }) {
  const [professionals, setProfessionals] = useState(initialProfessionals);

  function createProfessional(formData) {
    const newProfessional = buildProfessionalPayload(formData);

    setProfessionals((currentProfessionals) =>
      sortProfessionalsByName([newProfessional, ...currentProfessionals])
    );
  }

  function updateProfessional(professionalId, formData) {
    const updatedProfessional = buildProfessionalPayload(formData, professionalId);

    setProfessionals((currentProfessionals) =>
      sortProfessionalsByName(
        currentProfessionals.map((professional) =>
          professional.id === professionalId ? updatedProfessional : professional
        )
      )
    );
  }

  function deleteProfessional(professionalId) {
    setProfessionals((currentProfessionals) =>
      currentProfessionals.filter(
        (professional) => professional.id !== professionalId
      )
    );
  }

  function getProfessionalById(professionalId) {
    return professionals.find((professional) => professional.id === professionalId);
  }

  return (
    <ProfessionalsContext.Provider
      value={{
        professionals,
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
