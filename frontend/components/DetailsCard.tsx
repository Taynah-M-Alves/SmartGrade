import React from "react";
import {
  View,
  Text,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { globalStyles } from "app/screens/Feedback/styles";

export default function 
DetailsCard() {
  return (
    <View style={globalStyles.card}>
      <View style={globalStyles.cardHeader}>
        <View
          style={[
            globalStyles.iconBox,
            { backgroundColor: "#FDECEC" },
          ]}
        >
          <Feather
            name="trending-up"
            size={24}
            color="#C0392B"
          />
        </View>

        <Text style={globalStyles.cardTitle}>
          Pontos a Melhorar
        </Text>
      </View>

      <View style={globalStyles.quoteBox}>
        <View style={globalStyles.quoteBar} />

        <Text style={globalStyles.quoteText}>
          "Melhorar a fluidez entre os
          parágrafos 2 e 3."
        </Text>
      </View>

      <Text
        style={{
          marginTop: 20,
          fontSize: 16,
          lineHeight: 28,
          color: "#666",
        }}
      >
        A transição atual parece abrupta,
        passando do contexto histórico
        para a aplicação moderna sem
        uma ponte temática clara.
      </Text>
    </View>
  );
}