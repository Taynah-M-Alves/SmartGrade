import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function ProgressCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>IA analisando seu envio...</Text>
      <Text style={styles.percent}>68%</Text>

      <View style={styles.barBackground}>
        <View style={styles.barFill} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    marginBottom: 18,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },
  title: {
    fontWeight: '600',
    marginBottom: 8,
    color: colors.textPrimary,
  },
  percent: {
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 10,
  },
  barBackground: {
    height: 8,
    backgroundColor: colors.border,
    borderRadius: 10,
  },
  barFill: {
    width: '68%',
    height: 8,
    backgroundColor: colors.primary,
    borderRadius: 10,
  },
});