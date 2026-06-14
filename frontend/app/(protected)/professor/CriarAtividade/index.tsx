import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";
import { useAuth } from "hooks/useAuth";
import DateTimePicker from "@react-native-community/datetimepicker";

export default function CriarAtividade() {
  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { token } = useAuth();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [loading, setLoading] = useState(false);

  function validate() {
    if (!title.trim()) {
      Alert.alert("Atenção", "Informe o título da atividade");
      return false;
    }
    if (!description.trim()) {
      Alert.alert("Atenção", "Informe a descrição da atividade");
      return false;
    }
    if (deadline <= new Date()) {
      Alert.alert("Atenção", "O prazo deve ser uma data futura");
      return false;
    }
    return true;
  }

  async function handleCreate() {
    if (!validate()) return;

    setLoading(true);
    try {
      const response = await fetch(`${api}tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: title.trim(),
          description: description.trim(),
          deadline: deadline.toISOString(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Erro ao criar atividade");
      }

      Alert.alert(
        "Sucesso! 🎉",
        `Atividade criada com sucesso!\nCódigo: ${data.code}`,
        [{ text: "OK", onPress: () => router.back() }]
      );
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Falha ao criar atividade");
    } finally {
      setLoading(false);
    }
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
        <Text style={styles.topBarTitle}>Nova Atividade</Text>
        <View style={{ width: 36 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.sectionLabel}>INFORMAÇÕES DA ATIVIDADE</Text>

        {/* TÍTULO */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Entrega do Projeto Final"
            placeholderTextColor="#C4C9D4"
            value={title}
            onChangeText={setTitle}
            maxLength={100}
          />
        </View>

        {/* DESCRIÇÃO */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Descrição *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Descreva os requisitos da atividade..."
            placeholderTextColor="#C4C9D4"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
            maxLength={500}
          />
          <Text style={styles.charCount}>{description.length}/500</Text>
        </View>

        {/* PRAZO */}
        <View style={styles.field}>
          <Text style={styles.fieldLabel}>Prazo de Entrega *</Text>
          <TouchableOpacity
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Feather name="calendar" size={18} color="#6B5FD6" />
            <Text style={styles.dateText}>
              {deadline.toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "long",
                year: "numeric",
              })}
            </Text>
            <Feather name="chevron-right" size={18} color="#C4C9D4" />
          </TouchableOpacity>
        </View>

        {showDatePicker && (
          <DateTimePicker
            value={deadline}
            mode="date"
            display={Platform.OS === "ios" ? "spinner" : "default"}
            minimumDate={new Date()}
            onChange={(_, selectedDate) => {
              setShowDatePicker(Platform.OS === "ios");
              if (selectedDate) setDeadline(selectedDate);
            }}
          />
        )}

        {/* PRÉ-VISUALIZAÇÃO */}
        <View style={styles.previewCard}>
          <Text style={styles.previewLabel}>PRÉ-VISUALIZAÇÃO</Text>
          <Text style={styles.previewTitle}>
            {title || "Título da atividade"}
          </Text>
          <Text style={styles.previewDesc}>
            {description || "Descrição aparecerá aqui..."}
          </Text>
          <View style={styles.previewMeta}>
            <Feather name="calendar" size={12} color="#9CA3AF" />
            <Text style={styles.previewMetaText}>
              {deadline.toLocaleDateString("pt-BR")}
            </Text>
          </View>
        </View>

        {/* BOTÃO CRIAR */}
        <TouchableOpacity
          style={[styles.submitButton, loading && { opacity: 0.7 }]}
          onPress={handleCreate}
          disabled={loading}
          activeOpacity={0.85}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <>
              <Feather name="check-circle" size={20} color="#fff" />
              <Text style={styles.submitText}>Criar Atividade</Text>
            </>
          )}
        </TouchableOpacity>
      </ScrollView>
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
  scrollContent: {
    paddingHorizontal: 20,
    paddingTop: 8,
    paddingBottom: 60,
  },
  sectionLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9CA3AF",
    letterSpacing: 1,
    marginBottom: 16,
  },
  field: { marginBottom: 20 },
  fieldLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#374151",
    marginBottom: 8,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 15,
    color: "#1D2433",
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  textArea: { height: 110, paddingTop: 14 },
  charCount: {
    textAlign: "right",
    fontSize: 11,
    color: "#C4C9D4",
    marginTop: 4,
  },
  dateButton: {
    backgroundColor: "#FFFFFF",
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1.5,
    borderColor: "#E5E7EB",
  },
  dateText: { flex: 1, fontSize: 15, color: "#1D2433" },
  previewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    borderWidth: 1.5,
    borderColor: "#EDE9FF",
    borderStyle: "dashed",
  },
  previewLabel: {
    fontSize: 10,
    fontWeight: "700",
    color: "#6B5FD6",
    letterSpacing: 1,
    marginBottom: 8,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1D2433",
    marginBottom: 4,
  },
  previewDesc: { fontSize: 13, color: "#9CA3AF", marginBottom: 10 },
  previewMeta: { flexDirection: "row", alignItems: "center", gap: 4 },
  previewMetaText: { fontSize: 12, color: "#9CA3AF" },
  submitButton: {
    height: 56,
    borderRadius: 16,
    backgroundColor: "#6B5FD6",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    shadowColor: "#6B5FD6",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  submitText: { color: "#fff", fontSize: 16, fontWeight: "700" },
});
