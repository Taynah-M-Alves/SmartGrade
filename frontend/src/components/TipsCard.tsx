import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function TipsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Dicas da IA</Text>

      <Text style={styles.text}>
        Certifique-se de revisar seu trabalho antes de enviar.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    marginBottom: 30,
    shadowColor: '#0F172A',
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 6 },
    shadowRadius: 14,
    elevation: 2,
  },
  title: {
    color: colors.primary,
    fontWeight: '700',
    marginBottom: 8,
  },
  text: {
    color: colors.textSecondary,
  },
});