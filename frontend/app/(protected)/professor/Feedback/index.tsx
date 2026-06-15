import React from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
} from "react-native";

import { StatusBar } from "expo-status-bar";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { styles } from "../../../../styles/feedback.styles";

export default function Home() {
  const submission = {
    student: {
      name: "João Silva",
      avatar: "https://i.pravatar.cc/150?img=12",
      submittedAt: "14 de junho de 2026 às 10:32",
      status: "Avaliado",
    },

    document: {
      name: "documentacao_projeto.pdf",
      size: "1.2 MB",
    },

    grade: {
      score: "8,5",
      max: "10",
      message: "Excelente trabalho! 🎉",
    },

    feedback: {
      text:
        "Excelente documentação! O conteúdo está bem estruturado e claro. Sugiro apenas detalhar mais a parte de requisitos funcionais na seção 3.",
      date: "14/06/2026",
      time: "15:45",
    },

    rubric: [
      {
        title: "Organização",
        score: "2 / 2",
        progress: 100,
      },
      {
        title: "Clareza",
        score: "1,5 / 2",
        progress: 75,
      },
      {
        title: "Conteúdo",
        score: "2 / 2",
        progress: 100,
      },
      {
        title: "Referências",
        score: "1 / 2",
        progress: 50,
      },
      {
        title: "Apresentação",
        score: "2 / 2",
        progress: 100,
      },
    ],
  };

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        {/* Header */}
        <View style={styles.header}>

        </View>

        {/* Aluno */}
        <View style={styles.card}>
          <View style={styles.studentRow}>
            <Image
              source={{ uri: submission.student.avatar }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.studentName}>
                {submission.student.name}
              </Text>

              <Text style={styles.studentDate}>
                Enviado em {submission.student.submittedAt}
              </Text>
            </View>

            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {submission.student.status}
              </Text>
            </View>
          </View>
        </View>

        {/* Documento */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Documento enviado
          </Text>

          <View style={styles.documentContainer}>
            <MaterialCommunityIcons
              name="file-pdf-box"
              size={40}
              color="#EF4444"
            />

            <View style={{ flex: 1, marginLeft: 12 }}>
              <Text style={styles.documentName}>
                {submission.document.name}
              </Text>

              <Text style={styles.documentSize}>
                {submission.document.size}
              </Text>
            </View>

            <TouchableOpacity>
              <Text style={styles.link}>
                Visualizar
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nota */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Nota final
          </Text>

          <View style={styles.gradeContainer}>
            <View style={styles.gradeCircle}>
              <Text style={styles.gradeValue}>
                {submission.grade.score}
              </Text>

              <Text style={styles.gradeMax}>
                / {submission.grade.max}
              </Text>
            </View>

            <Text style={styles.gradeMessage}>
              {submission.grade.message}
            </Text>
          </View>
        </View>

        {/* Feedback */}
        <View style={styles.card}>
          <View style={styles.feedbackHeader}>
            <Text style={styles.cardTitle}>
              Feedback do professor
            </Text>

            <Feather
              name="edit-2"
              size={18}
              color="#6C4DFF"
            />
          </View>

          <View style={styles.feedbackBox}>
            <Text style={styles.feedbackText}>
              {submission.feedback.text}
            </Text>

            <Text style={styles.feedbackDate}>
              {submission.feedback.date} • {submission.feedback.time}
            </Text>
          </View>
        </View>

        {/* Rubrica */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>
            Rubrica de avaliação
          </Text>

          {submission.rubric.map((item, index) => (
            <View
              key={index}
              style={{ marginTop: 18 }}
            >
              <View style={styles.rubricHeader}>
                <Text style={styles.rubricTitle}>
                  {item.title}
                </Text>

                <Text style={styles.rubricScore}>
                  {item.score}
                </Text>
              </View>

              <View style={styles.progressBackground}>
                <View
                  style={[
                    styles.progressFill,
                    {
                      width: `${item.progress}%`,
                    },
                  ]}
                />
              </View>
            </View>
          ))}
        </View>

        {/* Botão */}
        <TouchableOpacity
          style={styles.editButton}
        >
          <Text style={styles.editButtonText}>
            Editar avaliação
          </Text>
        </TouchableOpacity>

        <View style={{ height: 20 }} />
      </ScrollView>
    </View>
  );
}