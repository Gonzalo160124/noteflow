import { View, Text, StyleSheet } from 'react-native';

export default function IdeasScreen() {
  return (
    <View style={styles.container}>
      <Text>Ideas</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center' },
});