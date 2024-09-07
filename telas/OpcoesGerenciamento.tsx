import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Alert, StyleSheet, Text, View } from 'react-native';
import { Box, Button, Divider, HStack, Image, NativeBaseProvider, VStack } from 'native-base'

import { useNavigation } from '@react-navigation/native';
import { collection, doc, getDocs, getFirestore, query, updateDoc, where } from 'firebase/firestore';

export default function OpcoesGerenciamento() {

async function buscarTurmasLiberadas(){

const db = getFirestore();

const turmasRef = collection(db, 'turmas');
const q = query(turmasRef, where ('liberada', '==', true));

const querySnapshot = await getDocs(q);

const turmasLiberadas = querySnapshot.docs.map(doc => ({
  id: doc.id,
  ...doc.data()
}));
  return turmasLiberadas
}

async function limparTurmasLiberadas(){
  const turmasLiberadas = await buscarTurmasLiberadas();
  const db = getFirestore();

  const liberadas = turmasLiberadas.map(turma => {
    const turmaRef = doc(db, 'turmas', turma.id);
    return updateDoc(turmaRef, {liberada:false});
  })
  await Promise.all(liberadas);
} 

const verificacaoLimparTurmas= () => {
  Alert.alert('Confirmação',
    'Deseja realmente limpar todas as turmas liberadas?',
    [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: limparTurmasLiberadas, 
      },
    ],
    { cancelable: true }
  );
}

    const navigation = useNavigation();
  return (
    <NativeBaseProvider>
      <VStack flex={1} padding={4} justifyContent={'center'}>
      <StatusBar backgroundColor='#3437e5'/>
      <Image alignSelf={'center'} source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'lg'}
            resizeMode="contain"/>
      <Text style={{fontSize:20, textAlign:'center', color:'#7B7B7B', fontWeight:'bold'}}>Painel de Controle das Turmas</Text>
      <VStack marginTop={5}>
        <Text style={{fontSize:16, fontWeight:'bold', color:'blue'}}>Escolha a opção desejada:</Text>

        <VStack mt={'7%'} backgroundColor={'#eceaea'} borderRadius={'lg'} shadow={'8'} p={'2%'}>
        <Text style={{fontSize:17, color:'#3437e5', fontWeight:'bold', textAlign:'center'}}>Opções mais usadas</Text>

        <Button backgroundColor={'blue.800'}
        borderRadius={15} 
        marginBottom={'2%'}    
        marginTop={4}
        w={'100%'} h={'50px'} _text={{fontSize:17}}
        onPress={() => navigation.navigate('LiberarTurma')}
        >Liberar turma</Button>

        <Button backgroundColor={'blue.800'}
        borderRadius={15}   
        marginTop={2}
        w={'100%'} h={'50px'} _text={{fontSize:17}}
        onPress={() => navigation.navigate('VisualizarTurmas')}
        >Visualizar turmas </Button>
        
        <Button backgroundColor={'blue.800'}
        borderRadius={15} 
        marginBottom={'2%'}    
        marginTop={'4.3%'}
        w={'100%'} h={'50px'} _text={{fontSize:17}}
        onPress={verificacaoLimparTurmas}
        >Limpar turmas liberadas</Button>

        </VStack>

        <VStack mt={'7%'} backgroundColor={'#eceaea'} borderRadius={'lg'} shadow={'8'} p={'2%'}>
        <Text style={{fontSize:17, color:'#3437e5', fontWeight:'bold', textAlign:'center'}}>Opções de Gerenciamento</Text>

        <Button backgroundColor={'blue.800'}
        borderRadius={15}   
        marginTop={4}
        w={'100%'} h={'50px'} _text={{fontSize:17}}
        onPress={()=>navigation.navigate('AddTurma')}
        >Adicionar turmas </Button>

        <Button backgroundColor={'blue.800'}
        borderRadius={15}     
        marginTop={4}
        w={'100%'} h={'50px'} _text={{fontSize:17}}
        onPress={() => navigation.navigate('RemoverTurma')}
        >Remover turmas</Button>

        </VStack>

      </VStack>
        <Button alignSelf={'center'} marginBottom={0}marginTop={10}
        w={'60%'} borderRadius={'100'} backgroundColor={'gray.500'}
        _text={{fontSize:18}}
        onPress={() => navigation.navigate('OpcaoMenu')}
        >Voltar</Button>
      </VStack>
    </NativeBaseProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fonteSm:{
fontSize: 14
  },
  fonteMd:{
    fontSize: 16
      },
  fonteLg:{
  fontSize: 18
  },
});
