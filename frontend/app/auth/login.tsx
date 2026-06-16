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

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { signIn } = useAuth();

  async function handleLogin() {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Atenção', 'Preencha e-mail e senha.');
      return;
    }
    try {
      setLoading(true);
      const response = await fetch(`${api}auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim().toLowerCase(), password }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Erro ao realizar login');
      signIn(data.user, data.access_token);
    } catch (error: any) {
      Alert.alert('Erro', error.message || 'Falha ao realizar login');
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

      {/* FORM CARD */}
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Entrar</Text>
          <Text style={styles.cardSubtitle}>Acesse sua conta para continuar</Text>

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

          {/* SENHA */}
          <Text style={styles.label}>Senha</Text>
          <View style={styles.inputRow}>
            <Ionicons name="lock-closed-outline" size={18} color="#B0B8C9" style={styles.inputIcon} />
            <TextInput
              style={styles.input}
              placeholder="••••••••"
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
            onPress={handleLogin}
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
                  <Text style={styles.buttonText}>Entrar</Text>
                  <Ionicons name="arrow-forward" size={18} color="#FFF" />
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>

          {/* RODAPÉ */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>Não tem uma conta? </Text>
            <TouchableOpacity onPress={() => router.push('/auth/cadastro')}>
              <Text style={styles.footerLink}>Criar conta</Text>
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
    paddingTop: 60,
    paddingBottom: 40,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  logo: { width: 90, height: 90 },
  appName: { color: '#FFF', fontSize: 26, fontWeight: '800', marginTop: 8 },

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
  cardSubtitle: { fontSize: 14, color: '#8E96A8', marginTop: 4, marginBottom: 24 },

  label: { fontSize: 12, fontWeight: '700', color: '#8E96A8', marginBottom: 8, marginTop: 12 },
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
