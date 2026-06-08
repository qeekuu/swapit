import { Tabs } from 'expo-router';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { Colors } from '@/src/theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import type { ComponentProps } from 'react';

type IoniconsName = ComponentProps<typeof Ionicons>['name'];

function TabIcon({ name, color, size }: { name: IoniconsName; color: string; size: number }) {
  return <Ionicons name={name} color={color} size={size} />;
}

export default function TabsLayout() {
  const insets = useSafeAreaInsets();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.muted,
        headerShown: false,
        tabBarStyle: {
          backgroundColor: theme.background,
          height: 70 + (insets.bottom > 0 ? insets.bottom : 10),
          borderTopWidth: 0,
          paddingBottom: insets.bottom > 0 ? insets.bottom : 8,
          paddingTop: 12,
          elevation: 0,
          shadowOpacity: 0,
        },
        tabBarLabelStyle: { fontSize: 12, fontWeight: '600' },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Discover',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'map' : 'map-outline'} color={color} size={focused ? 28 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="add"
        options={{
          title: 'Add',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'add-circle' : 'add-circle-outline'} color={color} size={focused ? 28 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="offers"
        options={{
          title: 'Offers',
          tabBarBadge: 3,
          tabBarBadgeStyle: { backgroundColor: theme.primary },
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'swap-horizontal' : 'swap-horizontal-outline'} color={color} size={focused ? 28 : 22} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused, color }) => (
            <TabIcon name={focused ? 'person' : 'person-outline'} color={color} size={focused ? 28 : 22} />
          ),
        }}
      />
    </Tabs>
  );
}
