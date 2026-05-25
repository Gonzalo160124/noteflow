import { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { z } from 'zod';
import { useNotesStore } from '../store/notesStore';
import { colors, spacing, typography } from '../constants/theme';

const noteSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  content: z.string().min(1, 'El contenido no puede estar vacío'),
});

const checklistSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
});

const ideaSchema = z.object({
  title: z.string().min(3, 'El título debe tener al menos 3 caracteres'),
  tags: z.string().min(1, 'Añade al menos una etiqueta'),
});

type NoteType = 'note' | 'checklist' | 'idea';

const IDEA_COLORS = ['#FEF3C7', '#DBEAFE', '#D1FAE5', '#FCE7F3', '#EDE9FE'];

export default function NuevaNotaScreen() {
  const router = useRouter();
  const { addNote, addChecklist, addIdea } = useNotesStore();

  const [type, setType] = useState<NoteType>('note');
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [color, setColor] = useState(IDEA_COLORS[0]);
  const [checklistItem, setChecklistItem] = useState('');
  const [checklistItems, setChecklistItems] = useState<string[]>([]);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const addChecklistItem = () => {
    if (checklistItem.trim()) {
      setChecklistItems([...checklistItems, checklistItem.trim()]);
      setChecklistItem('');
    }
  };

  const handleSave = () => {
    setErrors({});
    const now = new Date();
    const id = Date.now().toString();

    if (type === 'note') {
      const result = noteSchema.safeParse({ title, content });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((e: any) => { fieldErrors[e.path[0]] = e.message; });
        setErrors(fieldErrors);
        return;
      }
      addNote({ id, title, content, createdAt: now, updatedAt: now });
    }

    if (type === 'checklist') {
      const result = checklistSchema.safeParse({ title });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((e: any) => { fieldErrors[e.path[0]] = e.message; });
        setErrors(fieldErrors);
        return;
      }
      addChecklist({
        id, title, createdAt: now, updatedAt: now,
        items: checklistItems.map((text, i) => ({ id: `${id}-${i}`, text, isCompleted: false })),
      });
    }

    if (type === 'idea') {
      const result = ideaSchema.safeParse({ title, tags });
      if (!result.success) {
        const fieldErrors: Record<string, string> = {};
        result.error.errors.forEach((e: any) => { fieldErrors[e.path[0]] = e.message; });
        setErrors(fieldErrors);
        return;
      }
      addIdea({
        id, title, color, createdAt: now, updatedAt: now,
        tags: tags.split(',').map((t: string) => t.trim()).filter(Boolean),
      });
    }

    router.replace('/(tabs)/notas');
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.label}>Tipo de nota</Text>
        <View style={styles.typeRow}>
          {(['note', 'checklist', 'idea'] as NoteType[]).map(t => (
            <TouchableOpacity
              key={t}
              style={[styles.typeBtn, type === t && styles.typeBtnActive]}
              onPress={() => setType(t)}
            >
              <Text style={[styles.typeBtnText, type === t && styles.typeBtnTextActive]}>
                {t === 'note' ? 'Nota' : t === 'checklist' ? 'Tarea' : 'Idea'}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <Text style={styles.label}>Título</Text>
        <TextInput style={styles.input} value={title} onChangeText={setTitle} placeholder="Título..." />
        {errors.title && <Text style={styles.error}>{errors.title}</Text>}

        {type === 'note' && (
          <>
            <Text style={styles.label}>Contenido</Text>
            <TextInput style={[styles.input, styles.textarea]} value={content} onChangeText={setContent} placeholder="Escribe tu nota..." multiline />
            {errors.content && <Text style={styles.error}>{errors.content}</Text>}
          </>
        )}

        {type === 'checklist' && (
          <>
            <Text style={styles.label}>Añadir tarea</Text>
            <View style={styles.row}>
              <TextInput style={[styles.input, { flex: 1 }]} value={checklistItem} onChangeText={setChecklistItem} placeholder="Nueva tarea..." />
              <TouchableOpacity style={styles.addBtn} onPress={addChecklistItem}>
                <Text style={styles.addBtnText}>+</Text>
              </TouchableOpacity>
            </View>
            {checklistItems.map((item, i) => (
              <Text key={i} style={styles.checkItem}>• {item}</Text>
            ))}
          </>
        )}

        {type === 'idea' && (
          <>
            <Text style={styles.label}>Etiquetas (separadas por comas)</Text>
            <TextInput style={styles.input} value={tags} onChangeText={setTags} placeholder="react, mobile, idea..." />
            {errors.tags && <Text style={styles.error}>{errors.tags}</Text>}
            <Text style={styles.label}>Color</Text>
            <View style={styles.colorRow}>
              {IDEA_COLORS.map(c => (
                <TouchableOpacity key={c} style={[styles.colorCircle, { backgroundColor: c }, color === c && styles.colorSelected]} onPress={() => setColor(c)} />
              ))}
            </View>
          </>
        )}

        <TouchableOpacity style={styles.saveBtn} onPress={handleSave}>
          <Text style={styles.saveBtnText}>Guardar</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  label: { fontSize: typography.sizes.sm, fontWeight: typography.weights.semibold, marginTop: spacing.md, marginBottom: spacing.xs },
  input: { borderWidth: 1, borderColor: colors.light.border, borderRadius: 8, padding: spacing.sm, fontSize: typography.sizes.md },
  textarea: { height: 120, textAlignVertical: 'top' },
  error: { color: colors.danger, fontSize: typography.sizes.xs, marginTop: 4 },
  typeRow: { flexDirection: 'row', gap: spacing.sm },
  typeBtn: { flex: 1, padding: spacing.sm, borderRadius: 8, borderWidth: 1, borderColor: colors.light.border, alignItems: 'center' },
  typeBtnActive: { backgroundColor: colors.primary, borderColor: colors.primary },
  typeBtnText: { fontSize: typography.sizes.sm, color: colors.light.textSecondary },
  typeBtnTextActive: { color: '#fff', fontWeight: typography.weights.semibold },
  row: { flexDirection: 'row', gap: spacing.sm },
  addBtn: { backgroundColor: colors.primary, borderRadius: 8, padding: spacing.sm, justifyContent: 'center', alignItems: 'center', width: 44 },
  addBtnText: { color: '#fff', fontSize: 24, lineHeight: 28 },
  checkItem: { fontSize: typography.sizes.md, marginTop: spacing.xs, color: colors.light.text },
  colorRow: { flexDirection: 'row', gap: spacing.sm, marginTop: spacing.xs },
  colorCircle: { width: 36, height: 36, borderRadius: 18, borderWidth: 2, borderColor: 'transparent' },
  colorSelected: { borderColor: colors.primary },
  saveBtn: { backgroundColor: colors.primary, borderRadius: 8, padding: spacing.md, alignItems: 'center', marginTop: spacing.xl },
  saveBtnText: { color: '#fff', fontSize: typography.sizes.md, fontWeight: typography.weights.semibold },
});