import { View, Text, StyleSheet } from 'react-native';

export default function ChecklistsScreen() {
  return (
    <View style={styles.container}>
      <Text>Tareas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});