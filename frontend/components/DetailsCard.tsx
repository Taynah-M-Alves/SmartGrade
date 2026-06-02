import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function DetailsCard() {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>Detalhes do Envio</Text>

      <Text style={styles.text}>Data de entrega: 24 Out, 23:59</Text>
      <Text style={styles.text}>Palavras requeridas: 2.500 - 3.000</Text>
      <Text style={styles.text}>Tentativas restantes: 2 de 3</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    padding: 20,
    borderRadius: 20,
    marginBottom: 20,
    shadowColor: '#0F172A',
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 18,
    elevation: 2,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    marginBottom: 12,
    color: colors.textPrimary,
  },
  text: {
    color: colors.textSecondary,
    lineHeight: 22,
  },
});