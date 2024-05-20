import AsyncStorage from '@react-native-async-storage/async-storage';

type ListItem = {
  id: number;
  [key: string]: any;
};

async function SaveItem(listItem: any, id?: number): Promise<void> {
  listItem.id = id ?? new Date().getTime();
  const savedItems = await FindItems(); 

  if (id) {
    const index = savedItems.findIndex((item) => item.id === id);
    if (index !== -1) {
      savedItems[index] = listItem;
    }
  } else {
    savedItems.push(listItem);
  }

  const jsonValue = JSON.stringify(savedItems);

  await AsyncStorage.setItem('items', jsonValue);
}

function FindItems(): Promise<ListItem[]> {
  return AsyncStorage.getItem('items').then((response) => {
    if (response) {
      return JSON.parse(response);
    } else {
      return [];
    }
  });
}

async function FindItem(id: number): Promise<ListItem | undefined> {
  const savedItems = await FindItems();
  return savedItems.find((item) => item.id === id);
}

async function DeleteItem(id: number): Promise<void> {
  let savedItems = await FindItems();
  const index = savedItems.findIndex((item) => item.id === id);
  if (index !== -1) {
    savedItems.splice(index, 1);
    await AsyncStorage.setItem('items', JSON.stringify(savedItems));
  }
}

export default { SaveItem, FindItems, FindItem, DeleteItem };