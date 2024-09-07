import { Box, Button, Divider, Image, Input, NativeBaseProvider, StatusBar, Text, View, VStack } from "native-base";
import { Titulo } from "../components/Titulo";
import { collection, deleteDoc, doc, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";
import { Alert } from "react-native";
import { app } from "../src/firebase/firebaseConfig";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";

const firestore = getFirestore(app);

export default function RemoverTurma(){
    const navigation = useNavigation();
    const handleDeleteAllClasses = async () => {
        try {
          // Obtendo a referência para a coleção 'turmas'
          const classesCollection = collection(firestore, 'turmas');
          // Obtendo todos os documentos na coleção
          const querySnapshot = await getDocs(classesCollection);
    
          // Deletar todos os documentos encontrados
          const deletePromises = querySnapshot.docs.map(docSnapshot => {
            const docRef = doc(firestore, 'turmas', docSnapshot.id); // Correção aqui
            return deleteDoc(docRef);
          });
          await Promise.all(deletePromises);
    
          Alert.alert('Sucesso', 'Todas as turmas foram removidas.');
        } catch (error) {
          console.error('Erro ao remover turmas: ', error);
          Alert.alert('Erro', 'Ocorreu um erro ao remover as turmas.');
        }
      };

      const confirmacaoDelete = () => {
        Alert.alert(
          'Confirmação',
          'Deseja realmente APAGAR todas as turmas?',
          [
            {
              text: 'Cancelar',
              onPress: () => console.log('Cancelado'),
              style: 'cancel',
            },
            {
              text: 'OK',
              onPress: handleDeleteAllClasses, 
            },
          ],
          { cancelable: true }
        );
      };

      const [turma, setTurma] = useState('');

      const deletarTurmaIndividual = async () => {
    if (!turma.trim()) {
      Alert.alert('Erro', 'Por favor, digite o ID da turma.');
      return;
    }

    try {
      // Consulta para encontrar o documento com o campo 'numero' igual a 'turma'
      const q = query(collection(firestore, 'turmas'), where('numero', '==', turma));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        Alert.alert('Erro', 'A turma informada não existe.');
        return;
      }

      // Supondo que há apenas um documento com esse número
      const docSnapshot = querySnapshot.docs[0];
      const docRef = doc(firestore, 'turmas', docSnapshot.id);
      await deleteDoc(docRef);

      Alert.alert('Sucesso', 'Turma removida com sucesso.');
      setTurma(''); // Limpa o campo de entrada após a exclusão
    } catch (error) {
      console.error('Erro ao remover a turma: ', error);
      Alert.alert('Erro', 'Ocorreu um erro ao remover a turma.');
    }
  };

    return(
        <NativeBaseProvider>
            <VStack flex={1} p={'5'} justifyContent={'center'}>
            <StatusBar backgroundColor='#3437e5'/>
            <Image alignSelf={'center'} source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'lg'}
            resizeMode="contain"/>
            <Titulo>Remoção de Turmas</Titulo>

                <Box marginTop={'10%'} borderRadius={'lg'} p={3} mt={'5%'} backgroundColor={'#eceaea'} justifyContent={'center'} alignItems={'center'} shadow={'9'}>
                <VStack mt={'0%'}>
                <Text textAlign={'center'} bold color={'blue.900'} fontSize={'lg'}>Remover turmas individuais</Text>
                    <Text mt={'3%'} textAlign={'left'} bold color={'gray.700'} fontSize={'15'}>Informe a turma que deseja remover:</Text>
                    <Input mt={'3%'} fontSize={'md'} backgroundColor={'white'} w={'100%'} placeholder="Ex. 3000" shadow={'9'} borderRadius={'lg'}
                    value={turma} onChangeText={setTurma}
                    />
                    <Button onPress={deletarTurmaIndividual} marginTop={'5%'} borderRadius={'lg'} backgroundColor={'blue.900'} mt={'4%'} _text={{fontWeight:'bold', fontSize:15}}>Remover turma</Button>
                </VStack>
                </Box>

                <Box marginTop={'7%'} borderRadius={'lg'} p={3} mt={'5%'} backgroundColor={'#eceaea'} justifyContent={'center'} alignItems={'center'} shadow={'9'}>
                <VStack mt={'0%'}>
                <Text textAlign={'center'} bold color={'blue.900'} fontSize={'lg'}>Remover Todas as turmas de uma vez</Text>
                     <Button onPress={confirmacaoDelete} borderRadius={'lg'} backgroundColor={'#8b2323'} mt={'4%'} _text={{fontWeight:'bold', fontSize:15}}>Remover TODAS as turmas</Button>
                </VStack>
                </Box>

                <Button onPress={()=>navigation.navigate('OpcoesGerenciamento')} marginTop={'15%'} borderRadius={'lg'} backgroundColor={'gray.500'} mt={'4%'} _text={{fontWeight:'bold', fontSize:15}}>Voltar</Button>
                
            </VStack>
        </NativeBaseProvider>
    )
    }
