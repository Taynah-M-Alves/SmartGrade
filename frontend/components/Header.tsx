import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../styles/colors';

export default function Header() {
  return (
    <View style={styles.header}>
      <Text style={styles.logo}>SmartGrade</Text>
      <View style={styles.avatar} />
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 28,
  },
  logo: {
    color: colors.primary,
    fontWeight: '700',
    fontSize: 16,
  },
  avatar: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.primary,
  },
});