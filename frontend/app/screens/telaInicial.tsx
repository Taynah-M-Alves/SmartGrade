import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TelaInicial() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* FUNDO GRADIENTE */}
      <LinearGradient colors={['#6557E8', '#7C6CF7', '#9B8EFF']} style={styles.gradient}>
        <SafeAreaView style={styles.safeTop}>
          {/* LOGO */}
          <View style={styles.logoArea}>
            <Image
              source={require('../../assets/logoCapelo.png')}
              style={styles.logo}
              resizeMode="contain"
            />
            <Text style={styles.appName}>SmartGrade</Text>
            <Text style={styles.tagline}>Avaliação acadêmica inteligente</Text>
          </View>

          {/* FEATURE PILLS */}
          <View style={styles.pillsRow}>
            <View style={styles.pill}>
              <Ionicons name="sparkles" size={13} color="#FFF" />
              <Text style={styles.pillText}>IA Generativa</Text>
            </View>
            <View style={styles.pill}>
              <Ionicons name="shield-checkmark" size={13} color="#FFF" />
              <Text style={styles.pillText}>Feedback Preciso</Text>
            </View>
            <View style={styles.pill}>
              <Ionicons name="flash" size={13} color="#FFF" />
              <Text style={styles.pillText}>Resultado Rápido</Text>
            </View>
          </View>
        </SafeAreaView>
      </LinearGradient>

      {/* CARD INFERIOR */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Bem-vindo de volta</Text>
        <Text style={styles.cardSubtitle}>
          Feedback que transforma aprendizado em evolução.
        </Text>

        {/* ENTRAR */}
        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.85}
          onPress={() => router.replace('/auth/login')}
        >
          <LinearGradient
            colors={['#7C6CF7', '#5A4AF4']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.primaryButtonGradient}
          >
            <Text style={styles.primaryButtonText}>Entrar</Text>
            <Ionicons name="arrow-forward" size={18} color="#FFF" />
          </LinearGradient>
        </TouchableOpacity>

        {/* DIVIDER */}
        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>NOVO NO SMARTGRADE?</Text>
          <View style={styles.dividerLine} />
        </View>

        {/* CRIAR CONTA */}
        <TouchableOpacity
          style={styles.secondaryButton}
          activeOpacity={0.8}
          onPress={() => router.navigate('/auth/cadastro')}
        >
          <Text style={styles.secondaryButtonText}>Criar conta grátis</Text>
        </TouchableOpacity>

        <Text style={styles.terms}>
          Ao acessar, você concorda com nossos Termos de Serviço e Política de Integridade Acadêmica.
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },

  gradient: {
    flex: 0.52,
    borderBottomLeftRadius: 36,
    borderBottomRightRadius: 36,
  },
  safeTop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  logoArea: {
    alignItems: 'center',
    marginBottom: 24,
  },
  logo: {
    width: 130,
    height: 130,
  },
  appName: {
    color: '#FFF',
    fontSize: 34,
    fontWeight: '800',
    marginTop: 4,
    letterSpacing: 0.5,
  },
  tagline: {
    color: 'rgba(255,255,255,0.75)',
    fontSize: 14,
    marginTop: 4,
  },

  pillsRow: {
    flexDirection: 'row',
    gap: 8,
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  pill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
    backgroundColor: 'rgba(255,255,255,0.18)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  pillText: { color: '#FFF', fontSize: 12, fontWeight: '600' },

  card: {
    flex: 0.48,
    paddingHorizontal: 28,
    paddingTop: 28,
    paddingBottom: 20,
    justifyContent: 'center',
  },
  cardTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: '#1D2433',
    marginBottom: 6,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#8E96A8',
    lineHeight: 21,
    marginBottom: 24,
  },

  primaryButton: {
    borderRadius: 18,
    overflow: 'hidden',
    shadowColor: '#6C5CE7',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 6,
  },
  primaryButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 17,
  },
  primaryButtonText: { color: '#FFF', fontSize: 17, fontWeight: '700' },

  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
    gap: 10,
  },
  dividerLine: { flex: 1, height: 1, backgroundColor: '#E8E8EE' },
  dividerText: { color: '#B0B8C9', fontSize: 10, fontWeight: '700', letterSpacing: 1 },

  secondaryButton: {
    borderWidth: 1.5,
    borderColor: '#6C5CE7',
    borderRadius: 18,
    paddingVertical: 15,
    alignItems: 'center',
  },
  secondaryButtonText: { color: '#6C5CE7', fontSize: 16, fontWeight: '700' },

  terms: {
    textAlign: 'center',
    marginTop: 16,
    color: '#B0B8C9',
    fontSize: 11,
    lineHeight: 17,
  },
});
