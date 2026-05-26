import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../../../store/notesStore';
import { colors, spacing, typography } from '../../../constants/theme';

export default function IdeaDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { ideas, deleteIdea } = useNotesStore();
  const idea = ideas.find(i => i.id === id);

  if (!idea) {
    return (
      <View style={styles.container}>
        <Text>Idea no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Eliminar idea', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        deleteIdea(id);
        router.replace('/(tabs)/ideas');
      }},
    ]);
  };

  return (
    <View style={[styles.container, { backgroundColor: idea.color }]}>
      <Text style={styles.title}>{idea.title}</Text>
      <View style={styles.tags}>
        {idea.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteBtnText}>Eliminar idea</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, marginBottom: spacing.md },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tag: { backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, paddingHorizontal: spacing.sm, paddingVertical: 4 },
  tagText: { fontSize: typography.sizes.sm },
  deleteBtn: { marginTop: spacing.xl, backgroundColor: colors.danger, borderRadius: 8, padding: spacing.md, alignItems: 'center' },
  deleteBtnText: { color: '#fff', fontWeight: typography.weights.semibold },
});