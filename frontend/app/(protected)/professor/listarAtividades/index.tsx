import { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useAuth } from "hooks/useAuth";

export default function ListarAtividades() {
  const api = process.env.EXPO_PUBLIC_BASE_URL;

  const { token, user } = useAuth();

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

      console.log(data);

      console.log("teste",
  JSON.stringify(
    data[1].submissions,
    null,
    2
  )
);

      console.log("submis",data.submissions)

      console.log("atividades", atividades)
    } catch (error: any) {
      alert(error.message);
    }
  }

  

  useEffect(() => {
  if (token && user?.id) {
    findAtividades();
  }
}, [token, user]);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.button}
        onPress={findAtividades}
      >
        <Text style={styles.buttonText}>
          Buscar Atividades
        </Text>
      </TouchableOpacity>

      {atividades.length > 0 ? (
        <FlatList
        data={atividades}
        keyExtractor={(item: any) =>
          item.id.toString()
        }
        renderItem={({ item }: any) => (
          <View style={styles.card}>
            <Text style={styles.title}>
              {item.title}
            </Text>

            <Text style={styles.description}>
              {item.description}
            </Text>

            <Text style={styles.info}>
              Código: {item.code}
            </Text>

            <Text style={styles.info}>
              Prazo:{" "}
              {new Date(
                item.deadline
              ).toLocaleDateString("pt-BR")}
            </Text>

            <Text style={styles.professor}>
              Professor:{" "}
              {item.createdBy?.name}
            </Text>
          </View>
        )}
      />
       ) : (
        <Text>Não foi encontrado nenhuma atividade</Text>
      )}

      
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: 80
  },

  button: {
    backgroundColor: "#2F5BB7",
    padding: 14,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 20,
  },

  buttonText: {
    color: "#FFF",
    fontWeight: "600",
  },

  card: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#2F5BB7",
    marginBottom: 8,
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