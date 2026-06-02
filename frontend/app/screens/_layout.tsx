import { Stack } from "expo-router";
import { View, Text, StyleSheet } from "react-native";
import Header from '../../components/Header'

export default function ScreensLayout() {
  return (
    <View style={styles.container}>
      {/* <Text style={styles.text}>TESTANDO !!</Text> */}
      

      <View style={styles.content}>
        <Header/>
        <Stack screenOptions={{ headerShown: false }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  text: {
    color: "#FFFFFF",
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 60,
    marginBottom: 20,
  },

  content: {
    flex: 1,
  },
});