import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useCallback } from "react";
import { useLocalSearchParams, router, useFocusEffect } from "expo-router";
import { useAuth } from "hooks/useAuth";

export default function Task() {
  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { token } = useAuth();

  const { task } = useLocalSearchParams();
  const atividade = JSON.parse(task as string);

  const [submissions, setSubmissions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function findSubmissions() {
    try {
      setLoading(true);
      const response = await fetch(`${api}submissions/task/${atividade.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro ao buscar submissions");
      setSubmissions(data);
    } catch (error: any) {
      Alert.alert("Erro", error.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(useCallback(() => { findSubmissions(); }, [token]));

  const avaliadas = submissions.filter((s) => s.aiGrade != null);
  const pendentes = submissions.filter((s) => s.aiGrade == null);
  const progresso = submissions.length > 0 ? Math.round((avaliadas.length / submissions.length) * 100) : 0;
  const isDeadlinePast = new Date(atividade.deadline) < new Date();
  const criterios: any[] = atividade.criteria ?? [];

  return (
    <View style={styles.container}>
      {/* HEADER GRADIENT */}
      <LinearGradient colors={["#7C6CF7", "#5A4AF4"]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerLabel}>ATIVIDADE</Text>
          <Text style={styles.headerTitle} numberOfLines={2}>{atividade.title}</Text>
          <Text style={styles.headerDesc} numberOfLines={2}>{atividade.description}</Text>

          <View style={styles.headerMeta}>
            <View style={styles.metaChip}>
              <Ionicons name="key-outline" size={11} color="rgba(255,255,255,0.8)" />
              <Text style={styles.metaChipText}>{atividade.code}</Text>
            </View>
            <View style={[styles.metaChip, isDeadlinePast && styles.metaChipRed]}>
              <Ionicons name="calendar-outline" size={11} color={isDeadlinePast ? "#FFB3B3" : "rgba(255,255,255,0.8)"} />
              <Text style={[styles.metaChipText, isDeadlinePast && styles.metaChipTextRed]}>
                {new Date(atividade.deadline).toLocaleDateString("pt-BR")}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>

        {/* STATS */}
        <View style={styles.statsRow}>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#EDE9FF" }]}>
              <Ionicons name="cloud-upload-outline" size={18} color="#6C5CE7" />
            </View>
            <Text style={styles.statNumber}>{submissions.length}</Text>
            <Text style={styles.statLabel}>Entregas</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#E8F8ED" }]}>
              <Ionicons name="sparkles-outline" size={18} color="#2BAE66" />
            </View>
            <Text style={styles.statNumber}>{avaliadas.length}</Text>
            <Text style={styles.statLabel}>Avaliadas</Text>
          </View>
          <View style={styles.statCard}>
            <View style={[styles.statIcon, { backgroundColor: "#FFF3DD" }]}>
              <Ionicons name="time-outline" size={18} color="#FF8C42" />
            </View>
            <Text style={styles.statNumber}>{pendentes.length}</Text>
            <Text style={styles.statLabel}>Pendentes</Text>
          </View>
        </View>

        {/* PROGRESSO */}
        {submissions.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="bar-chart-outline" size={17} color="#6C5CE7" />
              <Text style={styles.cardTitle}>Progresso das avaliações</Text>
              <Text style={styles.progressPct}>{progresso}%</Text>
            </View>
            <View style={styles.progressBg}>
              <View style={[styles.progressFill, { width: `${progresso}%` as any }]} />
            </View>
            <Text style={styles.progressLabel}>
              {avaliadas.length} de {submissions.length} avaliações concluídas pela IA
            </Text>
          </View>
        )}

        {/* CRITÉRIOS */}
        {criterios.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="list-circle-outline" size={17} color="#6C5CE7" />
              <Text style={styles.cardTitle}>Critérios de avaliação</Text>
              <View style={styles.criterioCount}>
                <Text style={styles.criterioCountText}>{criterios.length}</Text>
              </View>
            </View>

            {criterios.map((c: any, i: number) => (
              <View key={c.id} style={[styles.criterioItem, i > 0 && styles.criterioDivider]}>
                <View style={styles.criterioHeaderRow}>
                  <View style={styles.criterioNumBadge}>
                    <Text style={styles.criterioNum}>{i + 1}</Text>
                  </View>
                  <Text style={styles.criterioTitle} numberOfLines={1}>{c.title}</Text>
                  <View style={styles.pesoChip}>
                    <Text style={styles.pesoText}>Peso {c.weight}</Text>
                  </View>
                </View>
                <Text style={styles.criterioDesc}>{c.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* SUBMISSÕES */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Entregas dos alunos</Text>
          {submissions.length > 0 && (
            <View style={styles.sectionBadge}>
              <Text style={styles.sectionBadgeText}>{submissions.length}</Text>
            </View>
          )}
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#6C5CE7" style={{ marginTop: 32 }} />
        ) : submissions.length === 0 ? (
          <View style={styles.emptyCard}>
            <Ionicons name="document-outline" size={44} color="#D1C8FF" />
            <Text style={styles.emptyTitle}>Nenhuma entrega ainda</Text>
            <Text style={styles.emptySubtitle}>Os alunos ainda não enviaram nenhum arquivo.</Text>
          </View>
        ) : (
          submissions.map((sub: any) => {
            const grade = sub.professorGrade ?? sub.aiGrade;
            const hasGrade = grade != null;
            const gradeNum = hasGrade ? Number(grade) : null;
            const isRevisado = sub.professorGrade != null;
            const chipColor = !hasGrade ? "#8E96A8" : gradeNum! >= 7 ? "#2BAE66" : gradeNum! >= 5 ? "#FF8C42" : "#EF4444";
            const chipBg = !hasGrade ? "#F0F0F5" : gradeNum! >= 7 ? "#E8F8ED" : gradeNum! >= 5 ? "#FFF3DD" : "#FFF0F0";

            return (
              <TouchableOpacity
                key={sub.id}
                style={styles.submissionCard}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({ pathname: "/(protected)/professor/feedback", params: { id: String(sub.id) } })
                }
              >
                <View style={styles.subAvatar}>
                  <Text style={styles.subAvatarText}>{sub.user?.name?.charAt(0).toUpperCase()}</Text>
                </View>

                <View style={styles.subContent}>
                  <Text style={styles.subName}>{sub.user?.name}</Text>
                  <View style={styles.subMeta}>
                    <Ionicons name="time-outline" size={11} color="#8E96A8" />
                    <Text style={styles.subDate}>
                      {new Date(sub.createdAt).toLocaleDateString("pt-BR")}
                    </Text>
                    {isRevisado && (
                      <View style={styles.revisadoBadge}>
                        <Ionicons name="person-circle-outline" size={11} color="#6C5CE7" />
                        <Text style={styles.revisadoText}>Revisado</Text>
                      </View>
                    )}
                  </View>
                </View>

                <View style={[styles.gradeChip, { backgroundColor: chipBg }]}>
                  <Text style={[styles.gradeChipText, { color: chipColor }]}>
                    {hasGrade ? gradeNum!.toFixed(1) : "Pendente"}
                  </Text>
                </View>

                <Ionicons name="chevron-forward" size={16} color="#C5C0E8" style={{ marginLeft: 6 }} />
              </TouchableOpacity>
            );
          })
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },

  header: {
    paddingTop: 52,
    paddingHorizontal: 20,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
    flexDirection: "row",
    alignItems: "flex-start",
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  headerContent: { flex: 1 },
  headerLabel: { color: "rgba(255,255,255,0.7)", fontSize: 10, fontWeight: "700", letterSpacing: 1.2 },
  headerTitle: { color: "#FFF", fontSize: 22, fontWeight: "800", marginTop: 4, lineHeight: 28 },
  headerDesc: { color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 4 },
  headerMeta: { flexDirection: "row", gap: 8, marginTop: 12 },
  metaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "rgba(255,255,255,0.2)",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  metaChipRed: { backgroundColor: "rgba(239,68,68,0.25)" },
  metaChipText: { color: "rgba(255,255,255,0.9)", fontSize: 11, fontWeight: "600" },
  metaChipTextRed: { color: "#FFB3B3" },

  scrollContent: { padding: 16, paddingBottom: 40 },

  statsRow: { flexDirection: "row", gap: 10, marginBottom: 14 },
  statCard: {
    flex: 1,
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 14,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  statIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statNumber: { fontSize: 24, fontWeight: "800", color: "#1D2433" },
  statLabel: { fontSize: 11, color: "#8E96A8", marginTop: 2 },

  card: {
    backgroundColor: "#FFF",
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 14 },
  cardTitle: { flex: 1, fontSize: 15, fontWeight: "700", color: "#1D2433" },

  progressPct: { fontSize: 15, fontWeight: "800", color: "#6C5CE7" },
  progressBg: { height: 8, backgroundColor: "#ECECEC", borderRadius: 999, overflow: "hidden" },
  progressFill: { height: 8, backgroundColor: "#6C5CE7", borderRadius: 999 },
  progressLabel: { marginTop: 10, fontSize: 12, color: "#8E96A8" },

  criterioCount: {
    backgroundColor: "#EDE9FF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 20,
  },
  criterioCountText: { color: "#6C5CE7", fontSize: 12, fontWeight: "700" },
  criterioItem: { paddingTop: 14 },
  criterioDivider: { borderTopWidth: 1, borderTopColor: "#F0F0F8", marginTop: 14 },
  criterioHeaderRow: { flexDirection: "row", alignItems: "center", gap: 8, marginBottom: 6 },
  criterioNumBadge: {
    width: 22,
    height: 22,
    borderRadius: 6,
    backgroundColor: "#EDE9FF",
    justifyContent: "center",
    alignItems: "center",
  },
  criterioNum: { color: "#6C5CE7", fontSize: 11, fontWeight: "800" },
  criterioTitle: { flex: 1, fontSize: 14, fontWeight: "700", color: "#1D2433" },
  pesoChip: {
    backgroundColor: "#F0EEFF",
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  pesoText: { color: "#6C5CE7", fontSize: 11, fontWeight: "700" },
  criterioDesc: { fontSize: 13, color: "#6A6A8A", lineHeight: 20 },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
    marginTop: 4,
  },
  sectionTitle: { fontSize: 17, fontWeight: "800", color: "#1D2433" },
  sectionBadge: {
    backgroundColor: "#EDE9FF",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },
  sectionBadgeText: { color: "#6C5CE7", fontSize: 12, fontWeight: "700" },

  submissionCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 14,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
  },
  subAvatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "#EDE9FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  subAvatarText: { color: "#6C5CE7", fontSize: 18, fontWeight: "800" },
  subContent: { flex: 1 },
  subName: { fontSize: 15, fontWeight: "700", color: "#1D2433" },
  subMeta: { flexDirection: "row", alignItems: "center", gap: 4, marginTop: 4 },
  subDate: { fontSize: 12, color: "#8E96A8" },
  revisadoBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2,
    backgroundColor: "#EDE9FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginLeft: 4,
  },
  revisadoText: { color: "#6C5CE7", fontSize: 10, fontWeight: "700" },
  gradeChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  gradeChipText: { fontSize: 14, fontWeight: "700" },

  emptyCard: {
    alignItems: "center",
    backgroundColor: "#FFF",
    borderRadius: 18,
    padding: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 8,
    elevation: 1,
  },
  emptyTitle: { fontSize: 16, fontWeight: "700", color: "#1D2433", marginTop: 14 },
  emptySubtitle: { fontSize: 13, color: "#8E96A8", marginTop: 4, textAlign: "center" },
});
