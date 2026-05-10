import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import styles from './Styles';

function TelaLogin({ navigation }) {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Text style={styles.titulo}>Fazer login</Text>

        <Text style={styles.label}>E-mail</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite seu e-mail"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Digite sua senha"
          placeholderTextColor="#999"
          secureTextEntry
          value={senha}
          onChangeText={setSenha}
        />

        <TouchableOpacity onPress={() => navigation && navigation.navigate('EsqueceuSenha')}>
          <Text style={styles.link}>Esqueceu sua senha?</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.botaoLogin}>
          <Text style={styles.textoBotaoLogin}>Entrar</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.botaoCadastro}>
        <Text style={styles.textoBotaoCadastro}>Criar sua conta</Text>
      </TouchableOpacity>
    </View>
  );
}

export default TelaLogin;
