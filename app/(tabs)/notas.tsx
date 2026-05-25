import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNotesStore } from '../../store/notesStore';
import NoteCard from '../../components/items/NoteCard';
import { useRouter } from 'expo-router';

export default function NotasScreen() {
  const notes = useNotesStore(state => state.notes);
  const router = useRouter();

  if (notes.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hay notas todavía</Text>
        <Text style={styles.emptySubtext}>Pulsa + para crear una</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={notes}
      renderItem={({ item }) => (
        <NoteCard note={item} onPress={() => router.push(`/(tabs)/notas/${item.id}`)} />
      )}
        // @ts-ignore
      estimatedItemSize={100}
    />
  );
}

const styles = StyleSheet.create({
  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyText: { fontSize: 18, fontWeight: '600', marginBottom: 8 },
  emptySubtext: { fontSize: 14, color: '#6B7280' },
});