import React, { useState, useEffect, useMemo } from 'react';
import { View, Text, StyleSheet, FlatList, ActivityIndicator, TextInput } from 'react-native';
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
  const [busca, setBusca] = useState('');
  const [filtro, setFiltro] = useState<'todos' | 'livre' | 'ocupado'>('todos');

  useEffect(() => {
    const timer = setTimeout(() => {
      setLabs(LABS_MOCK);
      setLoading(false);
    }, 1500);
    return () => clearTimeout(timer);
  }, []);

  const labsFiltrados = useMemo(() => {
    return labs.filter(lab => {
      const buscaOk = lab.name.toLowerCase().includes(busca.toLowerCase());
      const filtroOk = filtro === 'todos' || lab.status === filtro;
      return buscaOk && filtroOk;
    });
  }, [labs, busca, filtro]);

  const handleReservarLab = (id: string, name: string) => {
    router.push({ pathname: '/labs/reservar', params: { id, name } });
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
      <TextInput
        placeholder="Buscar laboratório..."
        value={busca}
        onChangeText={setBusca}
        style={styles.search}
      />

      <View style={styles.filtros}>
        {(['todos', 'livre', 'ocupado'] as const).map(op => (
          <Text
            key={op}
            onPress={() => setFiltro(op)}
            style={[styles.filtroBtn, filtro === op && styles.filtroBtnAtivo]}
          >
            {op.charAt(0).toUpperCase() + op.slice(1)}
          </Text>
        ))}
      </View>

      <FlatList
        data={labsFiltrados}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <LabCard
            name={item.name}
            status={item.status}
            horaInicio={item.horaInicio}
            horaFim={item.horaFim}
            onPress={item.status === 'livre' ? () => handleReservarLab(item.id, item.name) : undefined}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyText}>Nenhum laboratório encontrado</Text>
          </View>
        }
      />

      <View style={styles.footer}>
        <Button title="Minhas Reservas" type="secondary" onPress={() => router.push('/minhas-reservas')} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  search: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
    fontSize: 15,
  },
  filtros: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 12,
  },
  filtroBtn: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    color: '#666',
    fontSize: 13,
  },
  filtroBtnAtivo: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
    color: '#fff',
  },
  listContainer: {
    paddingBottom: 24,
  },
  footer: {
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  empty: {
    alignItems: 'center',
    marginTop: 40,
  },
  emptyText: {
    color: '#999',
    fontSize: 15,
  },
});
