import { View, Text, StyleSheet } from 'react-native';
import { FlashList } from '@shopify/flash-list';
import { useNotesStore } from '../../store/notesStore';
import IdeaCard from '../../components/items/IdeaCard';
import { useRouter } from 'expo-router';

export default function IdeasScreen() {
  const ideas = useNotesStore(state => state.ideas);
  const router = useRouter();

  if (ideas.length === 0) {
    return (
      <View style={styles.empty}>
        <Text style={styles.emptyText}>No hay ideas todavía</Text>
        <Text style={styles.emptySubtext}>Pulsa + para crear una</Text>
      </View>
    );
  }

  return (
    <FlashList
      data={ideas}
      renderItem={({ item }) => (
        <IdeaCard idea={item} onPress={() => router.push(`/(tabs)/ideas/${item.id}`)} />
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