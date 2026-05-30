import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

import Feather from "@expo/vector-icons/Feather";

import { styles } from "../screens/Feedback/style";

export default function Header() {
  return (
    <View style={styles.header}>
      <TouchableOpacity>
        <Feather name="menu" size={30} color="#2F5BB7" />
      </TouchableOpacity>

      <Text style={styles.logo}>SmartGrade</Text>

      <View style={styles.headerRight}>
        <Text style={styles.headerTitle}>
          Resultado{"\n"}do Trabalho
        </Text>

        <Image
          source={{
            uri: "https://cdn-icons-png.flaticon.com/512/3135/3135715.png",
          }}
          style={styles.avatar}
        />
      </View>
    </View>
  );
}