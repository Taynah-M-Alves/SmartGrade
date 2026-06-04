import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
} from "react-native";

import { globalStyles } from "app/screens/Feedback/styles";

export default function TipsCard() {
  return (
    <View style={globalStyles.card}>
      <Text style={globalStyles.statsTitle}>
        DICAS PARA MELHORAR
      </Text>
    </View>
  );
}
