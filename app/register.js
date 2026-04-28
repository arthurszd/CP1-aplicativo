import { useRouter } from 'expo-router';
import RegisterScreen from '../screens/RegisterScreen';

export default function RegisterPage() {
  const router = useRouter();
  return (
    <RegisterScreen
      onGoToLogin={() => router.push('/')}
    />
  );
}
