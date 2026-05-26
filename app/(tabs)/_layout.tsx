import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { colors } from '../../constants/theme';

export default function TabsLayout() {
  const router = useRouter();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: '#6B7280',
        tabBarStyle: { borderTopWidth: 1 },
        headerShown: true,
        headerRight: () => (
          <TouchableOpacity
            onPress={() => router.push('/nueva-nota')}
            style={{ marginRight: 16 }}
          >
            <Ionicons name="add-circle-outline" size={28} color={colors.primary} />
          </TouchableOpacity>
        ),
      }}
    >
      <Tabs.Screen
        name="notas"
        options={{
          title: 'Notas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="document-text-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="checklists"
        options={{
          title: 'Tareas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="checkbox-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="ideas"
        options={{
          title: 'Ideas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb-outline" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen name="notas/[id]" options={{ href: null }} />
      <Tabs.Screen name="checklists/[id]" options={{ href: null }} />
      <Tabs.Screen name="ideas/[id]" options={{ href: null }} />
    </Tabs>
  );
}