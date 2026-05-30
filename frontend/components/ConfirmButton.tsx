import React from "react";
import { View , Text, TouchableOpacity} from "react-native";

import {styles} from "../screens/Apagaratividade/style";

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