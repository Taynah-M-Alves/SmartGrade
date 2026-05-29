import React from "react";
import { View, Text } from "react-native";

import { styles } from "../screens/Apagaratividade/style";

export default function DeleteCard() {
  return (
    <View>

      <Text style={styles.subtitle}>
        Exclusão de Atividade
      </Text>

      <Text style={styles.title}>
        Atenção
      </Text>

      <Text style={styles.description}>
        Esta atividade será permanentemente excluída e não poderá ser recuperada.
        Certifique-se de que deseja prosseguir com esta ação.
      </Text>

        <View style={styles.infoBox}>
  <View style={styles.boxContent}>
    <Text style={styles.infoNumber}>4</Text>

    <Text style={styles.infoText}>
      Rubricas
    </Text>
  </View>
</View>

<View style={styles.infoBox}>
  <View style={styles.boxContent}>
    <Text style={styles.infoNumber}>2</Text>

    <Text style={styles.infoText}>
      Alunos afetados
    </Text>
  </View>
</View>
    </View>
  );
}