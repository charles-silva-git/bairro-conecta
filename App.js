import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AppRoutes from './src/routes';

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <AppRoutes />
    </SafeAreaProvider>
  );
}
