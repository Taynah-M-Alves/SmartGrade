import React, {useState} from 'react';
import {
  Container,
  Card,
  Label,
  Input,
  InputContainer,
  Button,
  ButtonText,
  DividerRow,
  Divider,
  DividerText,
  SocialButton,
  SocialText,
  FooterText,
} from '../../../styles/login.styles';
import {router} from 'expo-router'
import { Text, Alert, TouchableOpacity, Image  } from 'react-native';
import { useAuth } from 'hooks/useAuth';
import PageContainer from 'components/PageContainer';



export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const api = process.env.EXPO_PUBLIC_BASE_URL

  const {signIn} = useAuth()

  async function handleLogin() {
    try{
      setLoading(true);

      const response = await fetch(`${api}auth/login`,
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email,
            password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Erro ao realizar login',
        );
      }

      const token = data.access_token;

      alert('Login realizado com sucesso!')

      
      signIn(data.user, token)
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao realizar login',
      );
    }finally {
      
      setLoading(false);
      
    }
  }
  return (
    <PageContainer>

    <Container>
      <Card>
         <Image
          source={require("../../../assets/logoSemBackground.png")}
          style={{
            width: 250,
            height: 250,
            alignSelf: "center",
            marginBottom: 0,
          }}
          resizeMode="contain"
        />

        <Label>E-mail</Label>
        <InputContainer>
          <Input 
          placeholder="nome@instituicao.edu"
          value={email}
          onChangeText={setEmail} />
        </InputContainer>
        
        <Label>Senha</Label>
        <InputContainer>
          <Input placeholder="••••••••" 
          secureTextEntry
          value={password}
          onChangeText={setPassword} />
        </InputContainer>

        <Button onPress={handleLogin}>
          <ButtonText>{loading ? "Entrando..." : "Entrar"}</ButtonText>
        </Button>

        <FooterText>
          Não tem uma conta? <TouchableOpacity onPress={() => router.push('/auth/Cadastro')}><Text>Criar conta</Text></TouchableOpacity>
        </FooterText>

        {/* <TouchableOpacity onPress={() => router.push('/screens/Cadastro')}><Text>Criar Conta</Text></TouchableOpacity> */}
      </Card>
    </Container>
    
    </PageContainer>
  );
}
