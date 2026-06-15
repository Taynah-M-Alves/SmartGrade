import React, { useState } from "react";
import { View , Text, TouchableOpacity} from "react-native";
import { router, useLocalSearchParams } from "expo-router";
import { styles } from '../../../../styles/apagarAtividade.styles';
import { useAuth } from "hooks/useAuth";
type Props = {
    onPress: () => void;
}

export default function ApagarAtividade({ onPress }: Props) {

    const [loading, setLoading] = useState(false)

    const api = process.env.EXPO_PUBLIC_BASE_URL;
      const { token } = useAuth();

    const {
      id,
      countSubmission
    } = useLocalSearchParams();

    const handleDelete = async () => {
      try {
            setLoading(true);
      
            const response = await fetch(`${api}tasks/${id}`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            });
      
            const data = await response.json();
      
            if (!response.ok) {
              throw new Error(data.message || "Erro ao criar atividade.");
            }
    
            router.back()

          } catch (error: any) {
            console.error("Erro", error.message || "Não foi possível criar a atividade.");
          } finally {
            setLoading(false);
          }
        };

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
  <Text style={styles.infoNumber}>{countSubmission}</Text>

  <Text style={styles.infoText}>
    Alunos Afetados
  </Text>

  <View style={styles.divider} />

  <Text style={styles.infoSubText}>
    Terão os dados desta atividade removidos
  </Text>
</View>
            <TouchableOpacity style={styles.confirmButton} onPress={handleDelete}>
                <Text style={styles.confirmButtonText}>Confirmar Exclusão</Text>
            </TouchableOpacity>
        </View>
    );
}