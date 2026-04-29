import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import { loginUser } from '../services/auth';

export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});

  const validar = () => {
    const novosErros = {};

    if (!email.includes('@')) {
      novosErros.email = 'Email deve conter @';
    }

    if (senha.length < 6) {
      novosErros.senha = 'Senha deve ter no mínimo 6 caracteres';
    }

    setErros(novosErros);
    return Object.keys(novosErros).length === 0;
  };

  const handleLogin = async () => {
    if (!validar()) return;

    const resultado = await loginUser(email, senha);
    if (resultado.success) {
      props.onGoToHome();
    } else {
      Alert.alert('Erro', resultado.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>FIAP Labs</Text>
      <Text style={styles.subtitle}>Reserva de Laboratórios</Text>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        {erros.email && <Text style={styles.error}>{erros.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Senha"
          value={senha}
          onChangeText={setSenha}
          secureTextEntry
          style={styles.input}
        />
        {erros.senha && <Text style={styles.error}>{erros.senha}</Text>}
      </View>

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onGoToRegister} style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Não tem conta? Cadastre-se</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 30,
    textAlign: 'center',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 5,
  },
  error: {
    color: 'red',
    fontSize: 12,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    width: '100%',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  linkButton: {
    marginTop: 15,
    padding: 10,
  },
  linkButtonText: {
    color: '#007AFF',
    textAlign: 'center',
  },
});
