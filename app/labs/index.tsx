import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { LabCard } from '../../components/LabCard';
import { Button } from '../../components/Button';
import { globalStyles, colors } from '../../constants/styles';

// Dados mock para o design da tela, conforme descrito na divisão de tarefas. Membro 2 irá implementar os mocks no estado,
// Mas para testar o design precisamos de algum dado.
const MOCK_LABS = [
  { id: '1', name: 'Lab Windows 1', status: 'livre', horaInicio: '08:00', horaFim: '10:00' },
  { id: '2', name: 'Lab Mac 1', status: 'ocupado', horaInicio: '10:00', horaFim: '12:00' },
  { id: '3', name: 'Maker Lab', status: 'livre', horaInicio: '', horaFim: '' },
] as const;

export default function LabsListScreen() {
  const [loading, setLoading] = useState(true);

  // Simulando carregamento com useEffect, Membro 2 conectará isso ao state/router
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const handleVerMinhasReservas = () => {
    // router.push('/minhas-reservas');
  };

  const handleReservarLab = (id: string, name: string) => {
    // router.push({ pathname: '/labs/reservar', params: { id, name } });
  };

  if (loading) {
    return (
      <View style={globalStyles.center}>
        <ActivityIndicator size="large" color={colors.primary} />
        <Text style={{ marginTop: 16, color: colors.textLight }}>Buscando laboratórios...</Text>
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.headerRow}>
        <Text style={globalStyles.title}>Labs Disponíveis</Text>
      </View>
      
      <Text style={globalStyles.subtitle}>Selecione um laboratório para realizar sua reserva.</Text>

      <FlatList
        data={MOCK_LABS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LabCard 
            name={item.name}
            status={item.status as any}
            horaInicio={item.horaInicio}
            horaFim={item.horaFim}
            onPress={() => handleReservarLab(item.id, item.name)}
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
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  listContainer: {
    paddingBottom: 24,
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  }
});
