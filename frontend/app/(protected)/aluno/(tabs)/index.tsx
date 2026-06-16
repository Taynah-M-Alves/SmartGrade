import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons, Feather } from '@expo/vector-icons';
import { router, useFocusEffect } from 'expo-router';
import { useAuth } from 'hooks/useAuth';

type Activity = {
  id: number;
  title: string;
  description: string;
  code: string;
  deadline: string;
  createdBy: { id: number; name: string; email: string; role: string };
  submissions: any[];
};

type Submission = {
  id: number;
  taskId: number;
  aiGrade: number | null;
  professorGrade: number | null;
  status: string;
  createdAt: string;
  task: Activity;
};

type GamificationProfile = { xp: number; achievements: { badge: string; emoji: string; label: string }[] };

export default function HomeAluno() {
  const [atividades, setAtividades] = useState<Activity[]>([]);
  const [minhasSubmissoes, setMinhasSubmissoes] = useState<Submission[]>([]);
  const [gamification, setGamification] = useState<GamificationProfile | null>(null);
  const [loading, setLoading] = useState(true);

  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { user, token } = useAuth();

  async function loadData() {
    if (!token || !user?.id) return;
    try {
      setLoading(true);
      const [resAtiv, resSubs, resGamif] = await Promise.all([
        fetch(`${api}tasks`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${api}submissions/my`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${api}gamification/profile`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      const dataAtiv = await resAtiv.json();
      const dataSubs = await resSubs.json();
      if (resAtiv.ok) setAtividades(dataAtiv);
      if (resSubs.ok) setMinhasSubmissoes(dataSubs);
      if (resGamif.ok) setGamification(await resGamif.json());
    } catch (error: any) {
      console.error('Erro ao carregar dados:', error.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => { loadData(); }, [token, user?.id]));

  const taskIdsEnviados = new Set(minhasSubmissoes.map((s) => s.taskId));
  const atividadesPendentes = atividades.filter((a) => !taskIdsEnviados.has(a.id));
  const atividadesConcluidas = minhasSubmissoes;

  const firstName = user?.name?.split(' ')[0] ?? '';

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* HEADER GRADIENT */}
        <LinearGradient colors={['#7C6CF7', '#5A4AF4']} style={styles.headerGradient}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.helloText}>Olá, {firstName}! 👋</Text>
              <Text style={styles.headerTitle}>SmartGrade</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>{user?.name?.charAt(0).toUpperCase()}</Text>
            </View>
          </View>

          {/* STATS */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{atividades.length}</Text>
              <Text style={styles.statLabel}>Total</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{atividadesConcluidas.length}</Text>
              <Text style={styles.statLabel}>Enviadas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{atividadesPendentes.length}</Text>
              <Text style={styles.statLabel}>Pendentes</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{gamification?.xp ?? 0}</Text>
              <Text style={styles.statLabel}>XP </Text>
            </View>
          </View>

          {/* BADGES */}
          {gamification && gamification.achievements.length > 0 && (
            <View style={styles.badgesRow}>
              {gamification.achievements.map((a) => (
                <View key={a.badge} style={styles.badgeChip}>
                  <Text style={styles.badgeEmoji}>{a.emoji}</Text>
                  <Text style={styles.badgeLabel}>{a.label}</Text>
                </View>
              ))}
            </View>
          )}
        </LinearGradient>

        {/* PENDENTES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Pendentes</Text>
          {atividadesPendentes.length > 0 && (
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>{atividadesPendentes.length}</Text>
            </View>
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#6C5CE7" style={{ marginTop: 24 }} />
        ) : atividadesPendentes.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="checkmark-done-circle" size={36} color="#2BAE66" />
            <Text style={styles.emptyTitle}>Tudo em dia!</Text>
            <Text style={styles.emptySubtitle}>Nenhuma atividade pendente.</Text>
          </View>
        ) : (
          atividadesPendentes.map((item) => {
            const isPastDue = new Date(item.deadline) < new Date();
            return (
              <TouchableOpacity
                key={item.id}
                style={styles.activityCard}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({ pathname: '/(protected)/aluno/telaEnvio', params: { atividade: JSON.stringify(item) } })
                }
              >
                <View style={[styles.cardIcon, { backgroundColor: '#EDE9FF' }]}>
                  <Feather name="file-text" size={20} color="#6C5CE7" />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.cardSubtitle} numberOfLines={1}>
                    Prof. {item.createdBy?.name ?? '—'}
                  </Text>
                  <View style={styles.deadlineRow}>
                    <Ionicons name="calendar-outline" size={12} color={isPastDue ? '#EF4444' : '#8E96A8'} />
                    <Text style={[styles.deadlineText, isPastDue && styles.deadlineTextRed]}>
                      Entrega: {new Date(item.deadline).toLocaleDateString('pt-BR')}
                    </Text>
                  </View>
                </View>

                <View style={[styles.statusChip, { backgroundColor: '#FFF3DD' }]}>
                  <Text style={[styles.statusChipText, { color: '#FF8A00' }]}>Pendente</Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        {/* ENVIADAS */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Enviadas</Text>
          {atividadesConcluidas.length > 0 && (
            <View style={[styles.sectionBadge, { backgroundColor: '#E8F8ED' }]}>
              <Text style={[styles.sectionBadgeText, { color: '#2BAE66' }]}>{atividadesConcluidas.length}</Text>
            </View>
          )}
        </View>

        {!loading && atividadesConcluidas.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="cloud-upload-outline" size={36} color="#C5C0E8" />
            <Text style={styles.emptyTitle}>Nenhuma entrega ainda</Text>
            <Text style={styles.emptySubtitle}>Envie sua primeira atividade acima.</Text>
          </View>
        ) : (
          atividadesConcluidas.map((sub) => {
            const grade = sub.professorGrade ?? sub.aiGrade;
            const gradeNum = grade != null ? Number(grade) : null;
            const hasGrade = gradeNum != null;
            const gradeColor = !hasGrade ? '#8E96A8' : gradeNum! >= 7 ? '#2BAE66' : gradeNum! >= 5 ? '#FF8C42' : '#EF4444';
            const chipBg = !hasGrade ? '#F0F0F5' : gradeNum! >= 7 ? '#E8F8ED' : gradeNum! >= 5 ? '#FFF3DD' : '#FFF0F0';

            return (
              <TouchableOpacity
                key={sub.id}
                style={styles.activityCard}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({ pathname: '/(protected)/aluno/feedback', params: { id: String(sub.id) } })
                }
              >
                <View style={[styles.cardIcon, { backgroundColor: '#E8F8ED' }]}>
                  <Ionicons name="checkmark-circle" size={20} color="#2BAE66" />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{sub.task?.title}</Text>
                  <Text style={styles.cardSubtitle} numberOfLines={1}>
                    Prof. {sub.task?.createdBy?.name ?? '—'}
                  </Text>
                  <View style={styles.deadlineRow}>
                    <Ionicons name="time-outline" size={12} color="#8E96A8" />
                    <Text style={styles.deadlineText}>
                      {new Date(sub.createdAt).toLocaleDateString('pt-BR')}
                    </Text>
                    {sub.professorGrade != null && (
                      <View style={styles.reviewedBadge}>
                        <Ionicons name="person-circle-outline" size={11} color="#6C5CE7" />
                        <Text style={styles.reviewedText}>Revisado</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={[styles.statusChip, { backgroundColor: chipBg }]}>
                  <Text style={[styles.statusChipText, { color: gradeColor }]}>
                    {hasGrade ? gradeNum!.toFixed(1) : 'Enviado'}
                  </Text>
                </View>
              </TouchableOpacity>
            );
          })
        )}

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F6FA' },
  scrollContent: { paddingBottom: 100 },

  headerGradient: {
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
  helloText: { color: 'rgba(255,255,255,0.8)', fontSize: 15, fontWeight: '500' },
  headerTitle: { color: '#FFF', fontSize: 30, fontWeight: '800', marginTop: 2 },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarLetter: { color: '#FFF', fontSize: 20, fontWeight: '700' },

  statsRow: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 18,
    paddingVertical: 16,
    marginBottom: 12,
  },
  badgesRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginTop: 4,
  },
  badgeChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
  },
  badgeEmoji: { fontSize: 14 },
  badgeLabel: { color: '#FFF', fontSize: 11, fontWeight: '600' },
  statBox: { flex: 1, alignItems: 'center' },
  statDivider: { width: 1, backgroundColor: 'rgba(255,255,255,0.2)' },
  statNumber: { color: '#FFF', fontSize: 26, fontWeight: '800' },
  statLabel: { color: 'rgba(255,255,255,0.75)', fontSize: 12, marginTop: 2 },

  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    marginHorizontal: 22,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: { fontSize: 18, fontWeight: '800', color: '#1D2433' },
  sectionBadge: {
    backgroundColor: '#EDE9FF',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  sectionBadgeText: { color: '#6C5CE7', fontSize: 12, fontWeight: '700' },

  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 18,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIcon: {
    width: 46,
    height: 46,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: '700', color: '#1D2433' },
  cardSubtitle: { fontSize: 13, color: '#8E96A8', marginTop: 2 },
  deadlineRow: { flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 6 },
  deadlineText: { fontSize: 12, color: '#8E96A8' },
  deadlineTextRed: { color: '#EF4444' },
  reviewedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    backgroundColor: '#EDE9FF',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 4,
  },
  reviewedText: { color: '#6C5CE7', fontSize: 10, fontWeight: '700' },

  statusChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginLeft: 8,
  },
  statusChipText: { fontSize: 13, fontWeight: '700' },

  emptyCard: {
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    borderRadius: 18,
    padding: 28,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  emptyTitle: { fontSize: 16, fontWeight: '700', color: '#1D2433', marginTop: 12 },
  emptySubtitle: { fontSize: 13, color: '#8E96A8', marginTop: 4 },
});
