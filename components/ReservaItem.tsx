import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from './Button';
import { colors } from '../constants/styles';

interface ReservaItemProps {
  labName: string;
  data: string;
  horario: string;
  onCancel: () => void;
  isCanceling?: boolean;
}

export function ReservaItem({ labName, data, horario, onCancel, isCanceling = false }: ReservaItemProps) {
  return (
    <View style={styles.card}>
      <View style={styles.infoContainer}>
        <Text style={styles.labName}>{labName}</Text>
        <Text style={styles.dateText}>{data} - {horario}</Text>
        <View style={styles.statusContainer}>
          <View style={styles.statusDot} />
          <Text style={styles.statusText}>Reserva Confirmada</Text>
        </View>
      </View>

      <View style={styles.actionsContainer}>
        <Button 
          title="Cancelar" 
          type="danger" 
          onPress={onCancel} 
          isLoading={isCanceling} 
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: colors.border,
  },
  infoContainer: {
    marginBottom: 16,
  },
  labName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
    marginBottom: 4,
  },
  dateText: {
    fontSize: 14,
    color: colors.textLight,
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.success,
    marginRight: 6,
  },
  statusText: {
    fontSize: 12,
    color: colors.success,
    fontWeight: 'bold',
  },
  actionsContainer: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: 12,
  },
});
