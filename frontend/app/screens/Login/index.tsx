import React, {useState} from 'react';
import {
  Container,
  Card,
  Title,
  Subtitle,
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
  // IconWrapper,
} from '../../../styles/login.styles';
import {router} from 'expo-router'
// import {SelectDropdown, DropdownData} from "expo-select-dropdown";
import { Text, Alert, TouchableOpacity, ScrollView  } from 'react-native';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<DropdownData<string, string> | null>(null);  

  async function handleLogin() {
    try{
      setLoading(true);

      const response = await fetch('https://smart-grade-api-t09j.onrender.com/auth/login',
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

      console.log('data', data);

      const role = data.user.role;

      if (role === 'PROFESSOR'){
        router.push('/screens/CriarRubrica');
      } else if(role === 'ALUNO') {
        router.push('/screens/SubmitScreen');
      } else {
        Alert.alert('Erro','Perfil não reconhecido');
      }

    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao realizar login',
      );
    }finally {
      setLoading(false);
    }
  }
  return (
    <ScrollView>
    <Container>
      <Card>
        <Title>SmartGrade</Title>
        <Subtitle>Bem-vindo</Subtitle>
        <Text style={{ textAlign: 'center', color: '#636E72', marginBottom: 20 }}>
          Login.
        </Text>

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
          // secureTextEntry
          value={password}
          onChangeText={setPassword} />
        </InputContainer>

        <Button onPress={handleLogin}>
          <ButtonText>{loading ? "Entrando..." : "Entrar"}</ButtonText>
        </Button>

        <DividerRow>
          <Divider />
          <DividerText>OU CONTINUE COM</DividerText>
          <Divider />
        </DividerRow>

        <SocialButton>
          <SocialText>Google</SocialText>
        </SocialButton>

        <SocialButton>
          <SocialText>Apple</SocialText>
        </SocialButton>

        <FooterText>
          Não tem uma conta? <TouchableOpacity onPress={() => router.push('/screens/Cadastro')}><Text>Criar conta</Text></TouchableOpacity>
        </FooterText>

        <TouchableOpacity onPress={() => router.push('/screens/Cadastro')}><Text>Criar Conta</Text></TouchableOpacity>
      </Card>
    </Container>
    </ScrollView>
  );
}