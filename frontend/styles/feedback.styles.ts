import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F7FB",
  },

  header: {
    marginTop: 60,
    marginHorizontal: 20,
    marginBottom: 20,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1E1E1E",
  },

  card: {
    backgroundColor: "#FFFFFF",
    marginHorizontal: 20,
    marginBottom: 16,
    padding: 20,
    borderRadius: 24,

    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.06,
    shadowRadius: 8,

    elevation: 3,
  },

  /* Aluno */
  studentRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  avatar: {
    width: 58,
    height: 58,
    borderRadius: 29,
    marginRight: 14,
  },

  studentName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1E1E1E",
  },

  studentDate: {
    marginTop: 4,
    fontSize: 13,
    color: "#7A7A7A",
  },

  statusBadge: {
    backgroundColor: "#E7F7EE",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },

  statusText: {
    color: "#2E9E5B",
    fontSize: 12,
    fontWeight: "700",
  },

  /* Títulos */
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1E1E1E",
    marginBottom: 16,
  },

  /* Documento */
  documentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },

  documentName: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E1E1E",
  },

  documentSize: {
    marginTop: 4,
    fontSize: 13,
    color: "#7A7A7A",
  },

  link: {
    color: "#6C4DFF",
    fontWeight: "700",
    fontSize: 14,
  },

  /* Nota */
  gradeContainer: {
    alignItems: "center",
  },

  gradeCircle: {
    width: 120,
    height: 120,
    borderRadius: 60,

    backgroundColor: "#F3F0FF",

    justifyContent: "center",
    alignItems: "center",

    marginBottom: 16,
  },

  gradeValue: {
    fontSize: 40,
    fontWeight: "bold",
    color: "#6C4DFF",
  },

  gradeMax: {
    fontSize: 16,
    color: "#7A7A7A",
  },

  gradeMessage: {
    fontSize: 15,
    color: "#1E1E1E",
    fontWeight: "600",
  },

  /* Feedback */
  feedbackHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  feedbackBox: {
    marginTop: 8,
    backgroundColor: "#F8F7FF",
    borderRadius: 16,
    padding: 16,
  },

  feedbackText: {
    fontSize: 15,
    color: "#4A4A4A",
    lineHeight: 24,
  },

  feedbackDate: {
    marginTop: 14,
    fontSize: 12,
    color: "#8A8A8A",
  },

  /* Rubrica */
  rubricHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },

  rubricTitle: {
    fontSize: 15,
    fontWeight: "600",
    color: "#1E1E1E",
  },

  rubricScore: {
    fontSize: 15,
    fontWeight: "700",
    color: "#6C4DFF",
  },

  progressBackground: {
    height: 8,
    borderRadius: 999,
    backgroundColor: "#ECECEC",
    overflow: "hidden",
  },

  progressFill: {
    height: "100%",
    backgroundColor: "#6C4DFF",
    borderRadius: 999,
  },

  /* Botão */
  editButton: {
    marginHorizontal: 20,
    marginTop: 10,
    marginBottom: 30,

    height: 56,
    borderRadius: 18,

    backgroundColor: "#6C4DFF",

    justifyContent: "center",
    alignItems: "center",

    shadowColor: "#6C4DFF",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,

    elevation: 5,
  },

  editButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});