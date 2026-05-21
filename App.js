import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppErrorBoundary from './src/components/AppErrorBoundary';
import { ProfessionalsProvider } from './src/hooks/useProfessionals';
import AppRoutes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppErrorBoundary>
        <ProfessionalsProvider>
          <AppRoutes />
        </ProfessionalsProvider>
      </AppErrorBoundary>
    </SafeAreaProvider>
  );
}
