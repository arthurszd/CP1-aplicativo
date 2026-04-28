import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native';
import { getItems, addItem, removeItem } from '../services/items';

export default function HomeScreen(props) {
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState('');

  useEffect(() => {
    carregarItens();
  }, []);

  const carregarItens = async () => {
    const lista = await getItems();
    setItens(lista);
  };

  const adicionarItem = async () => {
    if (novoItem.trim()) {
      const resultado = await addItem({ nome: novoItem });
      if (resultado.success) {
        setItens(resultado.items);
        setNovoItem('');
      }
    }
  };

  const removerItem = async (id) => {
    const resultado = await removeItem(id);
    if (resultado.success) {
      setItens(resultado.items);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Home Screen</Text>

      <View style={styles.inputSection}>
        <TextInput
          placeholder="Digite um novo item"
          value={novoItem}
          onChangeText={setNovoItem}
          style={styles.input}
        />
        <TouchableOpacity onPress={adicionarItem} style={styles.addButton}>
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.subtitle}>Itens:</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.itemText}>{item.nome}</Text>
            <TouchableOpacity onPress={() => removerItem(item.id)} style={styles.removeButton}>
              <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>Nenhum item adicionado</Text>}
      />

      <TouchableOpacity onPress={props.onLogout} style={styles.logoutButton}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  inputSection: {
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: 'white',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
  },
  removeButton: {
    backgroundColor: '#f44336',
    padding: 8,
    borderRadius: 5,
  },
  logoutButton: {
    backgroundColor: '#808080',
    padding: 12,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    backgroundColor: 'white',
    marginBottom: 5,
    borderRadius: 5,
  },
  itemText: {
    fontSize: 16,
    flex: 1,
  },
  emptyText: {
    textAlign: 'center',
    marginTop: 20,
    color: '#999',
    fontSize: 14,
  },
});
