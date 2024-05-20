import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, ScrollView, StatusBar} from 'react-native';
import AppItem from './AppItem';
import Database from './Database';

export default function AppList( { route, navigation }: any) {
  
  const [items, setItems] = useState([]);

  useEffect(() => {
    Database.FindItems().then((items:any) => setItems(items));
  }, [route]);

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#D93600" />
      <Text style={styles.title}>Lista de Compras</Text>
      <ScrollView style={styles.scrollContainer}>
        {items.map((item:any) => (
          <AppItem
            key={item.id}
            id={item.id}
            item={`${item.quantidade} de ${item.descricao}`}
            navigation={navigation}
          />
          
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D93600',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
    marginBottom: 20,
  },
  scrollContainer: {
    flex: 1,
    width: '90%',
    marginTop: 10,
  },
});
