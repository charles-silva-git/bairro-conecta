import { useState } from 'react';
import { Alert, FlatList, StyleSheet, Text, TextInput, View } from 'react-native';
import EmptyState from '../components/EmptyState';
import PrimaryButton from '../components/PrimaryButton';
import ProfessionalCard from '../components/ProfessionalCard';
import ScreenContainer from '../components/ScreenContainer';
import { useProfessionals } from '../hooks/useProfessionals';
import { theme } from '../styles/theme';

export default function ProfessionalsListScreen({ navigation }) {
  const [search, setSearch] = useState('');
  const { deleteProfessional, professionals } = useProfessionals();

  const filteredProfessionals = professionals.filter((professional) =>
    professional.profession.toLowerCase().includes(search.trim().toLowerCase())
  );

  function handleDelete(professional) {
    Alert.alert(
      'Excluir profissional',
      `Deseja remover ${professional.name} da lista?`,
      [
        {
          text: 'Cancelar',
          style: 'cancel',
        },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: () => deleteProfessional(professional.id),
        },
      ]
    );
  }

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Lista de profissionais</Text>
        <Text style={styles.description}>
          Consulte trabalhadores do bairro e filtre por profissao para localizar
          o servico desejado.
        </Text>
      </View>

      <View style={styles.toolbar}>
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Buscar por profissao"
          placeholderTextColor={theme.colors.textMuted}
          style={styles.searchInput}
        />

        <PrimaryButton
          title="Novo cadastro"
          onPress={() => navigation.navigate('ProfessionalForm')}
        />
      </View>

      <FlatList
        data={filteredProfessionals}
        keyExtractor={(item) => item.id}
        style={styles.list}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <ProfessionalCard
            professional={item}
            onEdit={() =>
              navigation.navigate('ProfessionalForm', {
                professionalId: item.id,
              })
            }
            onDelete={() => handleDelete(item)}
          />
        )}
        ListEmptyComponent={
          <EmptyState
            title="Nenhum profissional encontrado"
            description="Tente outro termo na busca ou cadastre um novo profissional."
          />
        }
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    gap: theme.spacing.lg,
  },
  header: {
    gap: theme.spacing.xs,
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
  toolbar: {
    gap: theme.spacing.md,
  },
  searchInput: {
    backgroundColor: theme.colors.surface,
    borderColor: theme.colors.border,
    borderRadius: theme.radius.md,
    borderWidth: 1,
    color: theme.colors.text,
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: theme.spacing.md,
  },
  list: {
    flex: 1,
  },
  listContent: {
    flexGrow: 1,
    gap: theme.spacing.md,
    paddingBottom: theme.spacing.xl,
  },
});
