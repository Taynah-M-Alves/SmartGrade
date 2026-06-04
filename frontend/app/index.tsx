import { Redirect } from "expo-router";

export default function Home() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Bem-vindo</Text>

      <Text style={styles.subtitle}>
        Sistema de Gerenciamento
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/screens/Apagaratividade")}
      >
        <Text style={styles.buttonText}>Ir para Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },

  title: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: "#CBD5E1",
    marginBottom: 40,
    textAlign: "center",
  },

  button: {
    backgroundColor: "#2563EB",
    paddingVertical: 14,
    paddingHorizontal: 40,
    borderRadius: 12,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});
