# Configuración de herramientas de IA – NoteFlow

## Claude (claude.ai)

### Prompt de sistema / contexto configurado
Para obtener respuestas coherentes con el proyecto, se proporciona el siguiente contexto al inicio de cada conversación:

**Stack tecnológico:** React Native con Expo SDK 56, TypeScript, Expo Router, Zustand, AsyncStorage, FlashList y Zod.

**Convenciones de nombre:**
- Componentes en PascalCase: `NoteCard.tsx`
- Hooks personalizados con prefijo `use`: `useNotes.ts`
- Stores de Zustand en camelCase: `notesStore.ts`
- Carpetas en minúsculas: `components/`, `store/`, `types/`

**Estructura de carpetas:**
- `app/` – rutas de Expo Router
- `components/` – componentes reutilizables
- `store/` – stores de Zustand
- `types/` – interfaces TypeScript
- `constants/` – tokens de diseño y configuración
- `docs/` – documentación del proyecto

**Restricciones de arquitectura:**
- No usar Context API para estado global, usar Zustand
- No usar FlatList, usar FlashList
- No usar fetch directo, centralizar en servicios
- Toda la navegación a través de Expo Router

### Por qué esta configuración
Proporcionar el contexto técnico desde el principio evita que la IA genere código incompatible con las decisiones de arquitectura ya tomadas, ahorrando tiempo de corrección.

## Cursor

### Archivo `.cursorrules`
Se crea un archivo `.cursorrules` en la raíz del proyecto con las mismas convenciones y restricciones descritas arriba, para que Cursor las aplique automáticamente en cada sugerencia de código.