import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
  Image,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useAuth } from 'hooks/useAuth';

enum Role {
  ALUNO = 'ALUNO',
  PROFESSOR = 'PROFESSOR',
}

export default function Cadastro() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<Role>(Role.ALUNO);
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { signIn } = useAuth();

  async function handleCadastro() {
    if (!name.trim() || !email.trim() || !password.trim()) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos.');
      return;
    }
    if (password.trim().length < 6) {
      Alert.alert('Senha inválida', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email.trim())) {
      Alert.alert('E-mail inválido', 'Digite um e-mail válido.');
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(`${api}users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: name.trim(), email: email.trim().toLowerCase(), password, role }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao realizar cadastro');

      const responseLogin = await fetch(`${api}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const dataLogin = await responseLogin.json();
      if (!responseLogin.ok) throw new Error(dataLogin.message || 'Erro ao realizar login');

      await signIn(dataLogin.user, dataLogin.access_token);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao realizar cadastro');
    } finally {
      setLoading(false);
    }
  }

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {/* TOP GRADIENT */}
      <LinearGradient colors={['#6557E8', '#7C6CF7']} style={styles.topArea}>
        <Image
          source={require('../../assets/logoSemBackground.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        <Text style={styles.appName}>SmartGrade</Text>
      </LinearGradient>

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Criar conta</Text>
          <Text style={styles.cardSubtitle}>Preencha os dados para começar</Text>

          {/* NOME */}
          <Text style={styles.label}>Nome completo</Text>
          <View style={styles.inputRow}>
            <Ionicons name="person-outline" size={18} color="#B0B8C9" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Seu nome"
              placeholderTextColor="#B0B8C9"
              value={name}
              onChangeText={setName}
            />
          </View>

          {/* EMAIL */}
          <Text style={styles.label}>E-mail</Text>
          <View style={styles.inputRow}>
            <Ionicons name="mail-outline" size={18} color="#B0B8C9" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="nome@instituicao.edu"
              placeholderTextColor="#B0B8C9"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          {/* PERFIL */}
          <Text style={styles.label}>Perfil</Text>
          <View style={styles.roleRow}>
            <TouchableOpacity
              style={[styles.roleButton, role === Role.ALUNO && styles.roleButtonActive]}
              onPress={() => setRole(Role.ALUNO)}
              activeOpacity={0.8}
            >
              <Ionicons
                name="school-outline"
                size={18}
                color={role === Role.ALUNO ? '#FFF' : '#8E96A8'}
              />
              <Text style={[styles.roleText, role === Role.ALUNO && styles.roleTextActive]}>
                Aluno
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={[styles.roleButton, role === Role.PROFESSOR && styles.roleButtonActive]}
              onPress={() => setRole(Role.PROFESSOR)}
              activeOpacity={0.8}
            >
              <Ionicons
                name="briefcase-outline"
                size={18}
                color={role === Role.PROFESSOR ? '#FFF' : '#8E96A8'}
              />
              <Text style={[styles.roleText, role === Role.PROFESSOR && styles.roleTextActive]}>
                Professor
              </Text>
            </TouchableOpacity>
          </View>

          {/* SENHA */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#B0B8C9" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="Mínimo 6 caracteres"
              placeholderTextColor="#B0B8C9"
              value={password}
              onChangeText={setPassword}
              secureTextEntry={!showPass}
            />
            <TouchableOpacity onPress={() => setShowPass(!showPass)} style={styles.eyeButton}>
              <Ionicons name={showPass ? 'eye-off-outline' : 'eye-outline'} size={18} color="#B0B8C9" />
            </TouchableOpacity>
          </View>

          {/* BOTÃO */}
          <TouchableOpacity
            style={styles.button}
            activeOpacity={0.85}
            onPress={handleCadastro}
            disabled={loading}
          >
            <LinearGradient
              colors={['#7C6CF7', '#5A4AF4']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              {loading ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Criar conta</Text>
                  <Ionicons name="checkmark-circle" size={18} color="#FFF" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Já tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/login')}>
              <Text style={styles.footerLink}>Entrar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },

  topArea: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 56,
    paddingBottom: 32,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  logo: { width: 80, height: 80 },
  appName: { color: '#FFF', fontSize: 24, fontWeight: '800', marginTop: 8 },

  scrollContent: { flexGrow: 1, paddingHorizontal: 22, paddingTop: 24, paddingBottom: 40 },

  card: {
    backgroundColor: '#FFF',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 6,
  },
  cardTitle: { fontSize: 24, fontWeight: '800', color: '#1D2433' },
  cardSubtitle: { fontSize: 14, color: '#8E96A8', marginTop: 4, marginBottom: 20 },

  label: { fontSize: 12, fontWeight: '700', color: '#8E96A8', marginBottom: 8, marginTop: 14 },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F6FA',
    borderRadius: 14,
    borderWidth: 1,
    borderColor: '#E8E5FF',
    paddingHorizontal: 14,
    paddingVertical: 13,
  },
  inputIcon: { marginRight: 10 },
  input: { flex: 1, fontSize: 14, color: '#1D2433' },
  eyeButton: { padding: 2 },

  roleRow: { flexDirection: 'row', gap: 10 },
  roleButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 13,
    borderRadius: 14,
    backgroundColor: '#F5F6FA',
    borderWidth: 1.5,
    borderColor: '#E8E5FF',
  },
  roleButtonActive: {
    backgroundColor: '#6C5CE7',
    borderColor: '#6C5CE7',
  },
  roleText: { fontSize: 14, fontWeight: '600', color: '#8E96A8' },
  roleTextActive: { color: '#FFF' },

  button: {
    borderRadius: 16,
    overflow: 'hidden',
    marginTop: 28,
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    elevation: 5,
  },
  buttonGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 16,
  },
  buttonText: { color: '#FFF', fontSize: 16, fontWeight: '700' },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  footerText: { color: '#8E96A8', fontSize: 14 },
  footerLink: { color: '#6C5CE7', fontSize: 14, fontWeight: '700' },
});
