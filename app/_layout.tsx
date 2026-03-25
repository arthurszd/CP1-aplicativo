import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ReservasProvider } from '../context/ReservasContext';

export default function RootLayout() {
  return (
    <ReservasProvider>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#E02041',
          },
          headerTintColor: '#FFF',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
          headerBackTitle: 'Voltar',
          contentStyle: {
            backgroundColor: '#F0F0F5',
          },
        }}
      >
        <Stack.Screen
          name="index"
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="labs/index"
          options={{ title: 'Laboratórios' }}
        />
        <Stack.Screen
          name="labs/reservar"
          options={{ title: 'Nova Reserva' }}
        />
        <Stack.Screen
          name="minhas-reservas"
          options={{ title: 'Minhas Reservas' }}
        />
      </Stack>
    </ReservasProvider>
  );
}
