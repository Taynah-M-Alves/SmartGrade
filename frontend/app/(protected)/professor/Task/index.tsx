import {
  View,
  Text,
  StyleSheet,
  ScrollView,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

export default function Task() {
  const { task } = useLocalSearchParams();

  const atividade = JSON.parse(
    task as string
  );

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={{
        paddingBottom: 50,
      }}
    >
      <Text style={styles.title}>
        {atividade.title}
      </Text>

      <Text style={styles.description}>
        {atividade.description}
      </Text>

      <View style={styles.infoBox}>
        <Text style={styles.label}>
          Código:
        </Text>

        <Text>{atividade.code}</Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>
          Prazo:
        </Text>

        <Text>
          {new Date(
            atividade.deadline
          ).toLocaleDateString("pt-BR")}
        </Text>
      </View>

      <View style={styles.infoBox}>
        <Text style={styles.label}>
          Total de Entregas:
        </Text>

        <Text>
          {atividade.submissions.length}
        </Text>
      </View>

      <Text style={styles.sectionTitle}>
        Submissões
      </Text>

      {atividade.submissions.length === 0 ? (
        <Text style={styles.emptyText}>
          Nenhuma submissão enviada.
        </Text>
      ) : (
        atividade.submissions.map(
          (submission: any) => (
            <View
              key={submission.id}
              style={styles.submissionCard}
            >
              <Text>
                ID:
                {submission.id}
              </Text>

              <Text>
                Usuário:
                {submission.userId}
              </Text>

              <Text>
                Nota:
                {submission.aiGrade ??
                  "Não avaliada"}
              </Text>

              <Text>
                Feedback:
                {submission.aiFeedback ??
                  "Sem feedback"}
              </Text>

              <Text>
                Data:
                {new Date(
                  submission.createdAt
                ).toLocaleDateString(
                  "pt-BR"
                )}
              </Text>
            </View>
          )
        )
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
  },

  infoBox: {
    marginBottom: 10,
  },

  label: {
    fontWeight: "bold",
  },

  sectionTitle: {
    marginTop: 25,
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  submissionCard: {
    backgroundColor: "#F3F4F6",
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },

  emptyText: {
    color: "#666",
    fontSize: 16,
  },
});