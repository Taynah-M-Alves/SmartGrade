import { ScrollView, StyleSheet } from "react-native";
import { ReactNode } from "react";

interface Props {
  children: ReactNode;
}

export default function PageContainer({ children }: Props) {
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {children}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,

    backgroundColor: "#F4F6FB",

    justifyContent: "center",
    alignItems: "center",

    paddingVertical: 60,
    paddingHorizontal: 10,
    
  },
});