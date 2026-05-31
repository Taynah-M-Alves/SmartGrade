import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  View,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import Header from "../../../components/Header";
import ScoreCard from "../../../components/ScoreCard";
import StrengthCard from "../../../components/StrengthCard";
import DetailsCard from "../../../components/DetailsCard";
import TipsCard from "../../../components/TipsCard";
import ProgressCard from "../../../components/ProgressCard";
import UploadCard from "../../../components/UploadCard";
import BottomNav from "../../../components/BottomNav";

import { styles } from "./styles";

export default function Home() {
  const [page, setPage] = useState("Feedback")
  return (
     <View style={{ flex: 1}}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 320 }}
      >
        <Header />
        
        <ScoreCard />

        <StrengthCard />

        <DetailsCard />

        <TipsCard />

        <ProgressCard />

        <UploadCard />

        <View style={{ height: 120 }} />
      </ScrollView>

      <BottomNav />
      
    </View>
  );
}