import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { useEffect, useLayoutEffect, useState } from 'react';
import AppInput from '../components/AppInput';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import { useProfessionals } from '../hooks/useProfessionals';
import { theme } from '../styles/theme';
import {
  createInitialProfessionalForm,
  formatPhoneValue,
  validateProfessionalForm,
} from '../utils/professionalModel';
import { getFirestoreErrorMessage } from '../utils/firestoreErrorMessages';

export default function ProfessionalFormScreen({ navigation, route }) {
  const professionalId = route.params?.professionalId;
  const {
    createProfessional,
    getProfessionalById,
    isLoading,
    updateProfessional,
  } = useProfessionals();

  const [form, setForm] = useState(createInitialProfessionalForm());
  const [errors, setErrors] = useState({});
  const [isSaving, setIsSaving] = useState(false);

  const isEditing = Boolean(professionalId);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: isEditing ? 'Editar profissional' : 'Cadastrar profissional',
    });
  }, [isEditing, navigation]);

  useEffect(() => {
    if (!professionalId) {
      setForm(createInitialProfessionalForm());
      return;
    }

    if (isLoading) {
      return;
    }

    const selectedProfessional = getProfessionalById(professionalId);

    if (!selectedProfessional) {
      Alert.alert(
        'Cadastro nao encontrado',
        'O profissional selecionado nao esta mais disponivel.'
      );
      navigation.goBack();
      return;
    }

    setForm({
      name: selectedProfessional.name,
      profession: selectedProfessional.profession,
      phone: selectedProfessional.phone,
      description: selectedProfessional.description,
      neighborhood: selectedProfessional.neighborhood,
    });
  }, [getProfessionalById, isLoading, navigation, professionalId]);

  function handleChange(field, value) {
    const nextValue = field === 'phone' ? formatPhoneValue(value) : value;

    setForm((currentForm) => ({
      ...currentForm,
      [field]: nextValue,
    }));

    if (errors[field]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [field]: '',
      }));
    }
  }

  async function handleSubmit() {
    const validationErrors = validateProfessionalForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsSaving(true);

      if (isEditing) {
        await updateProfessional(professionalId, form);
        Alert.alert('Sucesso', 'Cadastro atualizado com sucesso.');
      } else {
        await createProfessional(form);
        Alert.alert('Sucesso', 'Profissional cadastrado com sucesso.');
      }

      navigation.navigate('ProfessionalsList');
    } catch (error) {
      Alert.alert(
        'Erro ao salvar',
        getFirestoreErrorMessage(
          error,
          'Nao foi possivel salvar o cadastro no Firestore.'
        )
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <Text style={styles.title}>
          {isEditing ? 'Atualize os dados do profissional' : 'Novo cadastro'}
        </Text>
        <Text style={styles.description}>
          Preencha as informacoes principais para facilitar que moradores
          encontrem e entrem em contato com o profissional.
        </Text>
      </View>

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <View style={styles.form}>
          <AppInput
            label="Nome"
            placeholder="Digite o nome do profissional"
            value={form.name}
            onChangeText={(value) => handleChange('name', value)}
            error={errors.name}
          />

          <AppInput
            label="Profissao"
            placeholder="Ex.: Eletricista, diarista, manicure"
            value={form.profession}
            onChangeText={(value) => handleChange('profession', value)}
            error={errors.profession}
          />

          <AppInput
            label="Telefone"
            placeholder="(00) 00000-0000"
            value={form.phone}
            onChangeText={(value) => handleChange('phone', value)}
            keyboardType="phone-pad"
            error={errors.phone}
          />

          <AppInput
            label="Descricao"
            placeholder="Descreva os servicos oferecidos"
            value={form.description}
            onChangeText={(value) => handleChange('description', value)}
            multiline
            numberOfLines={4}
            error={errors.description}
          />

          <AppInput
            label="Bairro"
            placeholder="Informe o bairro de atendimento"
            value={form.neighborhood}
            onChangeText={(value) => handleChange('neighborhood', value)}
            error={errors.neighborhood}
          />
        </View>
      </KeyboardAvoidingView>

      <View style={styles.actions}>
        <PrimaryButton
          title={isSaving ? 'Salvando...' : isEditing ? 'Salvar alteracoes' : 'Cadastrar profissional'}
          onPress={handleSubmit}
          disabled={isSaving}
        />
        <PrimaryButton
          title="Voltar para a lista"
          variant="secondary"
          onPress={() => navigation.navigate('ProfessionalsList')}
          disabled={isSaving}
        />
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  header: {
    gap: theme.spacing.xs,
    marginBottom: theme.spacing.lg,
  },
  title: {
    color: theme.colors.text,
    fontSize: 28,
    fontWeight: '800',
  },
  description: {
    color: theme.colors.textMuted,
    fontSize: 15,
    lineHeight: 22,
  },
  form: {
    gap: theme.spacing.md,
  },
  actions: {
    gap: theme.spacing.md,
    marginTop: theme.spacing.lg,
  },
});
