import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { colors } from '../constants/styles';

interface LabCardProps {
  name: string;
  status: 'livre' | 'ocupado';
  horaInicio?: string;
  horaFim?: string;
  onPress?: () => void;
}

export function LabCard({ name, status, horaInicio, horaFim, onPress }: LabCardProps) {
  const isLivre = status === 'livre';

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress} 
      activeOpacity={0.7}
      disabled={!onPress}
    >
      <View style={styles.header}>
        <Text style={styles.title}>{name}</Text>
        <View style={[styles.badge, { backgroundColor: isLivre ? colors.success : colors.danger }]}>
          <Text style={styles.badgeText}>{isLivre ? 'Livre' : 'Ocupado'}</Text>
        </View>
      </View>

      <View style={styles.content}>
        {horaInicio && horaFim ? (
          <Text style={styles.timeText}>
            Horário: <Text style={styles.timeHighlight}>{horaInicio} às {horaFim}</Text>
          </Text>
        ) : (
          <Text style={styles.timeText}>Sem horários reservados</Text>
        )}
      </View>
    </TouchableOpacity>
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
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: colors.text,
  },
  badge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  badgeText: {
    color: '#FFF',
    fontSize: 12,
    fontWeight: 'bold',
    textTransform: 'uppercase',
  },
  content: {
    marginTop: 4,
  },
  timeText: {
    color: colors.textLight,
    fontSize: 14,
  },
  timeHighlight: {
    fontWeight: 'bold',
    color: colors.text,
  },
});
