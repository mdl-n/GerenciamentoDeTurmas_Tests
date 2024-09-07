import { Box, Button, Divider, HStack, Image, Input, NativeBaseProvider, ScrollView, StatusBar, Text, View, VStack } from "native-base";
import { Titulo } from "../components/Titulo";
import { useEffect, useState } from "react";
import { collection, doc, getDocs, getFirestore, Timestamp, updateDoc } from "firebase/firestore";
import { Alert } from "react-native";
import { app } from "../src/firebase/firebaseConfig";
import moment from "moment-timezone";
import { useNavigation } from "@react-navigation/native";

export default function LiberarTurma(){

const navigation = useNavigation();

    const [turmas, setTurmas] = useState({
        turno1: [],
        turno2: [],
        turno3: []
        });
    
        useEffect(()=>{
            const dadosTurmas = async () => {
                try {
                    const db = getFirestore(app);
                    const querySnapshot = await getDocs(collection(db, 'turmas'));
    
                    const turmasLista = querySnapshot.docs.map(doc=>({
                        id:doc.id,
                        ...doc.data()
                    }));
    
                    const turno1 = turmasLista.filter(turma=>turma.turno === "Manhã")
                    const turno2 = turmasLista.filter(turma=>turma.turno === "Tarde")
                    const turno3 = turmasLista.filter(turma=>turma.turno === "Noite")
    
                    const btnStatus = turmasLista.reduce((acc, turma) => {
                        acc[turma.id] = turma.liberada;
                        return acc;
                    }, {});
        
                    setTurmas({
                        turno1,
                        turno2,
                        turno3
                    });
        
                    setBtnGenerico(btnStatus);
                } catch (erro) {
                    Alert.alert('Erro', 'Não foi possível carregar as turmas.');
                }
            };

            dadosTurmas();
        }, [])


    const [apertadoBtn1turno, setApertadoBtn1Turno] = useState(false);
    const [apertadoBtn2turno, setApertadoBtn2Turno] = useState(false);
    const [apertadoBtn3turno, setApertadoBtn3Turno] = useState(false);

    const apertouBtn1Turno = () =>{
        setApertadoBtn1Turno(!apertadoBtn1turno)

        setApertadoBtn2Turno(false)
        setApertadoBtn3Turno(false)
    }
    const apertouBtn2Turno = () =>{
        setApertadoBtn2Turno(!apertadoBtn2turno)

        setApertadoBtn1Turno(false)
        setApertadoBtn3Turno(false)
    }
    const apertouBtn3Turno = () =>{
        setApertadoBtn3Turno(!apertadoBtn3turno)

        setApertadoBtn1Turno(false)
        setApertadoBtn2Turno(false)
    }

    const [telaEscolhida, setTelaEscolhida] = useState(null);

    const RenderizarTelaEscolhida = () => {
        if(apertadoBtn1turno==true || apertadoBtn2turno==true || apertadoBtn3turno==true){
        switch (telaEscolhida){
            case 'tela1Turno':
                return <Tela1Turno/>
            case 'tela2Turno':
                return <Tela2Turno/>
            case 'tela3Turno':
                return <Tela3Turno/>
        }
    }
    }

    const [btnGenerico, setBtnGenerico] = useState({});

    const apertouBtnGenerico = async (turmaId) => {
        setBtnGenerico(prevState => ({
            ...prevState,
            [turmaId]: !prevState[turmaId]
        }));
        
        try {
            const db = getFirestore(app);
            const turmaRef = doc(db, 'turmas', turmaId);

            const agoraUTC = new Date();
            const dataLiberacao = !btnGenerico[turmaId] ? moment(agoraUTC).tz('America/Sao_Paulo').format('DD/MM/YYYY HH:mm:ss') : null;

            await updateDoc(
                turmaRef, {
                liberada: !btnGenerico[turmaId],
                dataLiberacao: dataLiberacao
            });
        } catch (error) {
            Alert.alert('Erro', 'Não foi possível atualizar o status da turma.');
        }
    };

    const Tela1Turno = () => (
        <View mt={4} p={3.9} bg="gray.300" borderRadius={8} shadow={7}>
          <Text textAlign={'center'} color={"blue.900"} bold fontSize={'lg'}>Clique para liberar a turma:</Text>
          <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 1° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno1.filter(turma=>turma.turno === 'Manhã' && turma.numero.charAt(0) ==='1').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>
            
            <Divider mt={'4%'} backgroundColor={'gray.400'}/>

            <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 2° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno1.filter(turma=>turma.turno === 'Manhã' && turma.numero.charAt(0) ==='2').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>

            <Divider mt={'4%'} backgroundColor={'gray.400'}/>

            <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 3° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno1.filter(turma=>turma.turno === 'Manhã' && turma.numero.charAt(0) ==='3').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>

        </View>
      );


      const Tela2Turno = () => (
        <View mt={4} p={3.9} bg="gray.300" borderRadius={8} shadow={7}>
          <Text textAlign={'center'} color={"blue.900"} bold fontSize={'lg'}>Clique para liberar a turma:</Text>
          <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 1° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno2.filter(turma=>turma.turno === 'Tarde' && turma.numero.charAt(0) ==='1').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>
            
            <Divider mt={'4%'} backgroundColor={'gray.400'}/>

            <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 2° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno2.filter(turma=>turma.turno === 'Tarde' && turma.numero.charAt(0) ==='2').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>

            <Divider mt={'4%'} backgroundColor={'gray.400'}/>

            <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 3° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno2.filter(turma=>turma.turno === 'Tarde' && turma.numero.charAt(0) ==='3').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>

        </View>
      );

      const Tela3Turno = () => (
        <View mt={4} p={3.9} bg="gray.300" borderRadius={8} shadow={7}>
          <Text textAlign={'center'} color={"blue.900"} bold fontSize={'lg'}>Clique para liberar a turma:</Text>
          <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 1° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno3.filter(turma=>turma.turno === 'Noite' && turma.numero.charAt(0) ==='1').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>
            
            <Divider mt={'4%'} backgroundColor={'gray.400'}/>

            <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 2° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno3.filter(turma=>turma.turno === 'Noite' && turma.numero.charAt(0) ==='2').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>

            <Divider mt={'4%'} backgroundColor={'gray.400'}/>

            <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas do 3° Ano:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno3.filter(turma=>turma.turno === 'Noite' && turma.numero.charAt(0) ==='3').sort((a, b) => {
            const numeroA = parseInt(a.numero, 10);
            const numeroB = parseInt(b.numero, 10);
            return numeroA - numeroB;
          }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>

            <Divider mt={'4%'} backgroundColor={'gray.400'}/>

            <VStack mt={'2%'}>
                <Text textAlign={'left'} bold color={'gray.600'}>Turmas NEJA:</Text>
                <VStack ml={'-2'} mt={'2%'} flexWrap={'wrap'} flexDirection={'row'} justifyContent={'center'} alignItems={'center'}>
                    {turmas.turno3.filter(turma=>turma.turno === 'Noite' && turma.numero.charAt(0) ==='N').sort((a, b) => {
        const numeroA = parseInt(a.numero.replace(/\D/g, ''), 10);
        const numeroB = parseInt(b.numero.replace(/\D/g, ''), 10);
        return numeroA - numeroB;
      }).map(turma => (
                    <Box key={turma.id} mt={'1%'} ml={'2%'}>
                    <Button
                        color="white"
                        _text={{ fontSize: '15', fontWeight: 'bold' }}
                        backgroundColor={btnGenerico[turma.id] ? 'green.500' : '#ff0000'}
                        onPress={()=>apertouBtnGenerico(turma.id)}
                    >
                        {turma.numero}
                    </Button>
                    </Box>
                ))}
                </VStack>
            </VStack>

        </View>
      );

    return(
        <NativeBaseProvider>
            <ScrollView>
            <VStack p={4} justifyContent={'center'} mt={'20%'}>
            <StatusBar backgroundColor='#3437e5'/>
            <Image alignSelf={'center'} source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'lg'}
            resizeMode="contain"/>
            <Titulo>Liberação das Turmas</Titulo>
            <View flexDirection={'row'} justifyContent={'center'}>
            <Button mt={'10%'} w={'5%'} backgroundColor={'#ff0000'}></Button>
            <Text ml={'1%'} mt={'10%'} bold>Turma em aula</Text>
            <Button ml={'6%'} mt={'10%'} w={'5%'} backgroundColor={'green.500'}></Button>
            <Text ml={'1%'} mt={'10%'} bold>Turma liberada</Text>
            </View>
            

            <View borderRadius={'lg'} mt={'10%'} justifyContent={'center'} alignItems={'center'} backgroundColor={'#eceaea'} shadow={'9'}>
            <VStack p={3}>  
                <Text color={'blue.900'} bold fontSize={'18'} textAlign={'center'}>turmas gerais</Text>
                <HStack mt={'3%'} p={1} justifyContent={'center'} alignItems={'center'} mb={2}>
                    <Button _text={{fontSize:'17'}} w={'31%'} backgroundColor={apertadoBtn1turno ? "green.500" : 'blue.700'} onPress={()=> {apertouBtn1Turno(), setTelaEscolhida('tela1Turno')}}>1° Turno</Button>
                    <Button _text={{fontSize:'17'}} w={'31%'} backgroundColor={apertadoBtn2turno ? "green.500" : 'blue.700'} onPress={()=> {apertouBtn2Turno(), setTelaEscolhida('tela2Turno')}} ml={'5%'}>2° Turno</Button>
                    <Button _text={{fontSize:'17'}} w={'31%'} backgroundColor={apertadoBtn3turno ? "green.500" : 'blue.700'} onPress={()=>{apertouBtn3Turno(), setTelaEscolhida('tela3Turno')}} ml={'5%'}>3° Turno</Button>
                </HStack>
                {RenderizarTelaEscolhida()}
               
            </VStack>
            </View>
            <Button onPress={()=>navigation.navigate('OpcoesGerenciamento')} mt={'20%'} backgroundColor={'gray.500'}>Voltar</Button>
            </VStack>
            
            </ScrollView>
        </NativeBaseProvider>
    )
}