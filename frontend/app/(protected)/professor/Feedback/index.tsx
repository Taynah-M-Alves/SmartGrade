import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import Header from "../../../../components/Header";
import ScoreCard from "../../../../components/ScoreCard";
import StrengthCard from "../../../../components/StrengthCard";
import DetailsCard from "../../../../components/DetailsCard";
import TipsCard from "../../../../components/TipsCard";
import ProgressCard from "../../../../components/ProgressCard";
import UploadCard from "../../../../components/UploadCard";

import { styles } from "../../../../styles/feedback.styles";

export default function Home() {
  const [page, setPage] = useState("feedback")
  return (
     <View style={{ flex: 1}}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 90 }}
      >
        <Header />
        
        <ScoreCard />

        <StrengthCard />

        <DetailsCard />

        <TipsCard />

        <ProgressCard />

        <UploadCard />

        <View style={{ height: 1 }} />
      </ScrollView>
      
    </View>
  );
}