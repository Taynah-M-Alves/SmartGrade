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
} from './style';
import {router} from 'expo-router'
// import {SelectDropdown, DropdownData} from "expo-select-dropdown";
import { Text, Alert, TouchableOpacity, ScrollView } from 'react-native';

export default function Cadastro() {
  const [nome, setNome] = useState('')
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('ALUNO');
  const [loading, setLoading] = useState(false);

  const [selected, setSelected] = useState<DropdownData<string, string> | null>(null);  
    
  async function handleCadastro() {
    try{
      setLoading(true);

      const response = await fetch('http://192.168.1.13:3000/users',
        {
          method: 'POST',
          headers:{
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            nome,
            email,
            password,
            role
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || 'Erro ao realizar cadastro',
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
      Alert.alert('Erro', error.message || 'Falha ao realizar cadastro',
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
          Cadastre-se.
        </Text>

        <Label>Nome</Label>
        <InputContainer>
          <Input
          placeholder="Digite seu nome"
          value={nome}
          onChangeText={setNome}/>
        </InputContainer>

        <Label>E-mail</Label>
        <InputContainer>
          <Input 
          placeholder="nome@instituicao.edu"
          value={email}
          onChangeText={setEmail} />
        </InputContainer>

        <Label>Role</Label>
        <TouchableOpacity onPress={() => setRole('ALUNO')}>
          <Text>Aluno</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setRole('PROFESSOR')}>
          <Text>Professor</Text>
        </TouchableOpacity>
        
        <Label>Senha</Label>
        <InputContainer>
          <Input placeholder="••••••••" 
          // secureTextEntry
          value={password}
          onChangeText={setPassword} />
        </InputContainer>

        <Button onPress={handleCadastro}>
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

        {/* <FooterText>
          Não tem uma conta? <TouchableOpacity onPress={() => router.push('/screens/Cadastro')}>Criar conta</TouchableOpacity>
        </FooterText> */}
      </Card>
    </Container>
    </ScrollView>
  );
}

