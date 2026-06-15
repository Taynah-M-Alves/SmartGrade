import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";

import { useLocalSearchParams, router } from "expo-router";
import { useAuth } from "hooks/useAuth";

export default function Task() {

   const api = process.env.EXPO_PUBLIC_BASE_URL;
    const { token } = useAuth()
  
    const [submissions, setSubmissions] = useState<any[]>([]);

    const { task } = useLocalSearchParams();
    
     async function findSubmissions() {
  try {
    const response = await fetch(
      `${api}submissions/task/${atividade.id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      throw new Error(
        data.message || "Erro ao buscar submissions"
      );
    }

    setSubmissions(data);

    console.log("Submissions:", data);
  } catch (error: any) {
    alert(error.message);
  }
}
    
      useEffect(() => {
  findSubmissions();
}, []);

  

  const atividade = JSON.parse(
    task as string
  );

  return (
    <ScrollView
  style={styles.container}
  contentContainerStyle={styles.content}
>
  <View style={styles.header}>
    <Text style={styles.headerTitle}>
      Atividade
    </Text>
  </View>

  <LinearGradient
    colors={["#7C6CF7", "#6557E8"]}
    start={{ x: 0, y: 0 }}
    end={{ x: 1, y: 1 }}
    style={styles.taskCard}
  >
    <View style={styles.taskTop}>
      <View style={styles.iconBox}>
        <Ionicons
          name="document-text-outline"
          size={20}
          color="#6C5CE7"
        />
      </View>

      <View style={{ flex: 1 }}>
        <Text style={styles.taskTitle}>
          {atividade.title}
        </Text>

        <Text style={styles.taskDescription}>
          {atividade.description}
        </Text>
      </View>
    </View>

    <View style={styles.taskBottom}>
      <View>
        <Text style={styles.taskLabel}>
          Código da atividade
        </Text>

        <Text style={styles.taskValue}>
          {atividade.code}
        </Text>
      </View>

      <View>
        <Text style={styles.taskLabel}>
          Prazo de entrega
        </Text>

        <Text style={styles.taskValue}>
          {new Date(
            atividade.deadline
          ).toLocaleDateString("pt-BR")}
        </Text>
      </View>
    </View>
  </LinearGradient>

  <View style={styles.statsContainer}>
    <View style={styles.statCard}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: "#E8E5FF" },
        ]}
      >
        <Ionicons
          name="download-outline"
          size={18}
          color="#6C5CE7"
        />
      </View>

      <Text style={styles.statNumber}>
        {submissions.length}
      </Text>

      <Text style={styles.statText}>
        Entregas
      </Text>
    </View>

    <View style={styles.statCard}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: "#DFF7E6" },
        ]}
      >
        <Ionicons
          name="checkmark"
          size={18}
          color="#2BAE66"
        />
      </View>

      <Text style={styles.statNumber}>
        {
          atividade.submissions.filter(
            (s: any) => s.aiGrade
          ).length
        }
      </Text>

      <Text style={styles.statText}>
        Avaliadas
      </Text>
    </View>

    <View style={styles.statCard}>
      <View
        style={[
          styles.statIcon,
          { backgroundColor: "#FFF0E5" },
        ]}
      >
        <Ionicons
          name="time-outline"
          size={18}
          color="#FF8C42"
        />
      </View>

      <Text style={styles.statNumber}>
        {
          submissions.filter(
            (s: any) => !s.aiGrade
          ).length
        }
      </Text>

      <Text style={styles.statText}>
        Pendentes
      </Text>
    </View>
  </View>

  <View style={styles.progressCard}>
    <View
      style={styles.progressHeader}
    >
      <Text
        style={styles.progressTitle}
      >
        Progresso das avaliações
      </Text>

      <Text
        style={styles.progressPercent}
      >
        {Math.round(
          (submissions.filter(
            (s: any) => s.aiGrade
          ).length /
            Math.max(
              atividade.submissions
                .length,
              1
            )) *
            100
        )}
        %
      </Text>
    </View>

    <View
      style={styles.progressBar}
    >
      <View
        style={[
          styles.progressFill,
          {
            width: `${Math.round(
              (submissions.filter(
                (s: any) => s.aiGrade
              ).length /
                Math.max(
                  atividade
                    .submissions
                    .length,
                  1
                )) *
                100
            )}%`,
          },
        ]}
      />
    </View>

    <Text
      style={styles.progressLabel}
    >
      {
        submissions.filter(
          (s: any) => s.aiGrade
        ).length
      }{" "}
      de {atividade.submissions.length} avaliações concluídas
    </Text>
  </View>

  <Text style={styles.listTitle}>
    Submissões (
    {submissions.length})
  </Text>

  {submissions.map(
    (submission: any) => (
      <TouchableOpacity
        key={submission.id}
        style={styles.submissionCard}
        onPress={() => router.push("/(protected)/professor/Feedback")}      >
        <View
          style={styles.avatar}
        />

        <View
          style={{ flex: 1 }}
        >
          <Text
            style={styles.studentName}
          >
            {submission.user?.name}
          </Text>

          <Text
            style={
              styles.studentDate
            }
          >
            Enviado em{" "}
            {new Date(
              submission.createdAt
            ).toLocaleDateString(
              "pt-BR"
            )}
          </Text>
        </View>

        <View
          style={[
            styles.statusBadge,
            submission.aiGrade
              ? styles.greenBadge
              : styles.orangeBadge,
          ]}
        >
          <Text
            style={
              styles.statusText
            }
          >
            {submission.aiGrade
              ? "Avaliado"
              : "Pendente"}
          </Text>
        </View>
      </TouchableOpacity>
    )
  )}
</ScrollView>
  );
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  backgroundColor: "#F5F6FA",
},

content: {
  padding: 18,
  paddingBottom: 40,
},

header: {
  marginTop: 50,
  marginBottom: 15,
},

headerTitle: {
  fontSize: 22,
  fontWeight: "700",
  color: "#2D3436",
},

taskCard: {
  borderRadius: 20,
  padding: 18,
  marginBottom: 16,
},

taskTop: {
  flexDirection: "row",
  marginBottom: 18,
},

iconBox: {
  width: 42,
  height: 42,
  borderRadius: 12,
  backgroundColor: "#FFF",
  justifyContent: "center",
  alignItems: "center",
  marginRight: 12,
},

taskTitle: {
  color: "#FFF",
  fontSize: 18,
  fontWeight: "700",
},

taskDescription: {
  color: "#EAE6FF",
  fontSize: 13,
},

taskBottom: {
  flexDirection: "row",
  justifyContent: "space-between",
},

taskLabel: {
  color: "#DDD8FF",
  fontSize: 11,
},

taskValue: {
  color: "#FFF",
  fontWeight: "700",
  marginTop: 4,
},

statsContainer: {
  flexDirection: "row",
  justifyContent: "space-between",
  marginBottom: 16,
},

statCard: {
  width: "31%",
  backgroundColor: "#FFF",
  borderRadius: 18,
  padding: 14,
},

statIcon: {
  width: 30,
  height: 30,
  borderRadius: 15,
  justifyContent: "center",
  alignItems: "center",
  marginBottom: 12,
},

statNumber: {
  fontSize: 26,
  fontWeight: "700",
},

statText: {
  color: "#777",
  fontSize: 12,
},

progressCard: {
  backgroundColor: "#FFF",
  borderRadius: 18,
  padding: 16,
  marginBottom: 18,
},

progressHeader: {
  flexDirection: "row",
  justifyContent: "space-between",
},

progressTitle: {
  fontWeight: "600",
},

progressPercent: {
  fontWeight: "700",
},

progressBar: {
  height: 6,
  backgroundColor: "#ECECEC",
  borderRadius: 999,
  marginTop: 14,
},

progressFill: {
  height: 6,
  backgroundColor: "#6C5CE7",
  borderRadius: 999,
},

progressLabel: {
  marginTop: 12,
  fontSize: 12,
  color: "#888",
},

listTitle: {
  fontSize: 18,
  fontWeight: "700",
  marginBottom: 12,
},

submissionCard: {
  backgroundColor: "#FFF",
  borderRadius: 16,
  padding: 14,
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 10,
},

avatar: {
  width: 42,
  height: 42,
  borderRadius: 21,
  backgroundColor: "#E5E7EB",
  marginRight: 12,
},

studentName: {
  fontWeight: "600",
},

studentDate: {
  fontSize: 12,
  color: "#888",
  marginTop: 4,
},

statusBadge: {
  paddingHorizontal: 10,
  paddingVertical: 5,
  borderRadius: 999,
},

greenBadge: {
  backgroundColor: "#DDF7E7",
},

orangeBadge: {
  backgroundColor: "#FFE9D6",
},

statusText: {
  fontSize: 11,
  fontWeight: "600",
},
});