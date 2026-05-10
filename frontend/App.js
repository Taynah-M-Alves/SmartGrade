import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Minhas telas - Lembrar de reativar as outras para o trabalho da faculdade depois
// import TelaInfo from './Telainfo';
// import TelaContato from './TelaContato';
import TelaLogin from './TelaLogin';
import TelaEsqueceuSenha from './TelaEsqueceuSenha'; 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      {/* Começar direto pela Login para agilizar os testes agora */}
      <Stack.Navigator initialRouteName="TelaLogin">
        
        {/* Telas que estou usando no momento */}
        <Stack.Screen name="TelaLogin" component={TelaLogin} options={{ title: 'Acesso' }} />
        <Stack.Screen name="EsqueceuSenha" component={TelaEsqueceuSenha} options={{ title: 'Recuperar Senha' }} /> 

        {/* 
           Manter estas telas aqui embaixo para não perder a estrutura do trabalho 
           Só preciso descomentar quando for entregar a versão completa
           <Stack.Screen name="Home" component={TelaInfo} />
           <Stack.Screen name="Contato" component={TelaContato} />
        */}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}