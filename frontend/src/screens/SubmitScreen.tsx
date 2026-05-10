import { ScrollView, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

import Header from '../components/Header';
import UploadCard from '../components/UploadCard';
import ProgressCard from '../components/ProgressCard';
import DetailsCard from '../components/DetailsCard';
import TipsCard from '../components/TipsCard';

export default function SubmitScreen() {
  return (
    <ScrollView style={styles.container}>
      
      <Header />

      <Text style={styles.title}>Enviar Trabalho</Text>
      <Text style={styles.subtitle}>
        Finalize seu trabalho para Macroeconomia Avançada
      </Text>

      <UploadCard />
      <ProgressCard />
      <DetailsCard />
      <TipsCard />

    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 20,
    paddingTop: 50,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 6,
    color: colors.textPrimary,
  },

  subtitle: {
    color: colors.textSecondary,
    marginBottom: 22,
  },
});