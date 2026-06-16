import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";

import { Ionicons, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useState, useCallback } from "react";
import { useAuth } from "hooks/useAuth";

export default function ProfessorHome() {
  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { user, token } = useAuth();

  const [atividades, setAtividades] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  async function findAtividades() {
    try {
      setLoading(true);
      const response = await fetch(`${api}tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message);
      setAtividades(data.filter((a: any) => Number(a.createdById) === Number(user?.id)));
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      if (token && user?.id) findAtividades();
    }, [token, user?.id])
  );

  const totalSubmissoes = atividades.reduce((acc, a) => acc + (a.submissions?.length ?? 0), 0);
  const feedbacksGerados = atividades.reduce(
    (acc, a) => acc + (a.submissions?.filter((s: any) => s.aiGrade != null).length ?? 0),
    0
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>

        {/* HEADER GRADIENT */}
        <LinearGradient colors={["#7C6CF7", "#5A4AF4"]} style={styles.headerGradient}>
          <View style={styles.headerTop}>
            <View>
              <Text style={styles.welcomeLabel}>BEM-VINDO(A) DE VOLTA 👋</Text>
              <Text style={styles.headerName}>{user?.name?.split(" ")[0]}</Text>
            </View>
            <View style={styles.avatarCircle}>
              <Text style={styles.avatarLetter}>
                {user?.name?.charAt(0).toUpperCase()}
              </Text>
            </View>
          </View>

          {/* STATS INLINE */}
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{atividades.length}</Text>
              <Text style={styles.statLabel}>Atividades</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{totalSubmissoes}</Text>
              <Text style={styles.statLabel}>Entregas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{feedbacksGerados}</Text>
              <Text style={styles.statLabel}>IA Feedbacks</Text>
            </View>
          </View>
        </LinearGradient>

        {/* QUICK ACTION */}
        <TouchableOpacity
          style={styles.createButton}
          activeOpacity={0.85}
          onPress={() => router.push("(protected)/professor/(tabs)/criarAtividade")}
        >
          <View style={styles.createButtonIcon}>
            <Ionicons name="add" size={22} color="#6C5CE7" />
          </View>
          <Text style={styles.createButtonText}>Nova Atividade</Text>
          <Ionicons name="chevron-forward" size={18} color="#6C5CE7" />
        </TouchableOpacity>

        {/* LIST */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Minhas Atividades</Text>
          <Text style={styles.sectionCount}>{atividades.length}</Text>
        </View>

        {loading ? (
          <ActivityIndicator size="large" color="#6C5CE7" style={{ marginTop: 40 }} />
        ) : atividades.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="document-outline" size={56} color="#D1C8FF" />
            <Text style={styles.emptyTitle}>Nenhuma atividade ainda</Text>
            <Text style={styles.emptySubtitle}>Crie sua primeira atividade no botão acima</Text>
          </View>
        ) : (
          atividades.map((item: any) => {
            const subCount = item.submissions?.length ?? 0;
            const avaliadas = item.submissions?.filter((s: any) => s.aiGrade != null).length ?? 0;
            const isDeadlinePast = new Date(item.deadline) < new Date();

            return (
              <TouchableOpacity
                key={item.id}
                style={styles.activityCard}
                activeOpacity={0.8}
                onPress={() =>
                  router.push({ pathname: "/(protected)/professor/telaTask", params: { task: JSON.stringify(item) } })
                }
              >
                <View style={styles.cardIconBox}>
                  <Feather name="file-text" size={20} color="#6C5CE7" />
                </View>

                <View style={styles.cardContent}>
                  <Text style={styles.cardTitle} numberOfLines={1}>{item.title}</Text>
                  <Text style={styles.cardSubtitle} numberOfLines={1}>{item.description}</Text>

                  <View style={styles.cardFooter}>
                    <View style={styles.codeChip}>
                      <Text style={styles.codeText}>{item.code}</Text>
                    </View>

                    <View style={[styles.deadlineChip, isDeadlinePast && styles.deadlineChipPast]}>
                      <Ionicons
                        name="calendar-outline"
                        size={11}
                        color={isDeadlinePast ? "#FF5F5F" : "#6C5CE7"}
                      />
                      <Text style={[styles.deadlineText, isDeadlinePast && styles.deadlineTextPast]}>
                        {new Date(item.deadline).toLocaleDateString("pt-BR")}
                      </Text>
                    </View>
                  </View>
                </View>

                <View style={styles.cardRight}>
                  {subCount > 0 && (
                    <>
                      <Text style={styles.subCount}>{subCount}</Text>
                      <Text style={styles.subLabel}>entrega{subCount > 1 ? "s" : ""}</Text>
                      {avaliadas > 0 && (
                        <View style={styles.aiChip}>
                          <Text style={styles.aiChipText}>{avaliadas} IA</Text>
                        </View>
                      )}
                    </>
                  )}
                  <Ionicons name="chevron-forward" size={16} color="#C5C0E8" style={{ marginTop: 4 }} />
                </View>
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

  headerGradient: {
    paddingTop: 56,
    paddingHorizontal: 22,
    paddingBottom: 28,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 24,
  },
  welcomeLabel: { color: "rgba(255,255,255,0.75)", fontSize: 12, fontWeight: "600", letterSpacing: 1 },
  headerName: { color: "#FFF", fontSize: 30, fontWeight: "800", marginTop: 4 },
  avatarCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetter: { color: "#FFF", fontSize: 20, fontWeight: "700" },

  statsRow: {
    flexDirection: "row",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 8,
  },
  statBox: { flex: 1, alignItems: "center" },
  statDivider: { width: 1, backgroundColor: "rgba(255,255,255,0.2)" },
  statNumber: { color: "#FFF", fontSize: 26, fontWeight: "800" },
  statLabel: { color: "rgba(255,255,255,0.75)", fontSize: 12, marginTop: 2 },

  createButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 16,
    padding: 16,
    shadowColor: "#6C5CE7",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  createButtonIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#EDE9FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  createButtonText: { flex: 1, color: "#1D2433", fontWeight: "700", fontSize: 15 },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: 22,
    marginTop: 28,
    marginBottom: 14,
  },
  sectionTitle: { flex: 1, fontSize: 18, fontWeight: "800", color: "#1D2433" },
  sectionCount: {
    backgroundColor: "#EDE9FF",
    color: "#6C5CE7",
    fontSize: 13,
    fontWeight: "700",
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
  },

  activityCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    marginHorizontal: 20,
    marginBottom: 12,
    borderRadius: 18,
    padding: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardIconBox: {
    width: 44,
    height: 44,
    borderRadius: 13,
    backgroundColor: "#EDE9FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#1D2433" },
  cardSubtitle: { fontSize: 13, color: "#8E96A8", marginTop: 2 },
  cardFooter: { flexDirection: "row", gap: 8, marginTop: 10, alignItems: "center" },
  codeChip: {
    backgroundColor: "#F0EEFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  codeText: { color: "#6C5CE7", fontSize: 11, fontWeight: "700", letterSpacing: 0.5 },
  deadlineChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 3,
    backgroundColor: "#F0EEFF",
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 6,
  },
  deadlineChipPast: { backgroundColor: "#FFF0F0" },
  deadlineText: { color: "#6C5CE7", fontSize: 11, fontWeight: "600" },
  deadlineTextPast: { color: "#FF5F5F" },

  cardRight: { alignItems: "center", marginLeft: 8 },
  subCount: { fontSize: 22, fontWeight: "800", color: "#1D2433" },
  subLabel: { fontSize: 10, color: "#8E96A8" },
  aiChip: {
    backgroundColor: "#EDE9FF",
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 6,
    marginTop: 4,
  },
  aiChipText: { color: "#6C5CE7", fontSize: 10, fontWeight: "700" },

  emptyContainer: { alignItems: "center", marginTop: 48, paddingHorizontal: 40 },
  emptyTitle: { fontSize: 17, fontWeight: "700", color: "#1D2433", marginTop: 16 },
  emptySubtitle: { fontSize: 14, color: "#8E96A8", textAlign: "center", marginTop: 6 },
});
