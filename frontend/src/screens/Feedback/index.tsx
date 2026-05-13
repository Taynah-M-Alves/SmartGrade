import React from "react";
import {
  SafeAreaView,
  ScrollView,
} from "react-native";

import { StatusBar } from "expo-status-bar";

import Header from "../../components/Header";
import ScoreCard from "../../components/ScoreCard";
import StrengthCard from "../../components/StrengthCard";
import DetailsCard from "../../components/DetailsCard";
import TipsCard from "../../components/TipsCard";
import ProgressCard from "../../components/ProgressCard";
import UploadCard from "../../components/UploadCard";
import BottomNav from "../../components/BottomNav";

import { styles } from "./style";

export default function Home() {
  return (
    <SafeAreaView style={styles.scoreContainer}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 220 }}
      >
        <Header />

        <ScoreCard />

        <StrengthCard />

        <DetailsCard />

        <TipsCard />

        <ProgressCard />

        <UploadCard />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}