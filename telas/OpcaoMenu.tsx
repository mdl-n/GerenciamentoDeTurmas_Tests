import { Button, HStack, Image, NativeBaseProvider, Row, StatusBar, Text, VStack } from "native-base";
import { Titulo } from "../components/Titulo";
import { useNavigation } from "@react-navigation/native";

export default function OpcaoMenu(){
    const navigation = useNavigation();
    return(
        <NativeBaseProvider>
            <VStack flex={1} justifyContent={'center'} alignItems={'center'} p={'5%'}>
            <StatusBar backgroundColor='#3437e5'/>
            <Image alignSelf={'center'} source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'lg'}
            resizeMode="contain"/>
                <Titulo color={'gray.600'}>Gerenciamento de turmas</Titulo>
                <Text fontSize={16} color={'gray.500'} bold>Colégio Estadual Renato Azevedo</Text>
                
                <Text mt={"15%"} color={'blue.900'} bold fontSize={18}>Informe a opção desejada:</Text>                

                <HStack mt={'5%'}>
                <Button w={'40%'} h={'100'} _text={{fontSize:'17', textAlign:'center'}} backgroundColor={'blue.900'}
                onPress={()=> navigation.navigate('VisualizarTurmas')}
                >Visualizar turmas</Button>
                <Button ml={'5%'} w={'40%'} h={'100'}  _text={{fontSize:'17', textAlign:'center'}} backgroundColor={'blue.900'} onPress={() => navigation.navigate('OpcoesGerenciamento')}>Gerenciar turmas</Button>
               </HStack>
               
                   <Button alignSelf={'center'} marginBottom={0}marginTop={16}
        w={'60%'} borderRadius={'100'} backgroundColor={'gray.500'}
        _text={{fontSize:16}} onPress={()=>navigation.navigate('Login')}>Voltar</Button>
                </VStack>

        </NativeBaseProvider>
        
    )
}