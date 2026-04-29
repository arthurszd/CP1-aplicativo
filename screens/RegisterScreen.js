import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, ScrollView, KeyboardAvoidingView, Platform, ActivityIndicator } from 'react-native';
import { useAuth } from '../context/AuthContext';

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function RegisterScreen(props) {
  const { register } = useAuth();
  const [loading, setLoading] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [confirmaSenha, setConfirmaSenha] = useState('');
  const [erros, setErros] = useState({});
  const [sucesso, setSucesso] = useState('');

  const validarCampo = (campo, valor) => {
    const novosErros = { ...erros };

    switch (campo) {
      case 'nome':
        if (!valor.trim()) novosErros.nome = 'O nome é obrigatório';
        else delete novosErros.nome;
        break;
      case 'email':
        if (!valor.trim()) novosErros.email = 'O e-mail é obrigatório';
        else if (!EMAIL_REGEX.test(valor)) novosErros.email = 'Formato de e-mail inválido';
        else delete novosErros.email;
        break;
      case 'senha':
        if (!valor) novosErros.senha = 'A senha é obrigatória';
        else if (valor.length < 6) novosErros.senha = 'A senha deve ter no mínimo 6 caracteres';
        else delete novosErros.senha;
        if (confirmaSenha && valor !== confirmaSenha) novosErros.confirmaSenha = 'As senhas não coincidem';
        else if (confirmaSenha) delete novosErros.confirmaSenha;
        break;
      case 'confirmaSenha':
        if (!valor) novosErros.confirmaSenha = 'A confirmação de senha é obrigatória';
        else if (valor !== senha) novosErros.confirmaSenha = 'As senhas não coincidem';
        else delete novosErros.confirmaSenha;
        break;
    }

    setErros(novosErros);
  };

  const formularioValido = () => {
    return (
      nome.trim() &&
      EMAIL_REGEX.test(email) &&
      senha.length >= 6 &&
      senha === confirmaSenha &&
      Object.keys(erros).length === 0
    );
  };

  const handleRegister = async () => {
    setLoading(true);
    const resultado = await register(nome, email, senha);
    setLoading(false);
    if (resultado.success) {
      setSucesso('Cadastro realizado com sucesso!');
      setTimeout(() => props.onGoToLogin(), 1500);
    } else {
      setErros({ geral: resultado.message });
    }
  };

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
    <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="handled">
      <Text style={styles.title}>Criar Conta</Text>
      <Text style={styles.subtitle}>Cadastre-se para reservar laboratórios</Text>

      {sucesso ? (
        <Text style={styles.sucesso}>{sucesso}</Text>
      ) : null}

      {erros.geral ? (
        <Text style={styles.erroGeral}>{erros.geral}</Text>
      ) : null}

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Nome completo</Text>
        <TextInput
          placeholder="Digite seu nome completo"
          value={nome}
          onChangeText={(v) => { setNome(v); validarCampo('nome', v); }}
          style={[styles.input, erros.nome && styles.inputError]}
        />
        {erros.nome && <Text style={styles.erro}>{erros.nome}</Text>}
      </View>

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
          placeholder="Mínimo 6 caracteres"
          value={senha}
          onChangeText={(v) => { setSenha(v); validarCampo('senha', v); }}
          style={[styles.input, erros.senha && styles.inputError]}
          secureTextEntry
        />
        {erros.senha && <Text style={styles.erro}>{erros.senha}</Text>}
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Confirmar senha</Text>
        <TextInput
          placeholder="Repita a senha"
          value={confirmaSenha}
          onChangeText={(v) => { setConfirmaSenha(v); validarCampo('confirmaSenha', v); }}
          style={[styles.input, erros.confirmaSenha && styles.inputError]}
          secureTextEntry
        />
        {erros.confirmaSenha && <Text style={styles.erro}>{erros.confirmaSenha}</Text>}
      </View>

      <TouchableOpacity
        onPress={handleRegister}
        style={[styles.button, (!formularioValido() || loading) && styles.buttonDisabled]}
        disabled={!formularioValido() || loading}
      >
        {loading
          ? <ActivityIndicator color="#fff" />
          : <Text style={styles.buttonText}>Cadastrar</Text>
        }
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onGoToLogin} style={styles.linkButton}>
        <Text style={styles.linkButtonText}>Já tem conta? Entrar</Text>
      </TouchableOpacity>
    </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  subtitle: {
    fontSize: 14,
    color: '#888',
    marginBottom: 28,
    textAlign: 'center',
  },
  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#444',
    marginBottom: 4,
  },
  inputContainer: {
    width: '100%',
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
    marginBottom: 12,
  },
  sucesso: {
    color: '#2e7d32',
    fontSize: 13,
    textAlign: 'center',
    marginBottom: 12,
    fontWeight: '600',
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
