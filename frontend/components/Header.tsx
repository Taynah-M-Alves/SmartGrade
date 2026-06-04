import React from "react";
import {
  View,
  Text,
} from "react-native";

import { globalStyles } from "app/screens/Feedback/styles";

export default function Header() {
  return (
    <View style={globalStyles.header}>
      <Text style={globalStyles.headerTitle}>
        Feedback
      </Text>
      <Text style={globalStyles.headerSubtitle}>
        Veja onde você se destacou e onde pode melhorar
      </Text>
    </View>
  );
}

