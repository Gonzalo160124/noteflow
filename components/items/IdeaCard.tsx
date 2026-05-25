import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { IdeaNote } from '../../types';
import { colors, spacing, typography } from '../../constants/theme';

interface IdeaCardProps {
  idea: IdeaNote;
  onPress: () => void;
}

export default function IdeaCard({ idea, onPress }: IdeaCardProps) {
  return (
    <TouchableOpacity style={[styles.card, { backgroundColor: idea.color }]} onPress={onPress}>
      <Text style={styles.title}>{idea.title}</Text>
      <View style={styles.tags}>
        {idea.tags.map(tag => (
          <View key={tag} style={styles.tag}>
            <Text style={styles.tagText}>#{tag}</Text>
          </View>
        ))}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
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
  title: { fontSize: typography.sizes.lg, fontWeight: typography.weights.semibold, marginBottom: spacing.sm },
  tags: { flexDirection: 'row', flexWrap: 'wrap', gap: spacing.xs },
  tag: { backgroundColor: 'rgba(0,0,0,0.1)', borderRadius: 20, paddingHorizontal: spacing.sm, paddingVertical: 2 },
  tagText: { fontSize: typography.sizes.xs },
});