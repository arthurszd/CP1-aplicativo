import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useRouter } from 'expo-router';
import { LabCard } from '../../components/LabCard';
import { Button } from '../../components/Button';
import { globalStyles, colors } from '../../constants/styles';

interface Lab {
  id: string;
  name: string;
  status: 'livre' | 'ocupado';
  horaInicio: string;
  horaFim: string;
}

const LABS_MOCK: Lab[] = [
  { id: '1', name: 'Lab Windows 1', status: 'livre', horaInicio: '08:00', horaFim: '10:00' },
  { id: '2', name: 'Lab Windows 2', status: 'ocupado', horaInicio: '10:00', horaFim: '12:00' },
  { id: '3', name: 'Lab Mac 1', status: 'livre', horaInicio: '14:00', horaFim: '16:00' },
  { id: '4', name: 'Lab Mac 2', status: 'ocupado', horaInicio: '08:00', horaFim: '12:00' },
  { id: '5', name: 'Maker Lab', status: 'livre', horaInicio: '', horaFim: '' },
  { id: '6', name: 'Lab Robot 1', status: 'livre', horaInicio: '16:00', horaFim: '18:00' },
];

export default function LabsListScreen() {
  const router = useRouter();
  const [labs, setLabs] = useState<Lab[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simula chamada de API para buscar labs
    const timer = setTimeout(() => {
      setLabs(LABS_MOCK);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleReservarLab = (id: string, name: string) => {
    router.push({ pathname: '/labs/reservar', params: { id, name } });
  };

  const handleVerMinhasReservas = () => {
    router.push('/minhas-reservas');
  };

  if (loading) {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 16, color: colors.textLight }}>
          Buscando laboratórios...
        </Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.subtitle}>
        Selecione um laboratório para realizar sua reserva.
      </Text>

      <FlatList
        data={labs}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LabCard
            name={item.name}
            status={item.status}
            horaInicio={item.horaInicio}
            horaFim={item.horaFim}
            onPress={
              item.status === 'livre'
                ? () => handleReservarLab(item.id, item.name)
                : undefined
            }
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      <View style={styles.footer}>
        <Button
          title="Minhas Reservas"
          type="secondary"
          onPress={handleVerMinhasReservas}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
});
