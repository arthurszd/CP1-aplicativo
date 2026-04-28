import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
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

  const handleRegister = () => {
    if (validar()) {
      console.log('Nome:', nome);
      console.log('Email:', email);
      console.log('Senha:', senha);
    }
  };

  return (
    <View>
      <Text>Register Screen</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      {erros.email && <Text style={{ color: 'red' }}>{erros.email}</Text>}

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />
      {erros.senha && <Text style={{ color: 'red' }}>{erros.senha}</Text>}

      <TouchableOpacity onPress={handleRegister}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
