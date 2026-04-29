import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { loginUser } from '../services/auth';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function LoginScreen(props) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erros, setErros] = useState({});
  const [erroGeral, setErroGeral] = useState('');

  const validarCampo = (campo, valor) => {
    const novosErros = { ...erros };

    switch (campo) {
      case 'email':
        if (!valor.trim()) novosErros.email = 'O e-mail é obrigatório';
        else if (!EMAIL_REGEX.test(valor)) novosErros.email = 'Formato de e-mail inválido';
        else delete novosErros.email;
        break;
      case 'senha':
        if (!valor) novosErros.senha = 'A senha é obrigatória';
        else if (valor.length < 6) novosErros.senha = 'A senha deve ter no mínimo 6 caracteres';
        else delete novosErros.senha;
        break;
    }

    setErros(novosErros);
  };

  const formularioValido = () =>
    EMAIL_REGEX.test(email) && senha.length >= 6 && Object.keys(erros).length === 0;

  const handleLogin = async () => {
    setErroGeral('');
    const resultado = await loginUser(email, senha);
    if (resultado.success) {
      props.onGoToHome();
    } else {
      setErroGeral(resultado.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.logoArea}>
        <Text style={styles.logo}>🔬</Text>
        <Text style={styles.title}>FIAP Labs</Text>
        <Text style={styles.subtitle}>Reserva de Laboratórios</Text>
      </View>

      {erroGeral ? <Text style={styles.erroGeral}>{erroGeral}</Text> : null}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>E-mail</Text>
        <TextInput
          placeholder="usuario@dominio.com"
          value={email}
          onChangeText={(v) => { setEmail(v); validarCampo('email', v); }}
          style={[styles.input, erros.email && styles.inputError]}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {erros.email && <Text style={styles.erro}>{erros.email}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Senha</Text>
        <TextInput
          placeholder="Digite sua senha"
          value={senha}
          onChangeText={(v) => { setSenha(v); validarCampo('senha', v); }}
          style={[styles.input, erros.senha && styles.inputError]}
          secureTextEntry
        />
        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}
      </View>

      <TouchableOpacity
        onPress={handleLogin}
        style={[styles.button, !formularioValido() && styles.buttonDisabled]}
        disabled={!formularioValido()}
      >
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
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  logoArea: {
    alignItems: 'center',
    marginBottom: 36,
  },
  logo: {
    fontSize: 52,
    marginBottom: 8,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1a1a1a',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  inputContainer: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 12,
    borderRadius: 8,
    fontSize: 15,
    backgroundColor: '#fafafa',
  },
  inputError: {
    borderColor: '#E02041',
  },
  erro: {
    color: '#E02041',
    fontSize: 12,
    marginTop: 4,
  },
  erroGeral: {
    color: '#E02041',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#E02041',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 16,
  },
  linkButton: {
    marginTop: 16,
    padding: 10,
    alignItems: 'center',
  },
  linkButtonText: {
    color: '#E02041',
    fontSize: 14,
  },
});
