import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { ReservasProvider } from '../context/ReservasContext';
import { AuthProvider } from '../context/AuthContext';
import { getSession } from '../services/auth';
import { getItems } from '../services/items';

export default function RootLayout() {
  // Feature 7: Carregar dados iniciais
  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const session = await getSession();
        const itemsList = await getItems();
        console.log('Dados carregados na inicialização:', { session, itemsList });
      } catch (error) {
        console.error('Erro ao carregar dados na inicialização', error);
      }
    };
    
    loadStoredData();
  }, []);

  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}
