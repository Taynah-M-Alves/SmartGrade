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
  <Text style={styles.infoNumber}>4</Text>

  <Text style={styles.infoText}>
    Rubricas vinculadas
  </Text>

  <View style={styles.divider} />

  <Text style={styles.infoSubText}>
    Serão excluídas permanentemente
  </Text>
</View>

<View style={styles.infoBox}>
  <Text style={styles.infoNumber}>2</Text>

  <Text style={styles.infoText}>
    Alunos vinculados
  </Text>

  <View style={styles.divider} />

  <Text style={styles.infoSubText}>
    Terão os dados desta atividade removidos
  </Text>
</View>
    </View>

  );
}