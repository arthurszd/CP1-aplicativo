import { saveData, getData } from './storage';

const ITEMS_KEY = '@items_list';

export const getItems = async () => {
  try {
    const items = await getData(ITEMS_KEY);
    return items || [];
  } catch (error) {
    console.error('Erro ao buscar itens', error);
    return [];
  }
};

export const addItem = async (item) => {
  try {
    const items = await getItems();
    // Gera um ID único baseado no timestamp atual caso o item não possua
    const newItem = item.id ? item : { ...item, id: Date.now().toString() };
    const updatedItems = [...items, newItem];
    await saveData(ITEMS_KEY, updatedItems);
    return { success: true, items: updatedItems, addedItem: newItem };
  } catch (error) {
    return { success: false, message: 'Erro ao adicionar item' };
  }
};

export const removeItem = async (id) => {
  try {
    const items = await getItems();
    const updatedItems = items.filter(item => item.id !== id);
    await saveData(ITEMS_KEY, updatedItems);
    return { success: true, items: updatedItems };
  } catch (error) {
    return { success: false, message: 'Erro ao remover item' };
  }
};
