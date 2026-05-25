import { View, Text, StyleSheet } from 'react-native';

export default function NuevaNotaScreen() {
  return (
    <View style={styles.container}>
      <Text>Nueva nota</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});