import React from "react";
import { View, Text } from "react-native";

import {styles} from "app/screens/Apagaratividade/styles";

export default function WarningBox() {
    return (
        <View style={styles.container}>

            <Text style={styles.title}>
                Atenção!
            </Text>
            <Text style={styles.description}>
                Esta ação é irreversível. Certifique-se de que deseja excluir esta atividade permanentemente.
            </Text>
        </View>
    );
}