import { View, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { Typography } from "@/components/ui/Typography";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";
import { MY_ITEMS } from "@/src/data";

const STATS = [
  { num: '5', label: 'Active', icon: 'megaphone-outline' as const },
  { num: '12', label: 'Swaps', icon: 'swap-horizontal-outline' as const },
  { num: '4.9', label: 'Rating', icon: 'star-outline' as const },
];

export default function ProfileScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [tab, setTab] = useState<'items' | 'history'>('items');

  const logout = () =>
    Alert.alert('Sign out', 'Are you sure?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Sign out', style: 'destructive', onPress: () => router.replace('/') },
    ]);

  const itemMenu = (title: string) =>
    Alert.alert(title, undefined, [
      { text: 'Edit listing' },
      { text: 'Mark as swapped' },
      { text: 'Delete listing', style: 'destructive' },
      { text: 'Cancel', style: 'cancel' },
    ]);

  return (
    <ScreenWrapper username="Jakub Tomczyk" withTopBar withScroll>
      {/* Avatar + name */}
      <View className="items-center my-4">
        <View className="w-28 h-28 rounded-full border-[6px] border-primary dark:border-primary-dark items-center justify-center bg-accent dark:bg-accent-dark mb-3">
          <Typography className="text-4xl font-bold text-primary dark:text-primary-dark">JT</Typography>
        </View>
        <Typography variant="title">Jakub Tomczyk</Typography>
        <View className="flex-row items-center gap-1 mt-1">
          <Ionicons name="location-outline" size={14} color={theme.muted} />
          <Typography variant="muted">Kielce, Poland</Typography>
        </View>
        <View className="flex-row items-center gap-1 mt-2 bg-accent dark:bg-accent-dark rounded-full px-3 py-1">
          <Ionicons name="checkmark-circle" size={14} color={theme.primary} />
          <Typography className="text-xs text-primary dark:text-primary-dark font-bold">Verified user</Typography>
        </View>
      </View>

      {/* Stats */}
      <View className="flex-row rounded-[25px] border-[6px] border-primary dark:border-primary-dark bg-background dark:bg-background-dark mb-4">
        {STATS.map((s, i) => (
          <View key={s.label} className={`flex-1 items-center py-4 ${i > 0 ? 'border-l-[2px] border-secondary dark:border-secondary-dark' : ''}`}>
            <Ionicons name={s.icon} size={20} color={theme.primary} />
            <Typography className="text-xl font-bold text-primary dark:text-primary-dark mt-1">{s.num}</Typography>
            <Typography variant="muted" className="text-xs">{s.label}</Typography>
          </View>
        ))}
      </View>

      {/* Tabs */}
      <View className="flex-row justify-center mb-4 gap-6">
        {(['items', 'history'] as const).map(t => (
          <AnimatedPressable
            key={t}
            onPress={() => setTab(t)}
            className={`flex-1 items-center py-3 rounded-xl ${tab === t ? 'bg-background dark:bg-background-dark border-[2px] border-primary dark:border-primary-dark' : ''}`}
          >
            <View className="flex-row items-center gap-2">
              <Ionicons
                name={t === 'items' ? 'megaphone-outline' : 'cube-outline'}
                size={16}
                color={tab === t ? theme.primary : theme.muted}
              />
              <Typography className={`text-sm font-semibold ${tab === t ? 'text-primary dark:text-primary-dark' : 'text-muted dark:text-muted-dark'}`}>
                {t === 'items' ? 'My Listings' : 'Swap History'}
              </Typography>
            </View>
          </AnimatedPressable>
        ))}
      </View>

      {tab === 'items' ? (
        MY_ITEMS.map(item => (
          <View key={item.id} className="flex-row items-center rounded-[25px] border-[6px] border-primary dark:border-primary-dark p-4 mt-3 bg-background dark:bg-background-dark">
            <View className={`w-14 h-14 rounded-xl border-[3px] items-center justify-center mr-3 ${item.status === 'active' ? 'border-primary dark:border-primary-dark bg-accent dark:bg-accent-dark' : 'border-secondary dark:border-secondary-dark bg-surface dark:bg-surface-dark'}`}>
              <Ionicons name={item.iconName as any} size={26} color={item.status === 'active' ? theme.primary : theme.muted} />
            </View>
            <View className="flex-1">
              <Typography className="font-semibold" numberOfLines={1}>{item.title}</Typography>
              <Typography variant="muted" className="text-xs">Added: {item.date}</Typography>
              <View className={`self-start mt-1 rounded-full px-2 py-0.5 ${item.status === 'active' ? 'bg-accent dark:bg-accent-dark' : 'bg-surface dark:bg-surface-dark'}`}>
                <View className="flex-row items-center gap-1">
                  <Ionicons
                    name={item.status === 'active' ? 'ellipse' : 'checkmark-circle'}
                    size={10}
                    color={item.status === 'active' ? '#22c55e' : theme.muted}
                  />
                  <Typography className={`text-xs font-bold ${item.status === 'active' ? 'text-primary dark:text-primary-dark' : 'text-muted dark:text-muted-dark'}`}>
                    {item.status === 'active' ? 'Active' : 'Swapped'}
                  </Typography>
                </View>
              </View>
            </View>
            <AnimatedPressable
              onPress={() => itemMenu(item.title)}
              accessibilityRole="button"
              accessibilityLabel={`Options for ${item.title}`}
              className="p-2"
            >
              <Ionicons name="ellipsis-horizontal" size={20} color={theme.muted} />
            </AnimatedPressable>
          </View>
        ))
      ) : (
        <View className="items-center py-12 gap-4">
          <View className="w-24 h-24 rounded-full border-[6px] border-secondary dark:border-secondary-dark items-center justify-center bg-accent dark:bg-accent-dark">
            <Ionicons name="cube-outline" size={40} color={theme.primary} />
          </View>
          <Typography variant="subTitle">No swap history</Typography>
          <Typography variant="muted" className="text-center px-8">
            Once you complete a swap and rate the other user, it will appear here.
          </Typography>
        </View>
      )}

      {/* Help & FAQ */}
      <AnimatedPressable
        onPress={() => router.push('/faq')}
        className="flex-row items-center justify-center gap-2 rounded-full border-[3px] border-primary dark:border-primary-dark py-3 mt-6"
      >
        <Ionicons name="help-circle-outline" size={18} color={theme.primary} />
        <Typography className="font-semibold text-primary dark:text-primary-dark">Help & FAQ</Typography>
      </AnimatedPressable>

      {/* Sign out */}
      <AnimatedPressable
        onPress={logout}
        className="flex-row items-center justify-center gap-2 rounded-full border-[3px] border-secondary dark:border-secondary-dark py-3 mt-3 mb-4"
      >
        <Ionicons name="log-out-outline" size={18} color={theme.muted} />
        <Typography variant="muted" className="font-semibold">Sign out</Typography>
      </AnimatedPressable>
    </ScreenWrapper>
  );
}
