import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  firebaseConfigurationMessage,
  isFirebaseConfigured,
} from '../firebase';
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
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const isMountedRef = useRef(true);
  const latestRequestIdRef = useRef(0);

  useEffect(() => {
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  const refreshProfessionals = useCallback(async (options = {}) => {
    const { pullToRefresh = false } = options;
    const requestId = latestRequestIdRef.current + 1;

    latestRequestIdRef.current = requestId;

    if (!isFirebaseConfigured) {
      if (isMountedRef.current) {
        setProfessionals([]);
        setErrorMessage(firebaseConfigurationMessage);
        setIsLoading(false);
        setIsRefreshing(false);
      }

      return [];
    }

    try {
      if (isMountedRef.current) {
        if (pullToRefresh) {
          setIsRefreshing(true);
        } else {
          setIsLoading(true);
        }
      }

      const loadedProfessionals = await fetchProfessionals();

      if (isMountedRef.current && latestRequestIdRef.current === requestId) {
        setProfessionals(loadedProfessionals);
        setErrorMessage('');
      }

      return loadedProfessionals;
    } catch (error) {
      if (isMountedRef.current && latestRequestIdRef.current === requestId) {
        setErrorMessage(
          getFirestoreErrorMessage(
            error,
            'Nao foi possivel carregar os profissionais do Firestore.'
          )
        );
      }

      return [];
    } finally {
      if (isMountedRef.current && latestRequestIdRef.current === requestId) {
        setIsLoading(false);
        setIsRefreshing(false);
      }
    }
  }, []);

  useEffect(() => {
    refreshProfessionals();
  }, [refreshProfessionals]);

  const createProfessional = useCallback(async (formData) => {
    const newProfessional = await createProfessionalInFirestore(formData);

    if (isMountedRef.current) {
      setProfessionals((currentProfessionals) =>
        sortProfessionalsByName([newProfessional, ...currentProfessionals])
      );
      setErrorMessage('');
    }

    return newProfessional;
  }, []);

  const updateProfessional = useCallback(async (professionalId, formData) => {
    const updatedProfessional = await updateProfessionalInFirestore(
      professionalId,
      formData
    );

    if (isMountedRef.current) {
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
      setErrorMessage('');
    }

    return updatedProfessional;
  }, []);

  const deleteProfessional = useCallback(async (professionalId) => {
    await deleteProfessionalFromFirestore(professionalId);

    if (isMountedRef.current) {
      setProfessionals((currentProfessionals) =>
        currentProfessionals.filter(
          (professional) => professional.id !== professionalId
        )
      );
      setErrorMessage('');
    }
  }, []);

  const getProfessionalById = useCallback(
    (professionalId) =>
      professionals.find((professional) => professional.id === professionalId),
    [professionals]
  );

  const contextValue = useMemo(
    () => ({
      professionals,
      isLoading,
      isRefreshing,
      errorMessage,
      hasFirebaseConfiguration: isFirebaseConfigured,
      refreshProfessionals,
      createProfessional,
      updateProfessional,
      deleteProfessional,
      getProfessionalById,
    }),
    [
      createProfessional,
      deleteProfessional,
      errorMessage,
      getProfessionalById,
      isLoading,
      isRefreshing,
      professionals,
      refreshProfessionals,
      updateProfessional,
    ]
  );

  return (
    <ProfessionalsContext.Provider value={contextValue}>
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
