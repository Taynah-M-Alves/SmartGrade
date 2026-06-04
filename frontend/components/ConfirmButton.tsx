import React from "react";
import { Text, TouchableOpacity, StyleSheet } from "react-native";
import { styles } from "app/screens/Feedback/styles";

type Props = {
    onPress: () => void;
}

export default function ConfirmButton({ onPress }: Props) {
    return (
        <TouchableOpacity style={styles.confirmButton} onPress={onPress}>
            <Text style={styles.confirmButtonText}>Confirmar Exclusão</Text>
        </TouchableOpacity>
    );
}