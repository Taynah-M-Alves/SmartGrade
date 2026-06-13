import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import {
  Feather,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";

export default function ProfessorHome() {
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* WELCOME */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>BEM-VINDO DE VOLTA</Text>

          <Text style={styles.title}>
            Bom dia, Professor{"\n"}Roberto
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.createButton}>
          <AntDesign name="plus" size={24} color="#fff" />

          <Text style={styles.createButtonText}>Criar Rubrica</Text>
        </TouchableOpacity>

        {/* CARDS */}
        <View style={styles.card}>
          <View style={styles.cardTop}>
            <MaterialIcons
              name="assignment-late"
              size={28}
              color="#3457B1"
            />

            <View style={styles.urgentBadge}>
              <Text style={styles.badgeText}>URGENTE</Text>
            </View>
          </View>

          <Text style={styles.cardNumber}>12</Text>
          <Text style={styles.cardLabel}>Trabalhos pendentes</Text>
        </View>

        <View style={styles.card}>
          <Ionicons name="people" size={28} color="#9B3BB5" />

          <Text style={styles.cardNumber}>148</Text>
          <Text style={styles.cardLabel}>Alunos ativos</Text>
        </View>

        <View style={styles.card}>
          <AntDesign name="star" size={24} color="#A13BB5" />

          <View style={styles.averageRow}>
            <Text style={styles.cardNumber}>84%</Text>

            <Text style={styles.upText}>↑ 4%</Text>
          </View>

          <View style={styles.progressBackground}>
            <View style={styles.progressFill} />
          </View>

          <Text style={styles.cardLabel}>Média da turma</Text>
        </View>

        <View style={styles.card}>
          <AntDesign name="star" size={22} color="#B13BB5" />

          <Text style={styles.cardNumber}>2.4k</Text>

          <Text style={styles.cardLabel}>
            Feedbacks de IA gerados
          </Text>
        </View>

        {/* SECTION TITLE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Trabalhos Recentes
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

        {/* WORK CARD 1 */}
        <View style={styles.workCard}>
          <View style={styles.workIcon}>
            <Feather
              name="file-text"
              size={24}
              color="#4C6FFF"
            />
          </View>

          <View style={styles.workContent}>
            <Text style={styles.workTitle}>
              Intro à Mecânica Quântica - Semestral
            </Text>

            <Text style={styles.workSubtitle}>
              Criado há 2 dias • Departamento de Ciências
            </Text>

            <View style={styles.workFooter}>
              <View>
                <Text style={styles.deliveryNumber}>42/45</Text>
                <Text style={styles.deliveryText}>
                  ENTREGAS
                </Text>
              </View>

              <View style={styles.status}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: "#C73C3C" },
                  ]}
                />
                <Text style={styles.statusText}>
                  Corrigindo
                </Text>
              </View>
            </View>
          </View>

          <Entypo
            name="dots-three-vertical"
            size={18}
            color="#444"
          />
        </View>

        {/* WORK CARD 2 */}
        <View style={styles.workCard}>
          <View
            style={[
              styles.workIcon,
              { backgroundColor: "#F5E7FA" },
            ]}
          >
            <Feather
              name="edit"
              size={24}
              color="#A13BB5"
            />
          </View>

          <View style={styles.workContent}>
            <Text style={styles.workTitle}>
              Teoria Literária Moderna: Ensaio Final
            </Text>

            <Text style={styles.workSubtitle}>
              Criado há 5 dias • Humanas
            </Text>

            <View style={styles.workFooter}>
              <View>
                <Text style={styles.deliveryNumber}>
                  128/130
                </Text>
                <Text style={styles.deliveryText}>
                  ENTREGAS
                </Text>
              </View>

              <View style={styles.status}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: "#00B884" },
                  ]}
                />
                <Text style={styles.statusText}>
                  Concluído
                </Text>
              </View>
            </View>
          </View>

          <Entypo
            name="dots-three-vertical"
            size={18}
            color="#444"
          />
        </View>

        {/* WORK CARD 3 */}
        <View style={styles.workCard}>
          <View
            style={[
              styles.workIcon,
              { backgroundColor: "#F6D8F7" },
            ]}
          >
            <Feather
              name="code"
              size={24}
              color="#A13BB5"
            />
          </View>

          <View style={styles.workContent}>
            <Text style={styles.workTitle}>
              Eficiência Algorítmica - Quiz #4
            </Text>

            <Text style={styles.workSubtitle}>
              Criado há 1 semana • Ciência da Computação
            </Text>

            <View style={styles.workFooter}>
              <View>
                <Text style={styles.deliveryNumber}>89/90</Text>
                <Text style={styles.deliveryText}>
                  ENTREGAS
                </Text>
              </View>

              <View style={styles.status}>
                <View
                  style={[
                    styles.dot,
                    { backgroundColor: "#F0A000" },
                  ]}
                />
                <Text style={styles.statusText}>
                  Rascunho
                </Text>
              </View>
            </View>
          </View>

          <Entypo
            name="dots-three-vertical"
            size={18}
            color="#444"
          />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: "#000",
  },

  header: {
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 24,
    paddingTop: 55,
    paddingBottom: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  logo: {
    fontSize: 22,
    fontWeight: "700",
    color: "#3457B1",
  },

  avatar: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: "#F28C63",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#7F8CFF",
  },

  welcomeContainer: {
    paddingHorizontal: 25,
    marginTop: 35,
  },

  welcomeText: {
    color: "#B63CC8",
    fontWeight: "700",
    fontSize: 14,
    marginBottom: 12,
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: "#1D2433",
  },

  createButton: {
    marginHorizontal: 20,
    marginTop: 25,
    height: 70,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "#6B5FD6",
  },

  createButtonText: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "700",
  },

  card: {
    backgroundColor: "#F6F6F6",
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 18,
    padding: 24,
  },

  cardTop: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  urgentBadge: {
    backgroundColor: "#FF6B6B",
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
  },

  badgeText: {
    color: "#621111",
    fontWeight: "700",
    fontSize: 12,
  },

  cardNumber: {
    fontSize: 40,
    fontWeight: "800",
    color: "#303844",
    marginTop: 12,
  },

  cardLabel: {
    color: "#5D6570",
    fontSize: 18,
    marginTop: 4,
  },

  averageRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  upText: {
    color: "#3457B1",
    fontWeight: "700",
    fontSize: 18,
  },

  progressBackground: {
    height: 8,
    backgroundColor: "#D6DCE5",
    borderRadius: 10,
    marginVertical: 16,
  },

  progressFill: {
    width: "84%",
    height: 8,
    borderRadius: 10,
    backgroundColor: "#6B5FD6",
  },

  sectionHeader: {
    marginTop: 40,
    marginHorizontal: 22,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1D2433",
  },

  viewAll: {
    color: "#3457B1",
    fontWeight: "700",
  },

  workCard: {
    backgroundColor: "#F6F6F6",
    marginHorizontal: 20,
    marginTop: 18,
    borderRadius: 18,
    padding: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  workIcon: {
    width: 48,
    height: 58,
    borderRadius: 12,
    backgroundColor: "#E5EBFF",
    justifyContent: "center",
    alignItems: "center",
  },

  workContent: {
    flex: 1,
    marginLeft: 14,
  },

  workTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#303844",
  },

  workSubtitle: {
    color: "#666",
    marginTop: 4,
    fontSize: 14,
  },

  workFooter: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  deliveryNumber: {
    fontSize: 18,
    fontWeight: "800",
    color: "#303844",
  },

  deliveryText: {
    fontSize: 11,
    color: "#666",
  },

  status: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#DCE2E8",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 20,
  },

  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },

  statusText: {
    fontWeight: "600",
    color: "#39424E",
  },
});