import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, KeyboardAvoidingView, ScrollView, Platform, Alert } from 'react-native';
import { Button } from '../../components/Button';
import { globalStyles, colors } from '../../constants/styles';

export default function ReservarScreen() {
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [nome, setNome] = useState('');
  const [loading, setLoading] = useState(false);

  // Parâmetros simulados para UI-only - Membro 2 conectará com 'useLocalSearchParams()'
  const labName = "Lab Windows 1"; // mock

  const handleReservar = () => {
    if (!data || !horario || !nome) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      Alert.alert('Sucesso', 'Reserva solicitada com sucesso!');
      // router.back(); -> Membro 2
    }, 1500);
  };

  return (
    <KeyboardAvoidingView 
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={globalStyles.title}>Reservar Laboratório</Text>
          <Text style={styles.labTitle}>{labName}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={globalStyles.label}>Nome do Aluno</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite seu nome completo"
            value={nome}
            onChangeText={setNome}
          />

          <Text style={globalStyles.label}>Data da Reserva</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="DD/MM/AAAA"
            value={data}
            onChangeText={setData}
            keyboardType="numbers-and-punctuation"
          />

          <Text style={globalStyles.label}>Horário</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: 14:00 - 16:00"
            value={horario}
            onChangeText={setHorario}
          />

          <View style={styles.buttonSpacing}>
            <Button 
              title="Confirmar Reserva" 
              onPress={handleReservar} 
              isLoading={loading}
              type="primary"
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 20,
    marginBottom: 24,
  },
  labTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: -10,
  },
  formContainer: {
    paddingBottom: 40,
  },
  buttonSpacing: {
    marginTop: 24,
  }
});
