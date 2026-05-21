import { useState } from 'react';
import { Alert, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import AppInput from '../components/AppInput';
import PrimaryButton from '../components/PrimaryButton';
import ScreenContainer from '../components/ScreenContainer';
import { theme } from '../styles/theme';
import {
  createInitialProfessionalForm,
  formatPhoneValue,
  validateProfessionalForm,
} from '../utils/professionalModel';

export default function ProfessionalFormScreen({ navigation }) {
  const [form, setForm] = useState(createInitialProfessionalForm());
  const [errors, setErrors] = useState({});

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

  function handleSubmit() {
    const validationErrors = validateProfessionalForm(form);

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    Alert.alert(
      'Cadastro validado',
      'O formulario esta pronto para ser conectado a persistencia do app.'
    );
  }

  return (
    <ScreenContainer scrollable>
      <View style={styles.header}>
        <Text style={styles.title}>Cadastro de profissional</Text>
        <Text style={styles.description}>
          Preencha as informacoes principais do profissional para facilitar a
          busca dos moradores.
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
        <PrimaryButton title="Validar cadastro" onPress={handleSubmit} />
        <PrimaryButton
          title="Voltar para a lista"
          variant="secondary"
          onPress={() => navigation.navigate('ProfessionalsList')}
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
