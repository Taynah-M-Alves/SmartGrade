import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, router } from "expo-router";
import { useAuth } from "hooks/useAuth";

export default function ApagarAtividade() {
  const { id, countSubmission, taskTitle } = useLocalSearchParams();
  const { token } = useAuth();
  const api = process.env.EXPO_PUBLIC_BASE_URL;

  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    Alert.alert(
      "Confirmação Final",
      "Tem certeza? Esta ação não pode ser desfeita.",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Excluir",
          style: "destructive",
          onPress: async () => {
            setLoading(true);
            try {
              const response = await fetch(`${api}tasks/${id}`, {
                method: "DELETE",
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              });

              if (!response.ok) {
                const data = await response.json().catch(() => ({}));
                throw new Error(data.message || "Erro ao excluir atividade");
              }

              Alert.alert(
                "Excluída",
                "Atividade removida com sucesso.",
                [{ text: "OK", onPress: () => router.dismissAll() }]
              );
            } catch (error: any) {
              Alert.alert("Erro", error.message || "Falha ao excluir");
            } finally {
              setLoading(false);
            }
          },
        },
      ]
    );
  }

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.topBar}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={styles.backBtn}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Feather name="arrow-left" size={22} color="#1D2433" />
        </TouchableOpacity>
        <Text style={styles.topBarTitle}>Excluir Atividade</Text>
        <View style={{ width: 36 }} />
      </View>

      <View style={styles.content}>
        {/* ÍCONE */}
        <View style={styles.iconWrapper}>
          <Ionicons name="warning-outline" size={48} color="#EF4444" />
        </View>

        <Text style={styles.dangerLabel}>AÇÃO IRREVERSÍVEL</Text>
        <Text style={styles.title}>Atenção</Text>

        {taskTitle ? (
          <Text style={styles.taskName}>"{taskTitle}"</Text>
        ) : null}

        <Text style={styles.description}>
          Esta atividade será permanentemente excluída e não poderá ser
          recuperada. Todos os dados relacionados serão perdidos.
        </Text>

        {/* CARDS DE IMPACTO */}
        <View style={styles.impactRow}>
          <View style={styles.impactCard}>
            <Text style={styles.impactNumber}>4</Text>
            <Text style={styles.impactLabel}>Rubricas</Text>
            <Text style={styles.impactSub}>vinculadas</Text>
          </View>

          <View style={[styles.impactCard, styles.impactCardDanger]}>
            <Text style={[styles.impactNumber, { color: "#EF4444" }]}>
              {countSubmission || 0}
            </Text>
            <Text style={styles.impactLabel}>Alunos</Text>
            <Text style={styles.impactSub}>afetados</Text>
          </View>
        </View>

        {/* AVISO */}
        <View style={styles.warningBox}>
          <Feather name="alert-triangle" size={14} color="#B45309" />
          <Text style={styles.warningText}>
            {Number(countSubmission) > 0
              ? `${countSubmission} aluno(s) terão seus dados removidos permanentemente.`
              : "Nenhum aluno será afetado, mas a atividade e suas rubricas serão excluídas."}
          </Text>
        </View>

        {/* BOTÕES */}
        <View style={styles.buttons}>
          <TouchableOpacity
            style={styles.cancelBtn}
            onPress={() => router.back()}
          >
            <Text style={styles.cancelText}>Cancelar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.deleteBtn, loading && { opacity: 0.7 }]}
            onPress={handleDelete}
            disabled={loading}
            activeOpacity={0.85}
          >
            {loading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <>
                <Feather name="trash-2" size={18} color="#fff" />
                <Text style={styles.deleteBtnText}>Confirmar Exclusão</Text>
              </>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F8F9FB" },
  topBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: 56,
    paddingBottom: 12,
    paddingHorizontal: 20,
    backgroundColor: "#F8F9FB",
  },
  backBtn: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: "#FFFFFF",
    justifyContent: "center",
    alignItems: "center",
  },
  topBarTitle: { fontSize: 17, fontWeight: "700", color: "#1D2433" },
  content: { flex: 1, paddingHorizontal: 24, paddingTop: 20 },
  iconWrapper: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "#FEE2E2",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: 20,
  },
  dangerLabel: {
    textAlign: "center",
    fontSize: 11,
    fontWeight: "700",
    color: "#EF4444",
    letterSpacing: 1.2,
    marginBottom: 8,
  },
  title: {
    textAlign: "center",
    fontSize: 28,
    fontWeight: "800",
    color: "#1D2433",
    marginBottom: 6,
  },
  taskName: {
    textAlign: "center",
    fontSize: 15,
    color: "#6B7280",
    fontWeight: "500",
    marginBottom: 12,
  },
  description: {
    textAlign: "center",
    fontSize: 14,
    color: "#6B7280",
    lineHeight: 22,
    marginBottom: 24,
  },
  impactRow: { flexDirection: "row", gap: 12, marginBottom: 16 },
  impactCard: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  impactCardDanger: {
    backgroundColor: "#FEF2F2",
    borderWidth: 1,
    borderColor: "#FECACA",
  },
  impactNumber: { fontSize: 36, fontWeight: "800", color: "#1D2433" },
  impactLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#374151",
    marginTop: 2,
  },
  impactSub: { fontSize: 12, color: "#9CA3AF", marginTop: 2 },
  warningBox: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    backgroundColor: "#FFFBEB",
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: "#FDE68A",
    marginBottom: 32,
  },
  warningText: { flex: 1, fontSize: 13, color: "#92400E", lineHeight: 20 },
  buttons: { gap: 12 },
  cancelBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#F3F4F6",
    justifyContent: "center",
    alignItems: "center",
  },
  cancelText: { fontSize: 16, fontWeight: "600", color: "#374151" },
  deleteBtn: {
    height: 52,
    borderRadius: 14,
    backgroundColor: "#EF4444",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#EF4444",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  deleteBtnText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
