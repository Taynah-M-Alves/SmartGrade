import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';

import { styles } from './styles';

import { router } from 'expo-router';

export default function AuthScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Logo */}
        <View style={styles.logoContainer}>
          <View style={styles.logoBox}>
            <Text style={styles.logoIcon}>🎓</Text>
          </View>

          <Text style={styles.logoText}>SmartGrade</Text>
        </View>

        {/* Hero */}
        <View style={styles.hero}>
          <Text style={styles.title}>
            Feedback que transforma aprendizado em
          </Text>

          <Text style={styles.titleGradient}> evolução</Text>

          <Text style={styles.description}>
            Experimente a próxima geração de avaliação acadêmica.
            Insights baseados em IA combinados com precisão
            pedagógica.
          </Text>
        </View>

        {/* Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Bem-vindo de volta
          </Text>

          <Text style={styles.cardSubtitle}>
            Selecione seu portal para continuar
          </Text>

          <TouchableOpacity activeOpacity={0.8} onPress={() => router.push('/screens/Login')}>
            <LinearGradient
              colors={['#3457D5', '#8B3FB3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
              
            >
              <View style={styles.loginIcon}>
                <Text style={styles.iconText}>⚙</Text>
              </View>

              
              <Text style={styles.loginText}>
                Entrar
              </Text>

              <Text style={styles.arrow}>
                →
              </Text>
            </LinearGradient>
          </TouchableOpacity>

          {/* Divider */}
          <View style={styles.dividerContainer}>
            <View style={styles.line} />

            <Text style={styles.dividerText}>
              NOVO NO SMARTGRADE?
            </Text>

            <View style={styles.line} />
          </View>

          <TouchableOpacity>
            <Text style={styles.signupText}>
              Criar conta ↗
            </Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            Ao acessar o SmartGrade, você concorda com nossos
            Termos de Serviço e Política de Integridade Acadêmica.
          </Text>

          <TouchableOpacity style={styles.helpContainer}>
            <Text style={styles.helpIcon}>ⓘ</Text>

            <Text style={styles.helpText}>
              Precisa de ajuda com seu login?
            </Text>
          </TouchableOpacity>

          <View style={styles.stores}>
            <TouchableOpacity style={styles.storeButton}>
              <Text style={styles.storeText}>
                APP STORE
              </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.storeButton}>
              <Text style={styles.storeText}>
                GOOGLE PLAY
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}