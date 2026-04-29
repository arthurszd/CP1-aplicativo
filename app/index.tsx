import { useRouter } from 'expo-router';
import LoginScreen from '../screens/LoginScreen';

export default function IndexPage() {
  const router = useRouter();
  return (
    <LoginScreen
      onGoToRegister={() => router.push('/register')}
      onGoToHome={() => router.push('/labs')}
    />
  );
}
