import React from "react";
import {
  View,
  Text,
} from "react-native";

import { LinearGradient } from "expo-linear-gradient";

import { styles } from "app/screens/Feedback/styles";
export default function ScoreCard() {
  return (
    <>
      <View style={styles.scoreContainer}>
        <LinearGradient
          colors={["#2F5BB7", "#9C27B0"]}
          style={styles.circle}
        >
          <View style={styles.innerCircle}>
            <Text style={styles.score}>8.5</Text>
            <Text style={styles.scoreLabel}>NOTA FINAL</Text>
          </View>
        </LinearGradient>
      </View>

      <Text style={styles.title}>Excelente Progresso!</Text>

      <Text style={styles.description}>
        Sua compreensão dos conceitos centrais está claramente
        refletida neste trabalho.
      </Text>
    </>
  );
}