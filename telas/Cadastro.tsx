import { Box, Button, FormControl, Image, Input, StatusBar, VStack } from "native-base";
import { Titulo } from "../components/Titulo";
import { Alert } from "react-native";
import { useState } from "react";
import { useNavigation } from '@react-navigation/native';
import { auth } from '../src/firebase/firebaseConfig'
import { createUserWithEmailAndPassword } from "firebase/auth";

export default function Cadastro({ setUser }) {
    const [email, setEmail] = useState('');
    const [password1, setPassword1] = useState('');
    const [password2, setPassword2] = useState('');

    const handleCadastro = async () => {
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password1);
            const user = userCredential.user;
            console.log(user);

            if (typeof setUser === 'function') {
                setUser(user);
            } else {
                console.error('setUser não é uma função:', setUser);
            }

            showAlert();
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            console.log(errorMessage);

            if (errorCode === 'auth/invalid-email') {
                Alert.alert('Erro', 'O formato do E-Mail é inválido.');
            } else if (errorCode === 'auth/email-already-in-use') {
                Alert.alert('Erro', 'O E-Mail já está em uso.');
            } else {
                Alert.alert('Erro', 'Ocorreu um erro ao criar a conta.');
            }
            console.log('Código do erro:', errorCode);
        }
    };

    const verificarDados = () => {
      if (email.trim() === '' && password1.trim() === '' && password2.trim() === '') {
        Alert.alert('', 'Preencha todos os campos.');
        return;
      }
        if (email.trim() === '') {
            Alert.alert('', 'Preencha o E-Mail.');
            return;
        }
        if (password1.trim() === '') {
          Alert.alert('', 'Preencha a senha.');
          return;
      }
      if (password2.trim() === '') {
        Alert.alert('', 'Preencha a confirmação da senha.');
        return;
      }

        if (password1.length < 6) {
            Alert.alert('', 'A senha deve ter 6 ou mais caracteres.');
            return;
        }

        if (password1 !== password2) {
            Alert.alert('', 'As senhas devem ser iguais.');
            return;
        }
        handleCadastro();
    };

    const navigation = useNavigation();

    const showAlert = () => {
        Alert.alert(
            '',
            'Conta criada com sucesso!',
            [
                {
                    text: 'OK',
                    onPress: () => navigation.navigate('Login')
                }
            ],
            { cancelable: true }
        );
    };

    return (
        <VStack padding={5} flex={1} justifyContent="center" alignItems={'center'}>
            <StatusBar backgroundColor='#3437e5' />
            <Image alignSelf={'center'} source={require('../src/assets/brasaoEstadual.png')}
            alt="Logo Estadual" 
            size={'lg'}
            resizeMode="contain"/>
            <Titulo fontSize={'lg'}>Digite os dados para criar sua conta</Titulo>

            <Box marginTop={4}>
                <FormControl>
                    <FormControl.Label>E-Mail</FormControl.Label>
                    <Input placeholder="Digite o seu E-Mail"
                        size={"lg"}
                        width={'100%'}
                        borderRadius={"lg"}
                        backgroundColor={'gray.100'}
                        shadow={3}
                        value={email} onChangeText={(val) => setEmail(val)}
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
                        secureTextEntry
                        value={password1} onChangeText={(val) => setPassword1(val)}
                    />
                </FormControl>

                <FormControl marginTop={3}>
                    <FormControl.Label>Confirmar senha</FormControl.Label>
                    <Input placeholder="Confirme a sua senha"
                        size={"lg"}
                        width={'100%'}
                        borderRadius={"lg"}
                        backgroundColor={'gray.100'}
                        shadow={3}
                        secureTextEntry
                        value={password2} onChangeText={(val) => setPassword2(val)}
                    />
                </FormControl>
            </Box>

            <Button
                width={"100%"}
                backgroundColor={'gray.500'}
                marginTop={12}
                borderRadius={'lg'}
                onPress={() => navigation.navigate('Login')}
            >
                Voltar
            </Button>

            <Button
                width={"100%"}
                backgroundColor={'blue.800'}
                marginTop={5}
                borderRadius={'lg'}
                onPress={verificarDados}
            >
                Criar conta
            </Button>

        </VStack>
    );
}
