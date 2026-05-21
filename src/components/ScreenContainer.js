import { ScrollView, StyleSheet, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { theme } from '../styles/theme';

export default function ScreenContainer({
  children,
  scrollable = false,
  style,
}) {
  if (scrollable) {
    return (
      <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
        <ScrollView
          contentContainerStyle={[styles.scrollContent, style]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea} edges={['left', 'right']}>
      <View style={[styles.content, style]}>{children}</View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.background,
  },
  content: {
    flex: 1,
    padding: theme.spacing.lg,
  },
  scrollContent: {
    flexGrow: 1,
    padding: theme.spacing.lg,
  },
});
