import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Login from './Login';
import Cadastro from './Cadastro';
import AddTurma from './AddTurma';
import RemoverTurma from './RemoverTurma';
import OpcoesMenu from './OpcoesGerenciamento';
import OpcoesGerenciamento from './OpcoesGerenciamento';
import OpcaoMenu from './OpcaoMenu';
import LiberarTurma from './LiberarTurma';
import VisualizarTurmas from './VisualizarTurmas';
import TelaLoading from './TelaLoading';
import { useEffect, useState } from 'react';
import { StatusBar } from 'native-base';
import RedefinirSenha from './RedefinirSenha';

const Stack = createStackNavigator();

const AppNavigator = () => {
  
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false);
    }, 4000); 
  }, []);

  if (isLoading) {
    return <TelaLoading />;
  }
  return (
    <NavigationContainer>
      <StatusBar backgroundColor='#3437e5'/>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={Login} options={{headerShown:false}}/>
        <Stack.Screen name="Cadastro" component={Cadastro} options={{headerShown:false}}/>
        <Stack.Screen name="RedefinirSenha" component={RedefinirSenha} options={{headerShown:false}}/>
        <Stack.Screen name='AddTurma' component={AddTurma} options={{headerShown:false}}/>
        <Stack.Screen name='RemoverTurma' component={RemoverTurma} options={{headerShown:false}}/>
        <Stack.Screen name='OpcaoMenu' component={OpcaoMenu} options={{headerShown:false}}/>
        <Stack.Screen name='OpcoesGerenciamento' component={OpcoesGerenciamento} options={{headerShown:false}}/>
        <Stack.Screen name='LiberarTurma' component={LiberarTurma} options={{headerShown:false}}/>
        <Stack.Screen name='VisualizarTurmas' component={VisualizarTurmas} options={{headerShown:false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigator;