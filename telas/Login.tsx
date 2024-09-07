import { Box, Button, FormControl, Image, Input, Link, StatusBar, Text, VStack } from "native-base";

import { Titulo } from "../components/Titulo";
import { Alert, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";

export default function Login(){
  
    const navigation = useNavigation();

    const [email, setEmail] = useState('')
    const [password, setpassword] = useState('')

    const alertLogado = () => {
        Alert.alert(
            '', // Título do alerta
            'Logado com sucesso!', // Mensagem do alerta
            [
              {
                text: 'OK', // Texto do botão de confirmação
                onPress: () => navigation.navigate('OpcaoMenu')
              }
            ],
            { cancelable: true } // Se o alerta pode ser cancelado clicando fora dele
          );
        }


  const handlelogin = () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        // ...
        console.log("Usuário logado:", user);
        alertLogado();
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Erro de login:", errorCode);
        handleFirebaseError(errorCode);
      });
    }

    const handleFirebaseError = (errorCode) => {
        switch (errorCode) {
          case "auth/invalid-credential":
            Alert.alert("Erro", "Email ou senha incorretos!");
            break;
          case "auth/user-not-found":
            Alert.alert("Erro", "Usuário não encontrado. Verifique se o e-mail está correto ou cadastre-se.");
            break;
          case "auth/wrong-password":
            Alert.alert("Erro", "Senha incorreta. Por favor, tente novamente.");
            break;
          case "auth/missing-password":
            Alert.alert("Erro", "Por favor, insira uma senha.");
            break;
            case "auth/invalid-email":
                Alert.alert("Erro", "Por favor, insira um E-Mail.");
                break;
          default:
            Alert.alert("Erro", "Ocorreu um erro inesperado. Tente novamente mais tarde.");
            break;
        }
    }

    return(
        <VStack padding={5} flex={1} justifyContent="center" alignItems={'center'}>
          <StatusBar backgroundColor='#3437e5'/>
          <Image alignSelf={'center'} source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'lg'}
            resizeMode="contain"/>
        <Titulo> Faça login em sua conta</Titulo>

        <Box marginTop={8}>
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

            <FormControl marginTop={3}>
                <FormControl.Label>Senha</FormControl.Label>
                <Input placeholder="Digite a sua senha"
                size={"lg"}
                width={'100%'}
                borderRadius={"lg"}
                backgroundColor={'gray.100'}
                shadow={3}
                value={password}
                secureTextEntry
                onChangeText={(val) => setpassword(val)}
                />
            </FormControl>

        </Box>

            <Button 
            width={"100%"}
            backgroundColor={'blue.800'}
            marginTop={10}
            borderRadius={'lg'}
            onPress={handlelogin}
            >
                Entrar
            </Button>
            <Link onPress={()=>navigation.navigate('RedefinirSenha')} marginTop={3}>Esqueceu sua senha?</Link>

            <Box flexDirection={'row'}>
                <Text fontSize={'md'}> Ainda não tem cadastro?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('Cadastro')}> 
                    <Text color={'blue.800'} fontSize={'md'} fontWeight={'bold'}> Crie a sua conta</Text>
                    </TouchableOpacity>
            </Box>
        </VStack>
    )
}