import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Database from './Database';

export default function AppForm({ route, navigation }: any) {

  const id = route.params ? route.params.id : undefined;
  const [descricao, setDescricao] = useState('');
  const [quantidade, setQuantidade] = useState('');

  useEffect(() => {
    if (!route.params) {
      return;
    }
    setDescricao(route.params.descricao);
    setQuantidade(route.params.quantidade.toString());
  }, [route]);

  function handleDescriptionChange(descricao:any) {
    setDescricao(descricao);
  }

  function handleQuantityChange(quantidade:any) {
    setQuantidade(quantidade);
  }

  async function handleButtonPress() {
    const listItem = {descricao, quantidade: parseInt(quantidade)};
        
    Database.SaveItem(listItem, id) .then(response =>      
       navigation.navigate('AppList',{id: 1 })
    ).catch(function(error) {
      console.log('Error: ' + error.message);
      });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Item para comprar</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={handleDescriptionChange}
          placeholder="O que está faltando em casa?"
          clearButtonMode="always"
          value={descricao}
        />
        <TextInput
          style={styles.input}
          onChangeText={handleQuantityChange}
          placeholder="Digite a quantidade"
          keyboardType={'numeric'}
          clearButtonMode="always"
          value={quantidade.toString()}
        />
        <TouchableOpacity style={styles.button} onPress={handleButtonPress}>
          <View style={styles.buttonContainer}>
            <Icon name="save" size={22} color="white" />
            <Text style={styles.buttonText}>Salvar</Text>
          </View>
        </TouchableOpacity>
      </View>
      <StatusBar barStyle="light-content" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#D93600',
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 50,
  },
  inputContainer: {
    flex: 1,
    marginTop: 30,
    width: '90%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignItems: 'stretch',
    backgroundColor: '#fff',
  },
  input: {
    marginTop: 10,
    height: 60,
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'stretch',
  },
  button: {
    marginTop: 10,
    height: 60,
    backgroundColor: 'blue',
    borderRadius: 10,
    paddingHorizontal: 24,
    fontSize: 16,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 20,
    shadowOpacity: 20,
    shadowColor: '#ccc',
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  buttonText: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
});
