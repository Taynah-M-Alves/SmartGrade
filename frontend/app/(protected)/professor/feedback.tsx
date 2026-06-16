import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
  StyleSheet,
  Alert,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useLocalSearchParams, router } from "expo-router";
import { useAuth } from "hooks/useAuth";

export default function Feedback() {
  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { token } = useAuth();
  const { id } = useLocalSearchParams();

  const [submission, setSubmission] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [editing, setEditing] = useState(false);
  const [grade, setGrade] = useState("");
  const [feedback, setFeedback] = useState("");
  const [saving, setSaving] = useState(false);

  async function loadSubmission() {
    try {
      setLoading(true);
      const response = await fetch(`${api}submissions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro ao buscar submissão");
      setSubmission(data);
      setGrade(String(data.professorGrade ?? data.aiGrade ?? 0));
      setFeedback(data.professorFeedback ?? data.aiFeedback ?? "");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  async function salvarAvaliacao() {
    const parsedGrade = Number(grade.replace(",", "."));
    if (Number.isNaN(parsedGrade) || parsedGrade < 0 || parsedGrade > 10) {
      Alert.alert("Nota inválida", "Informe uma nota entre 0 e 10.");
      return;
    }
    try {
      setSaving(true);
      const response = await fetch(`${api}submissions/${id}/grade`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ grade: parsedGrade, feedback }),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Erro ao salvar");
      setSubmission(data);
      setEditing(false);
    } catch (err: any) {
      Alert.alert("Erro", err.message);
    } finally {
      setSaving(false);
    }
  }

  useEffect(() => {
    if (id && token) loadSubmission();
  }, [id, token]);

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#6C5CE7" />
      </View>
    );
  }

  if (error || !submission) {
    return (
      <View style={styles.centered}>
        <Ionicons name="alert-circle-outline" size={48} color="#DDD" />
        <Text style={styles.errorText}>{error || "Submissão não encontrada"}</Text>
      </View>
    );
  }

  const gradeValue = submission.professorGrade ?? submission.aiGrade ?? 0;
  const gradeNum = Number(gradeValue);
  const gradeColor = gradeNum >= 7 ? "#2BAE66" : gradeNum >= 5 ? "#FF8C42" : "#EF4444";
  const gradeGradient: [string, string] =
    gradeNum >= 7 ? ["#2BAE66", "#1D8A50"] : gradeNum >= 5 ? ["#FF8C42", "#E06B20"] : ["#EF4444", "#C93232"];
  const isAvaliado = submission.status === "FINALIZADO";

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      {/* HEADER GRADIENT */}
      <LinearGradient colors={["#7C6CF7", "#5A4AF4"]} style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
          <Ionicons name="chevron-back" size={22} color="#FFF" />
        </TouchableOpacity>

        <View style={styles.headerContent}>
          <Text style={styles.headerLabel}>AVALIAÇÃO DO ALUNO</Text>
          <Text style={styles.headerName} numberOfLines={1}>{submission.user?.name}</Text>
          <Text style={styles.headerTask} numberOfLines={1}>{submission.task?.title}</Text>

          <View style={[styles.statusPill, isAvaliado ? styles.statusPillGreen : styles.statusPillOrange]}>
            <Ionicons
              name={isAvaliado ? "checkmark-circle" : "time"}
              size={13}
              color={isAvaliado ? "#2BAE66" : "#FF8C42"}
            />
            <Text style={[styles.statusPillText, { color: isAvaliado ? "#2BAE66" : "#FF8C42" }]}>
              {isAvaliado ? "Avaliado" : "Pendente"}
            </Text>
          </View>
        </View>

        {/* GRADE CIRCLE */}
        <LinearGradient colors={gradeGradient} style={styles.gradeCircle}>
          <Text style={styles.gradeValue}>{gradeNum.toFixed(1)}</Text>
          <Text style={styles.gradeMax}>/ 10</Text>
        </LinearGradient>
      </LinearGradient>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* AI GRADE INFO */}
        {submission.aiGrade != null && (
          <View style={styles.aiInfoCard}>
            <Ionicons name="sparkles" size={16} color="#6C5CE7" />
            <Text style={styles.aiInfoText}>
              Nota sugerida pela IA: <Text style={styles.aiInfoBold}>{Number(submission.aiGrade).toFixed(1)}</Text>
              {submission.professorGrade != null && " · Revisada pelo professor"}
            </Text>
          </View>
        )}

        {/* DOCUMENTO */}
        <View style={styles.card}>
          <View style={styles.cardHeader}>
            <Ionicons name="document-attach-outline" size={18} color="#6C5CE7" />
            <Text style={styles.cardTitle}>Documento enviado</Text>
          </View>
          <View style={styles.docRow}>
            <View style={styles.docIcon}>
              <Ionicons name="document-text" size={28} color="#EF4444" />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.docName} numberOfLines={2}>
                {submission.fileUrl?.split(/[\\/]/).pop()?.split("?")[0]}
              </Text>
              <Text style={styles.docDate}>
                {new Date(submission.createdAt).toLocaleString("pt-BR")}
              </Text>
            </View>
          </View>
        </View>

        {/* FEEDBACK */}
        <View style={styles.card}>
          <View style={styles.cardHeaderRow}>
            <View style={styles.cardHeader}>
              <Ionicons name="chatbubble-ellipses-outline" size={18} color="#6C5CE7" />
              <Text style={styles.cardTitle}>Feedback</Text>
            </View>
            <TouchableOpacity
              style={styles.editBtn}
              onPress={() => setEditing(!editing)}
            >
              <Ionicons name={editing ? "close" : "pencil"} size={15} color="#6C5CE7" />
              <Text style={styles.editBtnText}>{editing ? "Cancelar" : "Editar"}</Text>
            </TouchableOpacity>
          </View>

          {editing ? (
            <>
              <Text style={styles.inputLabel}>Nota (0 – 10)</Text>
              <TextInput
                value={grade}
                onChangeText={setGrade}
                keyboardType="numeric"
                style={styles.gradeInput}
                placeholder="Ex: 8.5"
                placeholderTextColor="#B0B8C9"
              />
              <Text style={styles.inputLabel}>Comentário</Text>
              <TextInput
                value={feedback}
                onChangeText={setFeedback}
                multiline
                numberOfLines={5}
                style={styles.feedbackInput}
                placeholder="Escreva seu feedback..."
                placeholderTextColor="#B0B8C9"
                textAlignVertical="top"
              />
            </>
          ) : (
            <View style={styles.feedbackBox}>
              <Text style={styles.feedbackText}>
                {submission.professorFeedback || submission.aiFeedback || "Sem feedback."}
              </Text>
            </View>
          )}
        </View>

        {/* CRITÉRIOS */}
        {submission.criteriaFeedback?.length > 0 && (
          <View style={styles.card}>
            <View style={styles.cardHeader}>
              <Ionicons name="list-circle-outline" size={18} color="#6C5CE7" />
              <Text style={styles.cardTitle}>Avaliação por critério (IA)</Text>
            </View>

            {submission.criteriaFeedback.map((item: any, index: number) => {
              const pct = Math.min((item.score / 10) * 100, 100);
              const barColor = item.score >= 7 ? "#2BAE66" : item.score >= 5 ? "#FF8C42" : "#EF4444";
              return (
                <View key={item.id} style={[styles.criterionItem, index > 0 && styles.criterionDivider]}>
                  <View style={styles.criterionHeader}>
                    <Text style={styles.criterionTitle}>{item.criterion?.title}</Text>
                    <View style={[styles.criterionScore, { backgroundColor: `${barColor}18` }]}>
                      <Text style={[styles.criterionScoreText, { color: barColor }]}>
                        {item.score} / 10
                      </Text>
                    </View>
                  </View>
                  <View style={styles.progressBg}>
                    <View style={[styles.progressFill, { width: `${pct}%`, backgroundColor: barColor }]} />
                  </View>
                  <Text style={styles.criterionComment}>{item.comment}</Text>
                </View>
              );
            })}
          </View>
        )}

        {/* SALVAR */}
        {editing && (
          <TouchableOpacity
            style={styles.saveButton}
            onPress={salvarAvaliacao}
            disabled={saving}
          >
            <LinearGradient colors={["#7C6CF7", "#5A4AF4"]} style={styles.saveButtonGradient}>
              {saving ? (
                <ActivityIndicator color="#FFF" />
              ) : (
                <>
                  <Ionicons name="checkmark-circle" size={20} color="#FFF" />
                  <Text style={styles.saveButtonText}>Salvar avaliação</Text>
                </>
              )}
            </LinearGradient>
          </TouchableOpacity>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  centered: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "#F5F6FA" },
  errorText: { marginTop: 12, color: "#8E96A8", fontSize: 15 },

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
  headerName: { color: "#FFF", fontSize: 20, fontWeight: "800", marginTop: 4 },
  headerTask: { color: "rgba(255,255,255,0.75)", fontSize: 13, marginTop: 2 },
  statusPill: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    alignSelf: "flex-start",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
    marginTop: 10,
  },
  statusPillGreen: { backgroundColor: "rgba(43,174,102,0.2)" },
  statusPillOrange: { backgroundColor: "rgba(255,140,66,0.2)" },
  statusPillText: { fontSize: 12, fontWeight: "700" },
  gradeCircle: {
    width: 72,
    height: 72,
    borderRadius: 36,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 12,
  },
  gradeValue: { color: "#FFF", fontSize: 22, fontWeight: "800" },
  gradeMax: { color: "rgba(255,255,255,0.7)", fontSize: 10 },

  scrollContent: { padding: 16, paddingBottom: 40 },

  aiInfoCard: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#EDE9FF",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 10,
    marginBottom: 14,
  },
  aiInfoText: { fontSize: 13, color: "#5A4AF4", flex: 1 },
  aiInfoBold: { fontWeight: "700" },

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
  cardHeaderRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  cardTitle: { fontSize: 15, fontWeight: "700", color: "#1D2433" },

  editBtn: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    backgroundColor: "#EDE9FF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 10,
  },
  editBtnText: { color: "#6C5CE7", fontSize: 12, fontWeight: "700" },

  docRow: { flexDirection: "row", alignItems: "center", gap: 12 },
  docIcon: {
    width: 48,
    height: 48,
    borderRadius: 13,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
  },
  docName: { fontSize: 14, fontWeight: "600", color: "#1D2433" },
  docDate: { fontSize: 12, color: "#8E96A8", marginTop: 3 },

  inputLabel: { fontSize: 12, fontWeight: "700", color: "#8E96A8", marginBottom: 6, marginTop: 10 },
  gradeInput: {
    backgroundColor: "#F5F6FA",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 22,
    fontWeight: "800",
    color: "#6C5CE7",
    textAlign: "center",
    borderWidth: 1,
    borderColor: "#E8E5FF",
  },
  feedbackInput: {
    backgroundColor: "#F5F6FA",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#1D2433",
    minHeight: 110,
    borderWidth: 1,
    borderColor: "#E8E5FF",
  },
  feedbackBox: {
    backgroundColor: "#F8F7FF",
    borderRadius: 14,
    padding: 14,
  },
  feedbackText: { fontSize: 14, color: "#4A4A6A", lineHeight: 22 },

  criterionItem: { paddingTop: 16 },
  criterionDivider: { borderTopWidth: 1, borderTopColor: "#F0F0F8" },
  criterionHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 10 },
  criterionTitle: { fontSize: 14, fontWeight: "600", color: "#1D2433", flex: 1 },
  criterionScore: {
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 20,
    marginLeft: 8,
  },
  criterionScoreText: { fontSize: 13, fontWeight: "700" },
  progressBg: { height: 6, backgroundColor: "#ECECEC", borderRadius: 999, overflow: "hidden" },
  progressFill: { height: 6, borderRadius: 999 },
  criterionComment: { marginTop: 8, fontSize: 13, color: "#6A6A8A", lineHeight: 20 },

  saveButton: { borderRadius: 18, overflow: "hidden", marginTop: 4 },
  saveButtonGradient: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    paddingVertical: 16,
  },
  saveButtonText: { color: "#FFF", fontSize: 16, fontWeight: "700" },
});
