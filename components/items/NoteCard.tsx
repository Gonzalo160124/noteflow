import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Note } from '../../types';
import { colors, spacing, typography } from '../../constants/theme';

interface NoteCardProps {
  note: Note;
  onPress: () => void;
}

export default function NoteCard({ note, onPress }: NoteCardProps) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{note.title}</Text>
      <Text style={styles.content} numberOfLines={2}>{note.content}</Text>
      <Text style={styles.date}>{new Date(note.createdAt).toLocaleDateString()}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.light.surface,
    borderRadius: 12,
    padding: spacing.md,
    marginHorizontal: spacing.md,
    marginVertical: spacing.sm,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: { fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, marginBottom: spacing.xs },
  content: { fontSize: typography.sizes.sm, color: colors.light.textSecondary, marginBottom: spacing.sm },
  date: { fontSize: typography.sizes.xs, color: colors.light.textSecondary },
});