import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import * as Haptics from 'expo-haptics';
import { useNotesStore } from '../../../store/notesStore';
import { colors, spacing, typography } from '../../../constants/theme';

export default function ChecklistDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { checklists, deleteChecklist, toggleChecklistItem } = useNotesStore();
  const checklist = checklists.find(c => c.id === id);

  if (!checklist) {
    return (
      <View style={styles.container}>
        <Text>Lista no encontrada</Text>
      </View>
    );
  }

  const handleToggle = (itemId: string) => {
    toggleChecklistItem(id, itemId);
    const updatedItems = checklist.items.map(i =>
      i.id === itemId ? { ...i, isCompleted: !i.isCompleted } : i
    );
    const allDone = updatedItems.every(i => i.isCompleted);
    if (allDone) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    }
  };

  const handleDelete = () => {
    Alert.alert('Eliminar lista', '¿Estás seguro?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Eliminar', style: 'destructive', onPress: () => {
        Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
        deleteChecklist(id);
        router.replace('/(tabs)/checklists');
      }},
    ]);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{checklist.title}</Text>
      {checklist.items.map(item => (
        <TouchableOpacity key={item.id} style={styles.item} onPress={() => handleToggle(item.id)}>
          <View style={[styles.checkbox, item.isCompleted && styles.checkboxDone]} />
          <Text style={[styles.itemText, item.isCompleted && styles.itemTextDone]}>{item.text}</Text>
        </TouchableOpacity>
      ))}
      <TouchableOpacity style={styles.deleteBtn} onPress={handleDelete}>
        <Text style={styles.deleteBtnText}>Eliminar lista</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: spacing.md },
  title: { fontSize: typography.sizes.xl, fontWeight: typography.weights.bold, marginBottom: spacing.md },
  item: { flexDirection: 'row', alignItems: 'center', paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.light.border },
  checkbox: { width: 20, height: 20, borderRadius: 4, borderWidth: 2, borderColor: colors.primary, marginRight: spacing.sm },
  checkboxDone: { backgroundColor: colors.primary },
  itemText: { fontSize: typography.sizes.md },
  itemTextDone: { textDecorationLine: 'line-through', color: colors.light.textSecondary },
  deleteBtn: { marginTop: spacing.xl, backgroundColor: colors.danger, borderRadius: 8, padding: spacing.md, alignItems: 'center' },
  deleteBtnText: { color: '#fff', fontWeight: typography.weights.semibold },
});