import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChecklistNote } from '../../types';
import { colors, spacing, typography } from '../../constants/theme';

interface ChecklistCardProps {
  checklist: ChecklistNote;
  onPress: () => void;
}

export default function ChecklistCard({ checklist, onPress }: ChecklistCardProps) {
  const completed = checklist.items.filter(i => i.isCompleted).length;
  const total = checklist.items.length;
  const progress = total > 0 ? completed / total : 0;

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.title}>{checklist.title}</Text>
      <Text style={styles.progress}>{completed}/{total} tareas completadas</Text>
      <View style={styles.progressBarBg}>
        <View style={[styles.progressBarFill, { width: `${progress * 100}%` }]} />
      </View>
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
  progress: { fontSize: typography.sizes.sm, color: colors.light.textSecondary, marginBottom: spacing.sm },
  progressBarBg: { height: 6, backgroundColor: colors.light.border, borderRadius: 3 },
  progressBarFill: { height: 6, backgroundColor: colors.primary, borderRadius: 3 },
});