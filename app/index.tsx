import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Alert,
} from 'react-native';
import { useRouter } from 'expo-router';
import { Button } from '../components/Button';
import { globalStyles, colors } from '../constants/styles';

export default function LoginScreen() {
  const router = useRouter();
  const [rm, setRm] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = () => {
    if (!rm.trim()) {
      Alert.alert('Atenção', 'Por favor, informe seu RM para continuar.');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push('/labs');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoContainer}>
        <View style={styles.logoCircle}>
          <Text style={styles.logoEmoji}>🔬</Text>
        </View>
        <Text style={styles.appName}>FIAP Labs</Text>
        <Text style={styles.appSubtitle}>Reserva de Laboratórios</Text>
      </View>

      <View style={styles.formContainer}>
        <Text style={globalStyles.label}>RM do Aluno</Text>
        <TextInput
          style={globalStyles.input}
          placeholder="Ex: RM90000"
          value={rm}
          onChangeText={setRm}
          keyboardType="default"
          autoCapitalize="characters"
          returnKeyType="done"
          onSubmitEditing={handleLogin}
        />

        <Button
          title="Entrar"
          onPress={handleLogin}
          isLoading={loading}
        />
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  logoContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  logoEmoji: {
    fontSize: 50,
  },
  appName: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  appSubtitle: {
    fontSize: 16,
    color: colors.textLight,
  },
  formContainer: {
    paddingBottom: 40,
  },
});
