import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../context/AuthContext';

export default function HomeScreen(props) {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    await logout();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Olá, {user?.nome || 'Aluno'}!</Text>
      <Text style={styles.subtitle}>O que deseja fazer?</Text>

      <TouchableOpacity onPress={props.onGoToLabs} style={styles.card}>
        <Text style={styles.cardEmoji}>🔬</Text>
        <Text style={styles.cardTitle}>Laboratórios</Text>
        <Text style={styles.cardDesc}>Veja os labs disponíveis e faça uma reserva</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={props.onGoToReservas} style={[styles.card, styles.cardSecondary]}>
        <Text style={styles.cardEmoji}>📋</Text>
        <Text style={[styles.cardTitle, { color: '#E02041' }]}>Minhas Reservas</Text>
        <Text style={[styles.cardDesc, { color: '#555' }]}>Veja e gerencie suas reservas ativas</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLogout} style={styles.logoutButton}>
        <Text style={styles.logoutText}>Sair</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 15,
    color: '#888',
    textAlign: 'center',
    marginBottom: 32,
  },
  card: {
    backgroundColor: '#E02041',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    alignItems: 'center',
  },
  cardSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#E02041',
  },
  cardEmoji: {
    fontSize: 36,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  cardDesc: {
    fontSize: 13,
    color: '#fff',
    textAlign: 'center',
  },
  logoutButton: {
    marginTop: 24,
    padding: 12,
    alignItems: 'center',
  },
  logoutText: {
    color: '#888',
    fontSize: 15,
  },
});
