import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";

import { globalStyles } from "../screens/Feedback/style";

export default function TipsCard() {
  return (
    <View style={globalStyles.card}>
      <View style={globalStyles.cardHeader}>
        <View
          style={[
            globalStyles.iconBox,
            { backgroundColor: "#F8EBFF" },
          ]}
        >
          <MaterialCommunityIcons
            name="lightbulb-outline"
            size={26}
            color="#9C27B0"
          />
        </View>

        <Text style={globalStyles.cardTitle}>
          Sugestões
        </Text>
      </View>

      <View
        style={{
          backgroundColor: "#F3D8FF",
          alignSelf: "flex-start",
          paddingHorizontal: 14,
          paddingVertical: 8,
          borderRadius: 30,
          marginBottom: 20,
        }}
      >
        <Text
          style={{
            color: "#9C27B0",
            fontWeight: "700",
          }}
        >
          RECOMENDADO POR IA
        </Text>
      </View>

      <Text
        style={{
          fontSize: 18,
          lineHeight: 32,
          color: "#333",
        }}
      >
        Tente usar conectivos mais
        variados como{" "}
        <Text
          style={{
            color: "#9C27B0",
            fontWeight: "700",
          }}
        >
          "Além disso"
        </Text>
        ,{" "}
        <Text
          style={{
            color: "#9C27B0",
            fontWeight: "700",
          }}
        >
          "Por outro lado"
        </Text>{" "}
        ou{" "}
        <Text
          style={{
            color: "#9C27B0",
            fontWeight: "700",
          }}
        >
          "À luz destas descobertas"
        </Text>
        .
      </Text>

      <TouchableOpacity activeOpacity={0.8}>
        <LinearGradient
          colors={["#2F5BB7", "#9C27B0"]}
          style={globalStyles.button}
        >
          <Text style={globalStyles.buttonText}>
            Gerar Exemplos de Transição
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}