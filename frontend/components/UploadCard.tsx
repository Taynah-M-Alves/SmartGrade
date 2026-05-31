import React from "react";
import {
  View,
  Text,
  Image,
} from "react-native";

import { globalStyles } from "app/screens/Feedback/styles";

export default function UploadCard() {
  return (
    <View style={globalStyles.imageCard}>
      <Image
        source={{
          uri: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1200",
        }}
        style={globalStyles.image}
      />

      <View style={globalStyles.overlay}>
        <Text style={globalStyles.overlayText}>
          Visualizando seu progresso ao
          longo do semestre.
        </Text>
      </View>
    </View>
  );
}