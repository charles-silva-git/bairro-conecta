import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ProfessionalsProvider } from './src/hooks/useProfessionals';
import AppRoutes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <ProfessionalsProvider>
        <AppRoutes />
      </ProfessionalsProvider>
    </SafeAreaProvider>
  );
}
