import { Box, Button, FormControl, Image, Input, NativeBaseProvider, StatusBar, Text, VStack } from "native-base";
import { Titulo } from "../components/Titulo";
import { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../src/firebase/firebaseConfig";
import { Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function RedefinirSenha(){

const navigation = useNavigation();

const [email, setEmail] = useState('')

const handlePasswordReset = async () => {
    try {
        await sendPasswordResetEmail(auth, email);
        Alert.alert('E-mail enviado', 'Verifique seu e-mail para redefinir sua senha.');
        setEmail('');
    } catch (error) {
        Alert.alert('Erro', 'Não foi possível enviar o e-mail de redefinição de senha.');
    }
};

    return(
        <NativeBaseProvider>
<VStack padding={5} flex={1} justifyContent="center" alignItems={'center'}>
          <StatusBar backgroundColor='#3437e5'/>

          <Image alignSelf={'center'} source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'lg'}
            resizeMode="contain"/>

        <Titulo> Redefinir a Senha</Titulo>

<Text mt={'15%'} bold color={'blue.900'} fontSize={'md'}>Informe abaixo o seu E-Mail:</Text>
        <Box>
            <FormControl >
                <FormControl.Label>E-Mail</FormControl.Label>
                <Input placeholder="Digite o seu E-Mail"
                size={"lg"}
                width={'100%'}
                borderRadius={"lg"}
                backgroundColor={'gray.100'}
                shadow={3}
                value={email}
                onChangeText={(val) => setEmail(val)}
                />
            </FormControl>
            </Box>
            <Button w={'100%'} mt={'15%'} borderRadius={'full'} backgroundColor={'blue.900'}
            onPress={handlePasswordReset}
            >Enviar E-Mail de Recuperação</Button>
            <Button w={'100%'} mt={'4%'} borderRadius={'full'} backgroundColor={'gray.500'}
            onPress={()=>navigation.navigate('Login')}
            >Voltar</Button>
            </VStack>
            </NativeBaseProvider>
    )
}

