import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
const router = useRouter();

export default function Preview() {
  const { nome, cargo, github } = useLocalSearchParams();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Preview do Card</Text>

      <View style={styles.card}>
        <Text style={styles.name}>{nome}</Text>

        <Text style={styles.info}>{cargo}</Text>

        <Text style={styles.info}>GitHub: {github}</Text>
      </View>

      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/success")}
      >
        <Text style={styles.buttonText}>Confirmar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F172A",
    justifyContent: "center",
    padding: 20,
  },

  title: {
    color: "#fff",
    fontSize: 30,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 30,
  },

  card: {
    backgroundColor: "#1E293B",
    padding: 24,
    borderRadius: 16,
    marginBottom: 30,
  },

  name: {
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },

  info: {
    color: "#CBD5E1",
    fontSize: 18,
    marginBottom: 8,
  },

  button: {
    backgroundColor: "#22C55E",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },

  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});