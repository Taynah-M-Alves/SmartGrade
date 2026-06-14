import React from 'react';
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Feather';

import { useState, useEffect } from 'react';
import { router } from 'expo-router';

import { styles } from '../../../../styles/homeAluno.style';
import { useAuth } from 'hooks/useAuth';

const activitiesPending = [
  {
    id: '1',
    title: 'Entrega documentação',
    subject: 'Projeto Integrador',
    deadline: 'Entrega até 26/06/2026',
    // Adicionei essas informações extras para a TelaEnvio ficar completa:
    professor: 'João Silva',
    valor: '8,5 pontos',
    descricao: 'Nesta atividade, você deve entregar toda a documentação solicitada. Certifique-se de seguir o modelo disponibilizado.'
  },
  {
    id: '2',
    title: 'Relatório de pesquisa',
    subject: 'Metodologia da Pesquisa',
    deadline: 'Entrega até 28/06/2026',
    professor: 'Ana Costa',
    valor: '10 pontos',
    descricao: 'Elabore um relatório detalhado sobre os métodos de pesquisa aplicados durante o semestre.'
  },
  {
    id: '3',
    title: 'Apresentação em vídeo',
    subject: 'Comunicação e Oratória',
    deadline: 'Entrega até 01/07/2026',
    professor: 'Carlos Mendes',
    valor: '5 pontos',
    descricao: 'Grave um vídeo de no máximo 5 minutos aplicando as técnicas de oratória ensinadas na aula 4.'
  },
];

const activitiesCompleted = [
  {
    id: '4',
    title: 'Leitura crítica do artigo',
    subject: 'Estudos Avançados',
    date: 'Enviado em 10/06/2026',
  },
];

export default function HomeAluno() {

  const api = process.env.EXPO_PUBLIC_BASE_URL;

  const { user, token } = useAuth() 

  const [atividades, setAtividades] = useState([]);
    
      async function findAtividades() {
        try {
          const response = await fetch(`${api}tasks`, {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
    
          const data = await response.json();
    
          if (!response.ok) {
            throw new Error(
              data.message || "Erro ao buscar atividades"
            );
          }
        setAtividades(data);

        } catch (error: any) {
          alert(error.message);
        }
      }
    
      useEffect(() => {
      if (token && user?.id) {
        findAtividades();
  
        console.log("atividadesEffect", atividades)
      }
    }, [token, user]);


  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* HEADER */}
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.hello}>Olá, {user?.name}! 👋</Text>

            <Text style={styles.title}>
              Bem-vindo ao{'\n'}SmartGrade
            </Text>

            <Text style={styles.subtitle}>
              Acompanhe suas atividades, envie entregas e receba feedbacks.
            </Text>
          </View>

          {/* <Image
            source={{
              uri: 'https://i.pravatar.cc/300',
            }}
            style={styles.avatar}
          /> */}
        </View>

        {/* VISÃO GERAL */}
        <LinearGradient
          colors={['#7B61FF', '#5A4AF4']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.overviewCard}
        >
          <View style={styles.overviewHeader}>
            <Icon
              name="bar-chart-2"
              size={22}
              color="#FFF"
            />

            <Text style={styles.overviewTitle}>
              Visão Geral
            </Text>
          </View>

          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Atividades</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>5</Text>
              <Text style={styles.statLabel}>Concluídas</Text>
            </View>

            <View style={styles.statBox}>
              <Text style={styles.statNumber}>7</Text>
              <Text style={styles.statLabel}>Pendentes</Text>
            </View>
          </View>
        </LinearGradient>

        {/* PENDENTES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Atividades pendentes
          </Text>

          {/* <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity> */}
        </View>

        {activitiesPending.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.activityCard}
            // 2. ADICIONAMOS A AÇÃO DE CLIQUE AQUI:
            onPress={() => {
              router.push({
                pathname: '/(protected)/aluno/TelaEnvio',
                params: {
                  titulo: item.title,
                  disciplina: item.subject,
                  dataEntrega: item.deadline,
                  professor: item.professor,
                  valor: item.valor,
                  descricao: item.descricao,
                }
              });
            }}
          >
            <View style={styles.activityIcon}>
              <Icon
                name="file-text"
                size={20}
                color="#6D5DF6"
              />
            </View>

            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>
                {item.title}
              </Text>

              <Text style={styles.activitySubject}>
                {item.subject}
              </Text>

              <Text style={styles.deadline}>
                {item.deadline}
              </Text>
            </View>

            <View style={styles.statusPending}>
              <Text style={styles.statusPendingText}>
                Pendente
              </Text>
            </View>
          </TouchableOpacity>
        ))}

        {  atividades.map((item: any) => (<Text>{item.title}</Text>))}

        {/* CONCLUÍDAS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Atividades concluídas
          </Text>

          {/* <TouchableOpacity>
            <Text style={styles.seeAll}>Ver todas</Text>
          </TouchableOpacity> */}
        </View>

        {activitiesCompleted.map(item => (
          <TouchableOpacity
            key={item.id}
            style={styles.activityCard}
          >
            <View style={styles.activityIconSuccess}>
              <Icon
                name="check"
                size={20}
                color="#34C759"
              />
            </View>

            <View style={styles.activityInfo}>
              <Text style={styles.activityTitle}>
                {item.title}
              </Text>

              <Text style={styles.activitySubject}>
                {item.subject}
              </Text>

              <Text style={styles.completedDate}>
                {item.date}
              </Text>
            </View>

            <View style={styles.statusSuccess}>
              <Text style={styles.statusSuccessText}>
                Concluída
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}