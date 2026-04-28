import React, { useState } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList } from 'react-native';

export default function HomeScreen(props) {
  const [itens, setItens] = useState([]);
  const [novoItem, setNovoItem] = useState('');

  const adicionarItem = () => {
    if (novoItem.trim()) {
      setItens([...itens, { id: Date.now().toString(), nome: novoItem }]);
      setNovoItem('');
    }
  };

  const removerItem = (id) => {
    setItens(itens.filter(item => item.id !== id));
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Home Screen</Text>

      <View style={{ marginBottom: 20 }}>
        <TextInput
          placeholder="Digite um novo item"
          value={novoItem}
          onChangeText={setNovoItem}
          style={{ borderWidth: 1, padding: 10, marginBottom: 10 }}
        />
        <TouchableOpacity onPress={adicionarItem} style={{ backgroundColor: 'green', padding: 10 }}>
          <Text style={{ color: 'white' }}>Adicionar</Text>
        </TouchableOpacity>
      </View>

      <Text style={{ fontSize: 18, fontWeight: 'bold', marginBottom: 10 }}>Itens:</Text>
      <FlatList
        data={itens}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 10, borderBottomWidth: 1 }}>
            <Text>{item.nome}</Text>
            <TouchableOpacity onPress={() => removerItem(item.id)} style={{ backgroundColor: 'red', padding: 10 }}>
              <Text style={{ color: 'white' }}>Remover</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={{ textAlign: 'center', marginTop: 20 }}>Nenhum item adicionado</Text>}
      />

      <TouchableOpacity onPress={props.onLogout} style={{ marginTop: 20, backgroundColor: 'gray', padding: 10 }}>
        <Text style={{ color: 'white', textAlign: 'center' }}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
}
