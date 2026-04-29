import { useRouter } from 'expo-router';
import HomeScreen from '../screens/HomeScreen';

export default function HomePage() {
  const router = useRouter();
  return (
    <HomeScreen
      onGoToLabs={() => router.push('/labs')}
      onGoToReservas={() => router.push('/minhas-reservas')}
      onLogout={() => router.push('/')}
    />
  );
}
