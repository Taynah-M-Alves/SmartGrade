import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  Alert,
  ActivityIndicator,
  Platform,
} from "react-native";

import { Ionicons, AntDesign, Feather } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import DateTimePicker from "@react-native-community/datetimepicker";
import { router } from "expo-router";
import { useAuth } from "hooks/useAuth";

type Criterio = {
  id: string;
  title: string;
  weight: string;
  description: string;
};

export default function CriarAtividade() {
  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { token } = useAuth();

  const [etapa, setEtapa] = useState<"task" | "criterios" | "done">("task");
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const [deadline, setDeadline] = useState<Date>(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateSelected, setDateSelected] = useState(false);

  const [taskCriada, setTaskCriada] = useState<any>(null);

  const [criterios, setCriterios] = useState<Criterio[]>([
    { id: Date.now().toString(), title: "", weight: "", description: "" },
  ]);

  const formatDateDisplay = (date: Date) =>
    date.toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });

  const onChangeDate = (_: any, selectedDate?: Date) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      selectedDate.setHours(23, 59, 59, 0);
      setDeadline(selectedDate);
      setDateSelected(true);
    }
  };

  const updateCriterio = (id: string, field: keyof Criterio, value: string) => {
    setCriterios((prev) =>
      prev.map((c) => (c.id === id ? { ...c, [field]: value } : c))
    );
  };

  const addCriterio = () => {
    setCriterios((prev) => [
      ...prev,
      { id: Date.now().toString(), title: "", weight: "", description: "" },
    ]);
  };

  const removeCriterio = (id: string) => {
    if (criterios.length === 1) return;
    setCriterios((prev) => prev.filter((c) => c.id !== id));
  };

  const handleCriarTask = async () => {
    if (!title.trim() || !description.trim()) {
      Alert.alert("Campos obrigatórios", "Preencha título e descrição.");
      return;
    }
    if (!dateSelected) {
      Alert.alert("Prazo obrigatório", "Selecione o prazo de entrega.");
      return;
    }

    try {
      setLoading(true);
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
      if (!response.ok) throw new Error(data.message || "Erro ao criar atividade.");

      setTaskCriada(data);
      setEtapa("criterios");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível criar a atividade.");
    } finally {
      setLoading(false);
    }
  };

  const handleCriarCriterios = async () => {
    const validos = criterios.filter(
      (c) => c.title.trim() && c.description.trim() && c.weight.trim()
    );

    if (validos.length === 0) {
      Alert.alert("Atenção", "Adicione pelo menos um critério completo.");
      return;
    }

    const pesoInvalido = validos.find(
      (c) => isNaN(Number(c.weight)) || Number(c.weight) <= 0
    );
    if (pesoInvalido) {
      Alert.alert("Peso inválido", "O peso deve ser um número maior que 0.");
      return;
    }

    try {
      setLoading(true);

      const requests = validos.map((c) =>
        fetch(`${api}task-criteria`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            title: c.title.trim(),
            weight: Number(c.weight),
            description: c.description.trim(),
            taskId: taskCriada.id,
          }),
        }).then((r) => r.json())
      );

      const results = await Promise.all(requests);
      const erro = results.find((r: any) => r.statusCode >= 400);
      if (erro) throw new Error(erro.message || "Erro ao criar critério.");

      setEtapa("done");
    } catch (error: any) {
      Alert.alert("Erro", error.message || "Não foi possível criar os critérios.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setTitle("");
    setDescription("");
    setDeadline(new Date());
    setDateSelected(false);
    setTaskCriada(null);
    setCriterios([{ id: Date.now().toString(), title: "", weight: "", description: "" }]);
    setEtapa("task");
  };

  if (etapa === "done") {
    return (
      <View style={styles.doneContainer}>
        <Ionicons name="checkmark-circle" size={72} color="#6C5CE7" />
        <Text style={styles.doneTitle}>Atividade criada!</Text>
        <Text style={styles.doneSub}>
          A atividade <Text style={{ fontWeight: "700" }}>{taskCriada?.title}</Text> e seus
          critérios foram salvos com sucesso.
        </Text>
        <View style={styles.doneCodeBox}>
          <Text style={styles.doneCodeLabel}>Código da atividade</Text>
          <Text style={styles.doneCode}>{taskCriada?.code}</Text>
        </View>
        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            handleReset();
          }}
        >
          <AntDesign name="plus" size={18} color="#FFF" />
          <Text style={styles.buttonText}>Criar outra atividade</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { backgroundColor: "#2D3436", marginTop: 12 }]}
          onPress={() => router.replace("/(protected)/professor/(tabs)")}
        >
          <Ionicons name="home-outline" size={18} color="#FFF" />
          <Text style={styles.buttonText}>Ver minhas atividades</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Nova Atividade</Text>
      </View>

      <LinearGradient
        colors={["#7C6CF7", "#6557E8"]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.bannerCard}
      >
        <View style={styles.iconBox}>
          <Ionicons name="document-text-outline" size={22} color="#6C5CE7" />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={styles.bannerTitle}>
            {etapa === "task" ? "Dados da atividade" : "Critérios de avaliação"}
          </Text>
          <Text style={styles.bannerSub}>
            {etapa === "task"
              ? "Passo 1 de 2 — preencha as informações básicas"
              : `Passo 2 de 2 — atividade "${taskCriada?.title}" criada ✓`}
          </Text>
        </View>
      </LinearGradient>

      {etapa === "task" && (
        <View style={styles.formCard}>
          <Text style={styles.label}>Título *</Text>
          <TextInput
            style={styles.input}
            placeholder="Ex: Entrega do projeto final"
            placeholderTextColor="#AAA"
            value={title}
            onChangeText={setTitle}
          />

          <Text style={styles.label}>Descrição *</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            placeholder="Ex: Enviar PDF com a documentação completa"
            placeholderTextColor="#AAA"
            value={description}
            onChangeText={setDescription}
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />

          <Text style={styles.label}>Prazo de entrega *</Text>
          <TouchableOpacity
            style={[styles.input, styles.dateButton]}
            onPress={() => setShowDatePicker(true)}
          >
            <Ionicons
              name="calendar-outline"
              size={20}
              color={dateSelected ? "#6C5CE7" : "#AAA"}
            />
            <Text style={[styles.dateText, !dateSelected && styles.datePlaceholder]}>
              {dateSelected ? formatDateDisplay(deadline) : "Selecionar data"}
            </Text>
          </TouchableOpacity>

          {showDatePicker && (
            <DateTimePicker
              value={deadline}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              minimumDate={new Date()}
              onChange={onChangeDate}
              locale="pt-BR"
            />
          )}

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCriarTask}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Text style={styles.buttonText}>Próximo — Critérios</Text>
                <Ionicons name="arrow-forward" size={18} color="#FFF" />
              </>
            )}
          </TouchableOpacity>
        </View>
      )}

      {etapa === "criterios" && (
        <>
          {criterios.map((criterio, index) => (
            <View key={criterio.id} style={styles.criterioCard}>
              <View style={styles.criterioHeader}>
                <Text style={styles.criterioTitle}>Critério {index + 1}</Text>
                {criterios.length > 1 && (
                  <TouchableOpacity onPress={() => removeCriterio(criterio.id)}>
                    <Feather name="trash-2" size={18} color="#EF4444" />
                  </TouchableOpacity>
                )}
              </View>

              <Text style={styles.label}>Título *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: Formatação ABNT"
                placeholderTextColor="#AAA"
                value={criterio.title}
                onChangeText={(v) => updateCriterio(criterio.id, "title", v)}
              />

              <Text style={styles.label}>Descrição *</Text>
              <TextInput
                style={[styles.input, styles.textArea]}
                placeholder="Ex: Documento deve seguir normas ABNT"
                placeholderTextColor="#AAA"
                value={criterio.description}
                onChangeText={(v) => updateCriterio(criterio.id, "description", v)}
                multiline
                numberOfLines={3}
                textAlignVertical="top"
              />

              <Text style={styles.label}>Peso *</Text>
              <TextInput
                style={styles.input}
                placeholder="Ex: 2"
                placeholderTextColor="#AAA"
                value={criterio.weight}
                onChangeText={(v) => updateCriterio(criterio.id, "weight", v)}
                keyboardType="numeric"
              />
            </View>
          ))}

          <TouchableOpacity style={styles.addButton} onPress={addCriterio}>
            <AntDesign name="plus" size={18} color="#6C5CE7" />
            <Text style={styles.addButtonText}>Adicionar critério</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, loading && styles.buttonDisabled]}
            onPress={handleCriarCriterios}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#FFF" />
            ) : (
              <>
                <Ionicons name="checkmark-circle-outline" size={20} color="#FFF" />
                <Text style={styles.buttonText}>Concluir e salvar</Text>
              </>
            )}
          </TouchableOpacity>
        </>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F5F6FA" },
  content: { padding: 18, paddingBottom: 60 },
  header: { marginTop: 50, marginBottom: 18 },
  headerTitle: { fontSize: 22, fontWeight: "700", color: "#2D3436" },
  bannerCard: {
    borderRadius: 20,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
    marginBottom: 20,
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "#FFF",
    justifyContent: "center",
    alignItems: "center",
  },
  bannerTitle: { color: "#FFF", fontSize: 16, fontWeight: "700" },
  bannerSub: { color: "#EAE6FF", fontSize: 12, marginTop: 2 },
  formCard: { backgroundColor: "#FFF", borderRadius: 18, padding: 18, marginBottom: 20 },
  criterioCard: { backgroundColor: "#FFF", borderRadius: 18, padding: 18, marginBottom: 14 },
  criterioHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  criterioTitle: { fontWeight: "700", fontSize: 15, color: "#2D3436" },
  label: { fontSize: 13, fontWeight: "600", color: "#555", marginBottom: 6, marginTop: 12 },
  input: {
    backgroundColor: "#F5F6FA",
    borderRadius: 12,
    paddingHorizontal: 14,
    paddingVertical: 12,
    fontSize: 14,
    color: "#2D3436",
    borderWidth: 1,
    borderColor: "#ECECEC",
  },
  textArea: { height: 90, paddingTop: 12 },
  dateButton: { flexDirection: "row", alignItems: "center", gap: 10 },
  dateText: { fontSize: 14, color: "#2D3436" },
  datePlaceholder: { color: "#AAA" },
  button: {
    backgroundColor: "#6C5CE7",
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    marginTop: 18,
  },
  buttonDisabled: { opacity: 0.6 },
  buttonText: { color: "#FFF", fontWeight: "700", fontSize: 16 },
  addButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingVertical: 14,
    borderRadius: 14,
    borderWidth: 1.5,
    borderColor: "#6C5CE7",
    borderStyle: "dashed",
    marginBottom: 4,
  },
  addButtonText: { color: "#6C5CE7", fontWeight: "600", fontSize: 15 },
  doneContainer: {
    flex: 1,
    backgroundColor: "#F5F6FA",
    alignItems: "center",
    justifyContent: "center",
    padding: 32,
  },
  doneTitle: { fontSize: 26, fontWeight: "800", color: "#2D3436", marginBottom: 10, marginTop: 16 },
  doneSub: { fontSize: 15, color: "#666", textAlign: "center", lineHeight: 22, marginBottom: 24 },
  doneCodeBox: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    paddingVertical: 16,
    paddingHorizontal: 28,
    alignItems: "center",
    marginBottom: 32,
    borderWidth: 1,
    borderColor: "#E8E5FF",
  },
  doneCodeLabel: { fontSize: 12, color: "#888", marginBottom: 6 },
  doneCode: { fontSize: 22, fontWeight: "800", color: "#6C5CE7", letterSpacing: 2 },
});