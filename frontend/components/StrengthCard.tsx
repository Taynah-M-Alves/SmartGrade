import React from "react";
import {
  View,
  Text,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { styles } from "../screens/Feedback/style";

export default function StrengthCard() {
  return (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconBox}>
          <Ionicons
            name="shield-checkmark-outline"
            size={26}
            color="#2F5BB7"
          />
        </View>

        <Text style={styles.cardTitle}>Pontos Fortes</Text>
      </View>

      <View style={styles.bulletContainer}>
        <View style={styles.bullet} />

        <Text style={styles.bulletText}>
          Tese clara e bibliografia bem estruturada.
        </Text>
      </View>
    </View>
  );
}