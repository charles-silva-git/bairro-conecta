import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import ProfessionalFormScreen from '../screens/ProfessionalFormScreen';
import ProfessionalsListScreen from '../screens/ProfessionalsListScreen';
import { theme } from '../styles/theme';

const Stack = createNativeStackNavigator();

const navigationTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: theme.colors.background,
    border: theme.colors.border,
    card: theme.colors.surface,
    primary: theme.colors.primary,
    text: theme.colors.text,
  },
};

export default function AppRoutes() {
  return (
    <NavigationContainer theme={navigationTheme}>
      <Stack.Navigator
        screenOptions={{
          headerShadowVisible: false,
          headerStyle: {
            backgroundColor: theme.colors.surface,
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            fontSize: 18,
            fontWeight: '700',
          },
          contentStyle: {
            backgroundColor: theme.colors.background,
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'BairroConecta' }}
        />
        <Stack.Screen
          name="ProfessionalsList"
          component={ProfessionalsListScreen}
          options={{ title: 'Profissionais' }}
        />
        <Stack.Screen
          name="ProfessionalForm"
          component={ProfessionalFormScreen}
          options={{ title: 'Cadastrar profissional' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
