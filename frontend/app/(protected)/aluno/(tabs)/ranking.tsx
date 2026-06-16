import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useFocusEffect } from 'expo-router';
import { useAuth } from 'hooks/useAuth';

type RankingEntry = {
  position: number;
  id: number;
  name: string;
  xp: number;
};

type Profile = {
  id: number;
  name: string;
  xp: number;
  achievements: { badge: string; emoji: string; label: string; description: string; earnedAt: string }[];
};

export default function RankingScreen() {
  const [ranking, setRanking] = useState<RankingEntry[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { token, user } = useAuth();

  async function loadData() {
    if (!token) return;
    try {
      setLoading(true);
      const [resRanking, resProfile] = await Promise.all([
        fetch(`${api}gamification/ranking`, { headers: { Authorization: `Bearer ${token}` } }),
        fetch(`${api}gamification/profile`, { headers: { Authorization: `Bearer ${token}` } }),
      ]);
      if (resRanking.ok) setRanking(await resRanking.json());
      if (resProfile.ok) setProfile(await resProfile.json());
    } catch (err: any) {
      console.error('Erro ao carregar ranking:', err.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => { loadData(); }, [token]));

  const myEntry = ranking.find((r) => r.id === user?.id);

  const medalColors: Record<number, string> = { 1: '#FFD700', 2: '#C0C0C0', 3: '#CD7F32' };
  const medalIcons: Record<number, string> = { 1: 'trophy', 2: 'medal', 3: 'ribbon' };

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* HEADER */}
        <LinearGradient colors={['#7C6CF7', '#5A4AF4']} style={styles.header}>
          <Text style={styles.headerTitle}>Ranking</Text>
          <Text style={styles.headerSubtitle}>Classificação dos alunos por XP</Text>

          {/* MINHA POSIÇÃO */}
          {myEntry && (
            <View style={styles.myPositionCard}>
              <View style={styles.myPositionLeft}>
                <Text style={styles.myPositionLabel}>Minha posição</Text>
                <Text style={styles.myPositionRank}>#{myEntry.position}</Text>
              </View>
              <View style={styles.myPositionRight}>
                <Text style={styles.myPositionXp}>{profile?.xp ?? myEntry.xp} XP</Text>
                {profile && profile.achievements.length > 0 && (
                  <View style={styles.badgesRow}>
                    {profile.achievements.slice(0, 4).map((a) => (
                      <Text key={a.badge} style={styles.badgeEmoji}>{a.emoji}</Text>
                    ))}
                    {profile.achievements.length > 4 && (
                      <Text style={styles.moreBadges}>+{profile.achievements.length - 4}</Text>
                    )}
                  </View>
                )}
              </View>
            </View>
          )}
        </LinearGradient>

        {/* CONQUISTAS */}
        {profile && profile.achievements.length > 0 && (
          <>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Suas conquistas</Text>
              <View style={styles.sectionBadge}>
                <Text style={styles.sectionBadgeText}>{profile.achievements.length}</Text>
              </View>
            </View>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.achievementsScroll}>
              {profile.achievements.map((a) => (
                <View key={a.badge} style={styles.achievementCard}>
                  <Text style={styles.achievementEmoji}>{a.emoji}</Text>
                  <Text style={styles.achievementLabel}>{a.label}</Text>
                  <Text style={styles.achievementDesc}>{a.description}</Text>
                </View>
              ))}
            </ScrollView>
          </>
        )}

        {/* LISTA RANKING */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Classificação</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#6C5CE7" style={{ marginTop: 24 }} />
        ) : ranking.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="trophy-outline" size={36} color="#C5C0E8" />
            <Text style={styles.emptyTitle}>Nenhum dado ainda</Text>
            <Text style={styles.emptySubtitle}>Envie atividades para aparecer no ranking.</Text>
          </View>
        ) : (
          ranking.map((entry) => {
            const isMe = entry.id === user?.id;
            const medal = medalColors[entry.position];
            return (
              <View
                key={entry.id}
                style={[styles.rankCard, isMe && styles.rankCardMe]}
              >
                <View style={[styles.positionBadge, medal ? { backgroundColor: medal + '22' } : null]}>
                  {entry.position <= 3 ? (
                    <Ionicons
                      name={medalIcons[entry.position] as any}
                      size={18}
                      color={medal}
                    />
                  ) : (
                    <Text style={styles.positionText}>{entry.position}</Text>
                  )}
                </View>

                <View style={styles.rankInfo}>
                  <Text style={[styles.rankName, isMe && styles.rankNameMe]} numberOfLines={1}>
                    {entry.name}{isMe ? ' (você)' : ''}
                  </Text>
                </View>

                <View style={[styles.xpChip, isMe && styles.xpChipMe]}>
                  <Text style={[styles.xpChipText, isMe && styles.xpChipTextMe]}>
                    {entry.xp} XP
                  </Text>
                </View>
              </View>
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

  header: {
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: { color: '#FFF', fontSize: 30, fontWeight: '800' },
  headerSubtitle: { color: 'rgba(255,255,255,0.75)', fontSize: 14, marginTop: 4, marginBottom: 20 },

  myPositionCard: {
    backgroundColor: 'rgba(255,255,255,0.18)',
    borderRadius: 18,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  myPositionLeft: {},
  myPositionLabel: { color: 'rgba(255,255,255,0.8)', fontSize: 12, fontWeight: '500' },
  myPositionRank: { color: '#FFF', fontSize: 32, fontWeight: '900', marginTop: 2 },
  myPositionRight: { alignItems: 'flex-end' },
  myPositionXp: { color: '#FFF', fontSize: 22, fontWeight: '800' },
  badgesRow: { flexDirection: 'row', alignItems: 'center', marginTop: 6, gap: 2 },
  badgeEmoji: { fontSize: 18 },
  moreBadges: { color: 'rgba(255,255,255,0.8)', fontSize: 13, fontWeight: '700', marginLeft: 4 },

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

  achievementsScroll: { paddingHorizontal: 20, gap: 12 },
  achievementCard: {
    backgroundColor: '#FFF',
    borderRadius: 18,
    padding: 16,
    width: 130,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementEmoji: { fontSize: 32, marginBottom: 8 },
  achievementLabel: { fontSize: 13, fontWeight: '700', color: '#1D2433', textAlign: 'center' },
  achievementDesc: { fontSize: 11, color: '#8E96A8', marginTop: 4, textAlign: 'center' },

  rankCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 16,
    padding: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 1,
  },
  rankCardMe: {
    borderWidth: 2,
    borderColor: '#6C5CE7',
    backgroundColor: '#F5F3FF',
  },
  positionBadge: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#F5F6FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  positionText: { fontSize: 16, fontWeight: '800', color: '#8E96A8' },
  rankInfo: { flex: 1 },
  rankName: { fontSize: 15, fontWeight: '700', color: '#1D2433' },
  rankNameMe: { color: '#6C5CE7' },
  xpChip: {
    backgroundColor: '#F0EEFF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  xpChipMe: { backgroundColor: '#6C5CE7' },
  xpChipText: { fontSize: 13, fontWeight: '700', color: '#6C5CE7' },
  xpChipTextMe: { color: '#FFF' },

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
