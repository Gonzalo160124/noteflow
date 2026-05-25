import { View, Text, StyleSheet } from 'react-native';

export default function NotasScreen() {
  return (
    <View style={styles.container}>
      <Text>Notas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});