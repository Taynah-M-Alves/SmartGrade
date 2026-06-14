import React, { useState } from 'react';
import { router } from 'expo-router';
import {
  View,
  Text,
  Alert,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image
} from 'react-native';

import { styles } from '../../../styles/cadastro.styles';
import PageContainer from 'components/PageContainer';
import { useAuth } from 'hooks/useAuth';

enum Role  {
  ALUNO='ALUNO',
  PROFESSOR='PROFESSOR'
}

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>(Role.ALUNO);
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const api = process.env.EXPO_PUBLIC_BASE_URL
  const {signIn} = useAuth()

async function handleCadastro() {
  try {
    if (
      !name?.trim() ||
      !email?.trim() ||
      !password?.trim() ||
      !role
    ) {
      Alert.alert(
        'Campos obrigatórios',
        'Preencha todos os campos.'
      );
      return;
    }

    if (password.trim().length < 6) {
      Alert.alert(
        'Senha inválida',
        'A senha deve ter pelo menos 6 caracteres.'
      );
      return;
    }

    const emailRegex = /\S+@\S+\.\S+/;

    if (!emailRegex.test(email.trim())) {
      Alert.alert(
        'E-mail inválido',
        'Digite um e-mail válido.'
      );
      return;
    }

    setLoading(true);

    const response = await fetch(`${api}users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        password,
        role,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(
          data.message || 'Erro ao realizar cadastro',
        );
      }

    const responseLogin = await fetch(
  `${api}auth/login`,
  {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email: email.trim().toLowerCase(),
      password: password,
    }),
  }
);

const dataLogin = await responseLogin.json();

if (!responseLogin.ok) {
  throw new Error(
    dataLogin.message || 'Erro ao realizar login'
  );
}

await signIn(
  dataLogin.user,
  dataLogin.access_token
);
    console.log('Resposta cadastro:', data);

    
  } catch (error: any) {
    console.error(error);

    Alert.alert(
      'Erro',
      error.message || 'Falha ao realizar cadastro'
    );
  } finally {
    setLoading(false);
  }
}

  return (
    <PageContainer>
      <View >
        <View style={styles.card}>

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

          <Text style={styles.description}>
            Complete as informações para se tornar um usuário.
          </Text>


          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            placeholder="Digite seu nome"
            value={name}
            onChangeText={setName}
          />

  

          <Text style={styles.label}>E-mail</Text>
          <TextInput
            style={styles.input}
            placeholder="nome@instituicao.edu"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
          />


          <Text style={styles.label}>Perfil</Text>

          <View style={styles.roleContainer}>
            <TouchableOpacity
              style={[
                styles.roleButton,
                role === Role.ALUNO &&
                  styles.roleButtonSelected,
              ]}
              onPress={() => setRole(Role.ALUNO)}
            >
              <Text
                style={[
                  styles.roleText,
                  role === Role.ALUNO &&
                    styles.roleTextSelected,
                ]}
              >
                Aluno
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.roleButton,
                role === Role.PROFESSOR &&
                  styles.roleButtonSelected,
              ]}
              onPress={() => setRole(Role.PROFESSOR)}
            >
              <Text
                style={[
                  styles.roleText,
                  role === Role.PROFESSOR &&
                    styles.roleTextSelected,
                ]}
              >
                Professor
              </Text>
            </TouchableOpacity>
          </View>


          <Text style={styles.label}>Senha</Text>
          <TextInput
            style={styles.input}
            placeholder="sua senha"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
          />

          <TouchableOpacity
            style={styles.button}
            onPress={handleCadastro}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading
                ? 'Cadastrando...'
                : 'Realizar Cadastro'}
            </Text>
          </TouchableOpacity>

        </View>
      </View>
    </PageContainer>
  );
}