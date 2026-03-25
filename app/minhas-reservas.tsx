import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, Alert } from 'react-native';
import { ReservaItem } from '../components/ReservaItem';
import { globalStyles, colors } from '../constants/styles';

export default function MinhasReservasScreen() {
  // Lista Mock. Membro 2 conectará isso ao state/context
  const [reservas, setReservas] = useState([
    { id: '1', labName: 'Lab Windows 1', data: '25/03/2026', horario: '14:00 - 16:00' },
    { id: '2', labName: 'Maker Lab', data: '26/03/2026', horario: '08:00 - 12:00' },
  ]);
  const [cancelingId, setCancelingId] = useState<string | null>(null);

  const handleCancelar = (id: string) => {
    Alert.alert(
      'Cancelar Reserva',
      'Tem certeza que deseja cancelar esta reserva?',
      [
        { text: 'Não', style: 'cancel' },
        { 
          text: 'Sim', 
          style: 'destructive',
          onPress: () => {
            setCancelingId(id);
            setTimeout(() => {
              setReservas(prev => prev.filter(r => r.id !== id));
              setCancelingId(null);
            }, 1000);
          }
        }
      ]
    );
  };

  return (
    <View style={globalStyles.container}>
      <Text style={[globalStyles.title, styles.titleSpacing]}>Minhas Reservas</Text>

      {reservas.length === 0 ? (
        <View style={globalStyles.center}>
          <Text style={styles.emptyText}>Você não possui reservas ativas.</Text>
        </View>
      ) : (
        <FlatList
          data={reservas}
          keyExtractor={item => item.id}
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
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  titleSpacing: {
    marginTop: 20,
    marginBottom: 24,
  },
  listContainer: {
    paddingBottom: 24,
  },
  emptyText: {
    fontSize: 16,
    color: colors.textLight,
    textAlign: 'center',
    paddingHorizontal: 20,
  }
});
