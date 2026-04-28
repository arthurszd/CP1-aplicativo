import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function LoginScreen() {
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

  const handleLogin = () => {
    if (validar()) {
      console.log('Email:', email);
      console.log('Senha:', senha);
    }
  };

  return (
    <View>
      <Text>Login Screen</Text>

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

      <TouchableOpacity onPress={handleLogin}>
        <Text>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onGoToRegister}>
        <Text>Ir para Cadastro</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onGoToHome}>
        <Text>Ir para Home</Text>
      </TouchableOpacity>
    </View>
  );
}
