import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../../../store/notesStore';
import { colors, spacing, typography } from '../../../constants/theme';

export default function NoteDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { notes, deleteNote } = useNotesStore();
  const note = notes.find(n => n.id === id);

  if (!note) {
    return (
      <View style={styles.container}>
        <Text>Nota no encontrada</Text>
      </View>
    );
  }

  const handleDelete = () => {
    Alert.alert('Eliminar nota', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        deleteNote(id);
        router.replace('/(tabs)/notas');
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.date}>{new Date(note.createdAt).toLocaleDateString()}</Text>
      <Text style={styles.content}>{note.content}</Text>
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteBtnText}>Eliminar nota</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, marginBottom: spacing.xs },
  date: { fontSize: typography.sizes.xs, color: colors.light.textSecondary, marginBottom: spacing.md },
  content: { fontSize: typography.sizes.md, lineHeight: 24, color: colors.light.text },
  deleteBtn: { marginTop: spacing.xl, backgroundColor: colors.danger, borderRadius: 8, padding: spacing.md, alignItems: 'center' },
  deleteBtnText: { color: '#fff', fontWeight: typography.weights.semibold },
});