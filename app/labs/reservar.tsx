import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  Alert,
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Button } from '../../components/Button';
import { globalStyles, colors } from '../../constants/styles';
import { useReservas } from '../../context/ReservasContext';

export default function ReservarScreen() {
  const router = useRouter();
  const { id, name } = useLocalSearchParams<{ id: string; name: string }>();
  const { adicionarReserva } = useReservas();

  const [nomeAluno, setNomeAluno] = useState('');
  const [data, setData] = useState('');
  const [horario, setHorario] = useState('');
  const [loading, setLoading] = useState(false);

  const handleReservar = () => {
    if (!nomeAluno.trim() || !data.trim() || !horario.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos para continuar.');
      return;
    }

    // Validação simples de formato de data DD/MM/AAAA
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!dateRegex.test(data)) {
      Alert.alert('Data inválida', 'Informe a data no formato DD/MM/AAAA.');
      return;
    }

    setLoading(true);
    setTimeout(() => {
      adicionarReserva({
        labId: id ?? '',
        labName: name ?? 'Lab',
        nomeAluno: nomeAluno.trim(),
        data: data.trim(),
        horario: horario.trim(),
      });
      setLoading(false);
      Alert.alert(
        'Reserva confirmada! ✅',
        `Seu laboratório "${name}" foi reservado para ${data} às ${horario}.`,
        [{ text: 'Ok', onPress: () => router.back() }]
      );
    }, 1500);
  };

  return (
    <KeyboardAvoidingView
      style={globalStyles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.header}>
          <Text style={styles.labTitle}>{name}</Text>
        </View>

        <View style={styles.formContainer}>
          <Text style={globalStyles.label}>Nome do Aluno</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Digite seu nome completo"
            value={nomeAluno}
            onChangeText={setNomeAluno}
            returnKeyType="next"
          />

          <Text style={globalStyles.label}>Data da Reserva</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="DD/MM/AAAA"
            value={data}
            onChangeText={setData}
            keyboardType="numbers-and-punctuation"
            maxLength={10}
            returnKeyType="next"
          />

          <Text style={globalStyles.label}>Horário</Text>
          <TextInput
            style={globalStyles.input}
            placeholder="Ex: 14:00 - 16:00"
            value={horario}
            onChangeText={setHorario}
            returnKeyType="done"
            onSubmitEditing={handleReservar}
          />

          <View style={styles.buttonSpacing}>
            <Button
              title="Confirmar Reserva"
              onPress={handleReservar}
              isLoading={loading}
              type="primary"
            />
            <Button
              title="Cancelar"
              onPress={() => router.back()}
              type="secondary"
              disabled={loading}
            />
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  header: {
    marginTop: 8,
    marginBottom: 24,
  },
  labTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
  },
  formContainer: {
    paddingBottom: 40,
  },
  buttonSpacing: {
    marginTop: 24,
    gap: 8,
  },
});
