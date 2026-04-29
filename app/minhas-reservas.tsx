import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { ReservaItem } from '../components/ReservaItem';
import { globalStyles, colors } from '../constants/styles';
import { useReservas } from '../context/ReservasContext';

export default function MinhasReservasScreen() {
  const { reservas, cancelarReserva } = useReservas();
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const handleCancelar = (id: string) => {
    Alert.alert(
      'Cancelar Reserva',
      'Tem certeza que deseja cancelar esta reserva?',
      [
        { text: 'Não', style: 'cancel' },
        {
          text: 'Sim, cancelar',
          style: 'destructive',
          onPress: async () => {
            setCancelingId(id);
            await cancelarReserva(id);
            setCancelingId(null);
          },
        },
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      {reservas.length === 0 ? (
        <View style={globalStyles.center}>
          <Text style={styles.emptyEmoji}>📋</Text>
          <Text style={styles.emptyTitle}>Nenhuma reserva encontrada</Text>
          <Text style={styles.emptyText}>
            Suas reservas aparecerão aqui após você reservar um laboratório.
          </Text>
        </View>
      ) : (
        <>
          <Text style={styles.countText}>
            {reservas.length} {reservas.length === 1 ? 'reserva ativa' : 'reservas ativas'}
          </Text>
          <FlatList
            data={reservas}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <ReservaItem
                labName={item.labName}
                data={item.data}
                horario={item.horario}
                onCancel={() => handleCancelar(item.id)}
                isCanceling={cancelingId === item.id}
              />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingBottom: 24,
  },
  countText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 16,
    marginTop: 4,
  },
  emptyEmoji: {
    fontSize: 56,
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 15,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 20,
    lineHeight: 22,
  },
});
