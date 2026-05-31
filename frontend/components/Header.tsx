import React from "react";
import {
  View,
  Text,
} from "react-native";

import { globalStyles } from "app/screens/Feedback/styles";

export default function ProgressCard() {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.statsTitle}>
        ESTATÍSTICAS RÁPIDAS
      </Text>

      <View style={globalStyles.statRow}>
        <Text style={globalStyles.statLabel}>
          Média da Turma
        </Text>

        <Text style={globalStyles.statValue}>
          7.2
        </Text>
      </View>

      <View style={globalStyles.progressBar}>
        <View
          style={[
            globalStyles.progressFill,
            { width: "72%" },
          ]}
        />
      </View>

      <View
        style={[
          globalStyles.statRow,
          { marginTop: 24 },
        ]}
      >
        <Text style={globalStyles.statLabel}>
          Seu Percentil
        </Text>

        <Text style={globalStyles.statValue}>
          Top 15%
        </Text>
      </View>

      <View style={globalStyles.progressBar}>
        <View
          style={[
            globalStyles.progressFill,
            {
              width: "85%",
              backgroundColor: "#9C27B0",
            },
          ]}
        />
      </View>
    </View>
  );
}