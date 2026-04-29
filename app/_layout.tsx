import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect, useRef } from 'react';
import { ReservasProvider } from '../context/ReservasContext';
import { AuthProvider, useAuth } from '../context/AuthContext';

const ROTAS_PROTEGIDAS = ['labs', 'home', 'minhas-reservas'];

function RootLayoutInner() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();
  const mounted = useRef(false);

  useEffect(() => {
    mounted.current = true;
  }, []);

  useEffect(() => {
    if (!mounted.current || loading) return;

    const rotaAtual = segments[0] as string;
    const estaEmRotaProtegida = ROTAS_PROTEGIDAS.includes(rotaAtual);

    if (!user && estaEmRotaProtegida) {
      router.replace('/');
    } else if (user && (!rotaAtual || rotaAtual === 'register')) {
      router.replace('/labs');
    }
  }, [user, loading, segments]);

  return (
    <>
      <StatusBar style="dark" />
      <Stack
        screenOptions={{
          headerStyle: { backgroundColor: '#E02041' },
          headerTintColor: '#FFF',
          headerTitleStyle: { fontWeight: 'bold' },
          headerBackTitle: 'Voltar',
          contentStyle: { backgroundColor: '#F0F0F5' },
        }}
      >
        <Stack.Screen name="index" options={{ headerShown: false }} />
        <Stack.Screen name="register" options={{ headerShown: false }} />
        <Stack.Screen name="home" options={{ headerShown: false }} />
        <Stack.Screen name="labs/index" options={{ title: 'Laboratórios' }} />
        <Stack.Screen name="labs/reservar" options={{ title: 'Nova Reserva' }} />
        <Stack.Screen name="minhas-reservas" options={{ title: 'Minhas Reservas' }} />
      </Stack>
    </>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <ReservasProvider>
        <RootLayoutInner />
      </ReservasProvider>
    </AuthProvider>
  );
}
