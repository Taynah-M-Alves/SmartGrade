import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  FlatList
} from "react-native";

import {
  Feather,
  MaterialIcons,
  Ionicons,
  FontAwesome5,
  Entypo,
  AntDesign,
} from "@expo/vector-icons";
import { router } from "expo-router";

import { useState, useEffect } from "react";

import PageContainer from "components/PageContainer";
import { useAuth } from "hooks/useAuth";

export default function ProfessorHome() {
  const api = process.env.EXPO_PUBLIC_BASE_URL;
  const { user, token } = useAuth()

  console.log('user', user)
  console.log('')

  const [atividades, setAtividades] = useState([]);
  
    async function findAtividades() {
      try {
        const response = await fetch(`${api}tasks`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
  
        const data = await response.json();
  
        if (!response.ok) {
          throw new Error(
            data.message || "Erro ao buscar atividades"
          );
        }
  
        const minhasAtividades = data.filter(
        (atividade: any) => Number(atividade.createdById) === Number(user?.id)
      );
  
      setAtividades(minhasAtividades);
  
        console.log("data",data);
  
        console.log("atividades", atividades)
      } catch (error: any) {
        alert(error.message);
      }
    }
  
    useEffect(() => {
    if (token && user?.id) {
      findAtividades();

      console.log("atividadesEffect", atividades)
    }
  }, [token, user]);
  return (
    <View style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 120 }}
      >

        {/* WELCOME */}
        <View style={styles.welcomeContainer}>
          <Text style={styles.welcomeText}>BEM-VINDO(A) DE VOLTA</Text>

          <Text style={styles.title}>
            Olá Professor(a) {user?.name}
          </Text>
        </View>

        {/* BUTTON */}
        <TouchableOpacity style={styles.createButton}>
          <AntDesign name="plus" size={24} color="#fff" />

          <Text style={styles.createButtonText}>Nova Atividade</Text>
        </TouchableOpacity>

        {/* CARDS */}
        <View style={styles.card}>
          <View style={styles.cardTop}>

            <View style={styles.indiceCard}>
               <MaterialIcons
              name="assignment-add"
              size={36}
              color="#3457B1"
            />
            <Text style={styles.cardNumber}>{atividades.length}</Text>
            </View>
           
          </View>
          <Text style={styles.cardLabel}>Trabalhos criados</Text>
        </View>

        <View style={styles.card}>
          <AntDesign name="star" size={22} color="#B13BB5" />

          <Text style={styles.cardNumber}>{atividades.length}</Text>

          <Text style={styles.cardLabel}>
            Feedbacks gerados
          </Text>
        </View>

        {/* SECTION TITLE */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>
            Minhas Atividades
          </Text>

          <TouchableOpacity>
            <Text style={styles.viewAll}>Ver todos</Text>
          </TouchableOpacity>
        </View>

       

        {atividades.length > 0 ? (
        atividades.map((item: any) => (
    <View key={item.id} style={styles.workCard}>
      <View style={styles.workIcon}>
        <Feather
          name="file-text"
          size={24}
          color="#4C6FFF"
        />
      </View>

      <View style={styles.workContent}>
        <Text style={styles.workTitle}>
          {item.title}
        </Text>

        <Text style={styles.workSubtitle}>
          {item.description}
        </Text>

        <View style={styles.workFooter}>
          <View>
            <Text style={styles.deliveryNumber}>
              {item.code}
            </Text>

            <Text style={styles.deliveryText}>
              CÓDIGO
            </Text>
          </View>

          <View style={styles.status}>
            <Text style={styles.statusText}>
              {new Date(item.deadline).toLocaleDateString(
                "pt-BR"
              )}
            </Text>
          </View>
        </View>
      </View>


      <TouchableOpacity
    style={styles.deleteButton}
    onPress={() =>
    router.push({
      pathname: "/(protected)/professor/Apagaratividade",
      params: {
        id: item.id,
        countSubmission: item.submissions.length
      },
    })
  }
>
  <Feather
    name="trash"
    size={22}
    color="#fff"
  />
</TouchableOpacity>
    </View>
  ))
) : (
  <View
    style={{
      marginTop: 30,
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <MaterialIcons
      name="assignment"
      size={60}
      color="#C7CDD8"
    />

    <Text
      style={{
        marginTop: 12,
        fontSize: 16,
        color: "#666",
        textAlign: "center",
      }}
    >
      Você ainda não criou nenhuma atividade.
    </Text>
  </View>
)}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 50
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

  deleteButton: {
  width: 45,
  height: 45,
  borderRadius: 12,
  backgroundColor: "#EF4444",
  justifyContent: "center",
  alignItems: "center",
  marginLeft: 10,
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
    display: 'flex',
    backgroundColor: "#F6F6F6",
    marginHorizontal: 20,
    marginTop: 22,
    borderRadius: 18,
    padding: 24,
  },

  cardTop: {
    display: 'flex',
    flexDirection: "row",
    justifyContent: "space-between",
  },

  indiceCard:{
    height: 'auto',
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    alignContent: 'center',
    justifyContent: 'center'
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

  description: {
    color: "#4B5563",
    marginBottom: 10,
  },

  info: {
    color: "#6B7280",
    marginBottom: 4,
  },

  professor: {
    marginTop: 8,
    fontWeight: "600",
    color: "#111827",
  },
});