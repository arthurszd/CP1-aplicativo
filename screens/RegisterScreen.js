import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text } from 'react-native';

export default function RegisterScreen() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  const handleRegister = () => {
    console.log('Nome:', nome);
    console.log('Email:', email);
    console.log('Senha:', senha);
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

      <TextInput
        placeholder="Senha"
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity onPress={handleRegister}>
        <Text>Cadastrar</Text>
      </TouchableOpacity>
    </View>
  );
}
