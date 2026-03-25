import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, KeyboardAvoidingView, Platform, TextInput } from 'react-native';
// MOCK router para permitir compilação pelo Membro 1 onde Expo Router não está pronto - em um cenário real seria 'expo-router'
// Considerando que o Membro 2 vai gerenciar as rotas. Apenas estilização é foco aqui.
import { Button } from '../components/Button';
import { globalStyles, colors } from '../constants/styles';

export default function LoginScreen() {
  const [ra, setRa] = useState('');
  const [loading, setLoading] = useState(false);

  // Função mock conectando ao botão, Membro 2 fará o roteamento real.
  const handleLogin = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      // alert('Mock: Redirecionar para Labs > membro 2 fará com router.push("/labs")');
    }, 1000);
  };

  return (
    <KeyboardAvoidingView 
      style={globalStyles.container} 
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <View style={styles.logoContainer}>
        {/* Usando uma View com ícone mock, pois não temos assets definidos no PRD */}
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
          value={ra}
          onChangeText={setRa}
          keyboardType="default"
          autoCapitalize="characters"
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
