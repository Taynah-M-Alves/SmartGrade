import React from 'react';
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
  FooterLink,
  // IconWrapper,
} from './style';

import { Text } from 'react-native';

export default function Login() {
  return (
    <Container>
      <Card>
        <Title>SmartGrade</Title>
        <Subtitle>Bem-vindo</Subtitle>
        <Text style={{ textAlign: 'center', color: '#636E72', marginBottom: 20 }}>
          Acesse sua conta de professor.
        </Text>

        <Label>E-mail</Label>
        <InputContainer>
          <Input placeholder="nome@instituicao.edu" />
        </InputContainer>

        <Label>Senha</Label>
        <InputContainer>
          <Input placeholder="••••••••" secureTextEntry />
        </InputContainer>

        <Button>
          <ButtonText>Entrar</ButtonText>
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
          Não tem uma conta? <FooterLink>Criar conta</FooterLink>
        </FooterText>
      </Card>
    </Container>
  );
}