import React from "react";
import { View , Text, TouchableOpacity} from "react-native";

import { styles } from './style';
type Props = {
    onPress: () => void;
}

export default function ApagarAtividade({ onPress }: Props) {
    return (
        <View style={styles.container}>
            <Text style={styles.subtitle}>
                Exclusão de Atividade 
            </Text>
            <Text style={styles.title}>
                Atenção
            </Text>

            <Text style={styles.description}>
                Esta atividade será permanentemente excluída e não poderá ser recuperada. Certifique-se de que deseja prosseguir com esta ação.
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
            <TouchableOpacity style={styles.confirmButton} onPress={onPress}>
                <Text style={styles.confirmButtonText}>Confirmar Exclusão</Text>
            </TouchableOpacity>
        </View>
    );
}