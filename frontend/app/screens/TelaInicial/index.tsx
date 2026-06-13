import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import Entypo from '@expo/vector-icons/Entypo';

import { SafeAreaView } from 'react-native-safe-area-context'

import { LinearGradient } from 'expo-linear-gradient';

import { styles } from '../../../styles/telaInicial.styles';

import { router } from 'expo-router';

import PageContainer from "../../../components/PageContainer";

export default function AuthScreen() {
  return (
    <PageContainer>
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

          <TouchableOpacity activeOpacity={0.8} onPress={() => router.replace('/auth/Login')}>
            <LinearGradient
              colors={['#3457D5', '#8B3FB3']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.loginButton}
              
            >
              {/* <View style={styles.loginIcon}>
                <Entypo name="login" size={24} color="black" />
                <Text style={styles.iconText}></Text>
              </View> */}

              
              <Text style={styles.loginText}>
                Entrar
              </Text>

              {/* <Text style={styles.arrow}>
                →
              </Text> */}
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

          <TouchableOpacity
          onPress={() => router.push('/auth/Cadastro')}>
            <Text style={styles.signupText}>
              Criar conta 
            </Text>
          </TouchableOpacity>

          <Text style={styles.terms}>
            Ao acessar o SmartGrade, você concorda com nossos
            Termos de Serviço e Política de Integridade Acadêmica.
          </Text>

        </View>
      </ScrollView>
    </SafeAreaView>
    </PageContainer>
    
  );
}