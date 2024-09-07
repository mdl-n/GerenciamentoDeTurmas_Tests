import { useNavigation } from "@react-navigation/native";
import { Button, HStack, Image, Input, NativeBaseProvider, StatusBar, Text, View, VStack } from "native-base";
import { useState } from "react";
import { Alert } from "react-native";
import { getFirestore, collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { app } from "../src/firebase/firebaseConfig";

export default function AddTurma() {
    
    const navigation = useNavigation();

    const [numeroTurma, setNumeroTurma] = useState("");
    const [turnoSelecionado, setTurnoSelecionado] = useState("");

    const [apertadoBtnManha, setApertadoBtnManha] = useState(false);
    const [apertadoBtnTarde, setApertadoBtnTarde] = useState(false);
    const [apertadoBtnNoite, setApertadoBtnNoite] = useState(false);

    const sendDataToFirestore = async () => {
        
        if (turnoSelecionado.length < 1 || numeroTurma.length < 1) {
            Alert.alert("Erro", "Por favor, preencha todos os campos.");
            return;
        }

        try {
            const db = getFirestore(app);

            const q = query(collection(db, 'turmas'), where ('numero', "==", numeroTurma));
            const querySnapshot = await getDocs(q);

            if(!querySnapshot.empty){
                Alert.alert ('Erro', 'Já existe uma turma com esse numero.')
                return;
            }

                const docRef = await addDoc(collection(db, "turmas"), {
                numero: numeroTurma,
                turno: turnoSelecionado,
                liberada: false
            });

            console.log("Documento escrito com ID: ", docRef.id);
            showAlert();
        } catch (e) {
            console.error("Erro ao adicionar documento: ", e);
        }
    };

    const apertouBtnManha = () => {
        if (apertadoBtnManha) {
            setApertadoBtnManha(false);
            setTurnoSelecionado(""); 
        } else {
            setApertadoBtnManha(true);
            setApertadoBtnTarde(false);
            setApertadoBtnNoite(false);
            setTurnoSelecionado("Manhã");
        }
    };
    
    const apertouBtnTarde = () => {
        if (apertadoBtnTarde) {
            setApertadoBtnTarde(false);
            setTurnoSelecionado(""); 
        } else {
            setApertadoBtnTarde(true);
            setApertadoBtnManha(false);
            setApertadoBtnNoite(false);
            setTurnoSelecionado("Tarde");
        }
    };
    
    const apertouBtnNoite = () => {
        if (apertadoBtnNoite) {
            setApertadoBtnNoite(false);
            setTurnoSelecionado(""); 
        } else {
            setApertadoBtnNoite(true);
            setApertadoBtnTarde(false);
            setApertadoBtnManha(false);
            setTurnoSelecionado("Noite");
        }
    };

    const showAlert = () => {
        setNumeroTurma('')
        Alert.alert(
            '', 
            'Turma adicionada com sucesso!', 
            [{ text: 'OK' }], 
            { cancelable: true }
    
        );
    };

    return (
        <NativeBaseProvider>
            <VStack flex={1} justifyContent={'center'} alignItems={'center'}>
            <StatusBar backgroundColor='#3437e5'/>
            <Image alignSelf={'center'} source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'lg'}
            resizeMode="contain"/>
                <Text fontSize={"20"} fontWeight={"bold"} color={'gray.500'} textAlign="center" marginTop={5}>
                    Menu para Adicionar turmas
                </Text>

                <View marginTop={50}>
                    <Text fontSize={15} fontWeight={'bold'}>
                        Informe qual o turno que deseja adicionar a turma:
                    </Text>

                    <HStack marginTop={5} justifyContent={'center'}>
                        <Button 
                            _text={{ fontSize: '15' }} 
                            w={"27%"} 
                            borderRadius={10} 
                            backgroundColor={apertadoBtnManha ? "green.500" : "blue.800"} 
                            onPress={apertouBtnManha}
                        >
                            Manhã
                        </Button>
                        <Button 
                            _text={{ fontSize: '15' }} 
                            w={"27%"} 
                            borderRadius={10} 
                            marginLeft={5} 
                            backgroundColor={apertadoBtnTarde ? "green.500" : "blue.800"} 
                            onPress={apertouBtnTarde}
                        >
                            Tarde
                        </Button>
                        <Button 
                            _text={{ fontSize: '15' }} 
                            w={"27%"} 
                            borderRadius={10} 
                            marginLeft={5} 
                            backgroundColor={apertadoBtnNoite ? "green.500" : "blue.800"} 
                            onPress={apertouBtnNoite}
                        >
                            Noite
                        </Button>
                    </HStack>

                    <View marginTop={'14%'}>
                        <Text fontSize={15} fontWeight={'bold'}>
                            Informe o número da turma:
                        </Text>
                        <Input 
                            marginTop={3} 
                            placeholder="ex. 3000"
                            size={"lg"}
                            width={'100%'}
                            borderRadius={"lg"}
                            backgroundColor={'gray.100'}
                            shadow={3}
                           value={numeroTurma} onChangeText={(val) => setNumeroTurma(val)}
                        />
                    </View>

                    <View marginTop={'13%'}>
                        <Button 
                            w={"100%"} 
                            borderRadius={'10'} 
                            backgroundColor={'blue.800'}
                            onPress={sendDataToFirestore}
                        >
                            Adicionar turma
                        </Button>
                        <Button 
                            marginTop={'5%'} 
                            w={"100%"} 
                            borderRadius={'10'} 
                            backgroundColor={'gray.500'} 
                            onPress={() => navigation.navigate('OpcoesGerenciamento')}
                        >
                            Voltar
                        </Button>
                    </View>
                </View>
            </VStack>
        </NativeBaseProvider>
    );
}
