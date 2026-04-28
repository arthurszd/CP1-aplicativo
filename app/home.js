import { useRouter } from 'expo-router';
import HomeScreen from '../screens/HomeScreen';

export default function HomePage() {
  const router = useRouter();
  return (
    <HomeScreen
      onLogout={() => router.push('/')}
    />
  );
}
