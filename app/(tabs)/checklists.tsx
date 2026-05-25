import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNotesStore } from '../../store/notesStore';
import ChecklistCard from '../../components/items/ChecklistCard';
import { useRouter } from 'expo-router';

export default function ChecklistsScreen() {
  const checklists = useNotesStore(state => state.checklists);
  const router = useRouter();

  if (checklists.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hay tareas todavía</Text>
        <Text style={styles.emptySubtext}>Pulsa + para crear una</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={checklists}
      renderItem={({ item }) => (
        <ChecklistCard checklist={item} onPress={() => router.push(`/(tabs)/checklists/${item.id}`)} />
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