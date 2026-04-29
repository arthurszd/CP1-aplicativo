import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
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
  const [erros, setErros] = useState<Record<string, string>>({});
  const [reservado, setReservado] = useState(false);

  const formatarData = (valor: string) => {
    const nums = valor.replace(/\D/g, '').slice(0, 8);
    if (nums.length <= 2) return nums;
    if (nums.length <= 4) return `${nums.slice(0, 2)}/${nums.slice(2)}`;
    return `${nums.slice(0, 2)}/${nums.slice(2, 4)}/${nums.slice(4)}`;
  };

  const formatarHorario = (valor: string) => {
    const nums = valor.replace(/\D/g, '').slice(0, 4);
    if (nums.length <= 2) return nums;
    return `${nums.slice(0, 2)}:${nums.slice(2)}`;
  };

  const validar = () => {
    const novos: Record<string, string> = {};
    if (!nomeAluno.trim()) novos.nomeAluno = 'O nome é obrigatório';
    if (!data.trim()) novos.data = 'A data é obrigatória';
    else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(data)) novos.data = 'Formato inválido: DD/MM/AAAA';
    if (!horario.trim()) novos.horario = 'O horário é obrigatório';
    else if (!/^\d{2}:\d{2}$/.test(horario)) novos.horario = 'Formato inválido: HH:MM';
    setErros(novos);
    return Object.keys(novos).length === 0;
  };

  const handleReservar = async () => {
    if (!validar()) return;

    setLoading(true);
    await adicionarReserva({
      labId: id ?? '',
      labName: name ?? 'Lab',
      nomeAluno: nomeAluno.trim(),
      data: data.trim(),
      horario: horario.trim(),
    });
    setLoading(false);
    setReservado(true);

    setTimeout(() => router.back(), 2500);
  };

  if (reservado) {
    return (
      <View style={styles.successContainer}>
        <Text style={styles.successEmoji}>✅</Text>
        <Text style={styles.successTitle}>Reserva confirmada!</Text>
        <Text style={styles.successDesc}>
          <Text style={{ fontWeight: 'bold' }}>{name}</Text>
          {'\n'}reservado para {data} às {horario}
        </Text>
        <Text style={styles.successHint}>Redirecionando...</Text>
      </View>
    );
  }

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
            style={[globalStyles.input, erros.nomeAluno && styles.inputError]}
            placeholder="Digite seu nome completo"
            value={nomeAluno}
            onChangeText={setNomeAluno}
            returnKeyType="next"
          />
          {erros.nomeAluno && <Text style={styles.erro}>{erros.nomeAluno}</Text>}

          <Text style={globalStyles.label}>Data da Reserva</Text>
          <TextInput
            style={[globalStyles.input, erros.data && styles.inputError]}
            placeholder="DD/MM/AAAA"
            value={data}
            onChangeText={(v) => setData(formatarData(v))}
            keyboardType="numeric"
            maxLength={10}
            returnKeyType="next"
          />
          {erros.data && <Text style={styles.erro}>{erros.data}</Text>}

          <Text style={globalStyles.label}>Horário</Text>
          <TextInput
            style={[globalStyles.input, erros.horario && styles.inputError]}
            placeholder="HH:MM"
            value={horario}
            onChangeText={(v) => setHorario(formatarHorario(v))}
            keyboardType="numeric"
            maxLength={5}
            returnKeyType="done"
            onSubmitEditing={handleReservar}
          />
          {erros.horario && <Text style={styles.erro}>{erros.horario}</Text>}

          <View style={styles.buttonSpacing}>
            <Button title="Confirmar Reserva" onPress={handleReservar} isLoading={loading} type="primary" />
            <Button title="Cancelar" onPress={() => router.back()} type="secondary" disabled={loading} />
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
  inputError: {
    borderColor: colors.primary,
  },
  erro: {
    color: colors.primary,
    fontSize: 12,
    marginBottom: 8,
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    backgroundColor: '#fff',
  },
  successEmoji: {
    fontSize: 64,
    marginBottom: 16,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2e7d32',
    marginBottom: 12,
  },
  successDesc: {
    fontSize: 16,
    textAlign: 'center',
    color: '#444',
    lineHeight: 24,
    marginBottom: 24,
  },
  successHint: {
    fontSize: 13,
    color: '#999',
  },
});
