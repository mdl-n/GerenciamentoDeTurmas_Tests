import { Image, StatusBar, Text, VStack } from "native-base";
import { Titulo } from "../components/Titulo";

export default function TelaLoading(){
    return(

        <VStack flex={1}
        padding={5}
        backgroundColor={'#131166'}
        justifyContent={'center'} 
        alignItems={'center'}>
            <StatusBar backgroundColor='#3437e5'/>
            <VStack justifyContent={'center'} alignItems={'center'}>
            <Titulo color={'white'} fontSize={23}>Estado do Rio de Janeiro</Titulo>
            <Titulo marginTop={'0'} color={'white'} fontSize={18}>Colégio Estadual Renato Azevedo</Titulo>
            <Text marginTop={'10'} bold fontSize={'28'} color={'white'}>Gerenciamento de Turmas</Text>
            </VStack>
            
             <Image source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'55%'}
            resizeMode="contain"
            mb={'-24%'}
            mt={'-8'}
            />
            <Image source={require('../src/assets/Loading.png')}
            alt="Logo loading" 
            size={'23%'}
            resizeMode="contain"
            />

            <Text alignItems={'center'} marginTop={'-8%'} color={'white'} fontSize={'lg'}>Carregando, aguarde...</Text>
        </VStack>

    )
}