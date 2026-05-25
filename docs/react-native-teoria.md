# React Native – Teoría

## ¿Qué diferencia hay entre React Native y una app nativa?

Una app nativa se desarrolla con el lenguaje oficial de cada plataforma: Swift o Objective-C para iOS, y Kotlin o Java para Android. Esto significa mantener dos bases de código distintas para la misma app.

React Native permite escribir una única base de código en JavaScript/TypeScript que se convierte en componentes nativos reales del sistema operativo. Cuando usas un componente como `<View>`, no se renderiza HTML en un WebView: React Native habla directamente con el sistema operativo para crear vistas nativas reales, lo que le da el aspecto y rendimiento de una app nativa.

La arquitectura tiene dos hilos que se comunican entre sí:
- **JS thread**: donde corre el código React y la lógica de negocio.
- **UI thread nativo**: donde se renderizan los componentes del sistema operativo.

Cuando el JS thread se bloquea, la interfaz se congela. Entender esto es clave para escribir apps con rendimiento real.

## ¿Qué es el Metro bundler?

Metro es el empaquetador de JavaScript usado por React Native. Su función es tomar todos los archivos del proyecto (TypeScript, imágenes, fuentes) y transformarlos en un único bundle que la app puede ejecutar.

Durante el desarrollo, Metro actúa como un servidor local: cuando modificas un archivo, detecta el cambio y actualiza la app en tiempo real mediante Fast Refresh sin necesidad de recompilar.

## ¿Por qué Expo Go no es suficiente en proyectos reales?

Expo Go es una app genérica que permite ejecutar proyectos Expo escaneando un QR, sin necesidad de compilar nada. Es útil para aprender y prototipar rápido.

Sin embargo, tiene una limitación importante: solo soporta los módulos nativos que Expo incluye por defecto. Si el proyecto necesita módulos nativos personalizados como cámara avanzada, notificaciones push o biometría, Expo Go no puede ejecutarlos.

En proyectos reales se usa un **Development Build**: un binario propio generado con EAS Build que incluye exactamente los módulos nativos que el proyecto necesita.

## Sistemas de diseño

### Comparativa: Gluestack UI vs React Native Paper

**Gluestack UI**
- Filosofía similar a Tailwind CSS
- Altamente personalizable mediante tokens de diseño
- Ideal para identidades visuales únicas
- Mejor integración con TypeScript

**React Native Paper**
- Implementación de Material Design lista para usar
- Integración profunda con Android
- Menos flexible para diseños personalizados
- Más fácil de usar sin configuración

### Elección: Gluestack UI

Se elige Gluestack UI porque NoteFlow necesita una identidad visual propia con soporte para modo oscuro y claro mediante tokens de diseño personalizados. Su filosofía basada en tokens encaja mejor con el sistema de diseño definido en `constants/theme.ts`.

## Gestión de estado

### Comparativa: useState vs Context API vs Zustand

**useState**
- Solo para estado local de un componente
- No comparte estado entre componentes distantes
- Ideal para formularios o toggles simples

**Context API**
- Comparte estado entre componentes sin pasar props
- Provoca re-renders innecesarios en todos los consumidores
- Adecuado para datos poco cambiantes como el tema

**Zustand**
- Estado global sin providers anidados
- Solo re-renderiza los componentes que usan el dato que cambió
- API simple y compatible con TypeScript
- Estándar moderno en proyectos React Native

Se usa Zustand en NoteFlow porque el estado de las notas se consume en múltiples pantallas y necesita actualizarse con frecuencia sin provocar re-renders innecesarios.

## Rendimiento en listas

### FlatList vs FlashList

**FlatList** es el componente estándar de React Native para listas. Su problema es que el reciclaje de componentes no es eficiente: al hacer scroll rápido con listas largas aparecen pantallas en blanco.

**FlashList** de Shopify resuelve esto reciclando componentes de forma más agresiva. La propiedad `estimatedItemSize` le indica cuánto espacio ocupará cada elemento antes de renderizarlo. Cuanto más preciso sea ese valor, mejor será el rendimiento.

Se usa FlashList en todas las pantallas de NoteFlow para garantizar un scroll fluido incluso con muchas notas.