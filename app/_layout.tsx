import { Stack, useRouter, useSegments } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { ReservasProvider } from '../context/ReservasContext';
import { AuthProvider, useAuth } from '../context/AuthContext';

const ROTAS_PROTEGIDAS = ['labs', 'home', 'minhas-reservas'];

function ProtecaoDeRotas() {
  const { user, loading } = useAuth();
  const segments = useSegments();
  const router = useRouter();

  useEffect(() => {
    if (loading) return;

    const rotaAtual = segments[0] as string;
    const estaEmRotaProtegida = ROTAS_PROTEGIDAS.includes(rotaAtual);

    if (!user && estaEmRotaProtegida) {
      router.replace('/');
    } else if (user && (rotaAtual === undefined || rotaAtual === 'index' || rotaAtual === 'register')) {
      router.replace('/labs');
    }
  }, [user, loading, segments]);

  return null;
}

function RootLayoutInner() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#E02041" />
      </View>
    );
  }

  return (
    <>
      <ProtecaoDeRotas />
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
