import React from "react";
import {View,Text,TouchableOpacity} from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { LinearGradient } from "expo-linear-gradient";
import { globalStyles, styles } from "../screens/Feedback/style";

export default function BottomNav() {
  return (
    <View style={styles.tabBar}>
      <TouchableOpacity style={styles.tabItem}>
        <Feather
          name="grid"
          size={24}
          color="#9BA3B5"
        />
        <Text style={styles.tabText}>PAINEL</Text>
      </TouchableOpacity>

      <TouchableOpacity activeOpacity={0.9}>
        <LinearGradient
          colors={["#2F5BB7", "#9C27B0"]}
          style={styles.activeTab}
        >
          <Feather
            name="clipboard"
            size={24}
            color="#FFF"
          />

          <Text style={styles.activeTabText}>
            TRABALHOS
          </Text>
        </LinearGradient>
      </TouchableOpacity>

      <TouchableOpacity style={styles.tabItem}>
        <Feather
          name="user"
          size={24}
          color="#9BA3B5"
        />

        <Text style={styles.tabText}>PERFIL</Text>
      </TouchableOpacity>
    </View>
  );
}