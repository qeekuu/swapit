import { View, ScrollView, TextInput, Pressable, ActivityIndicator } from "react-native";
import { useState, useEffect } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { Typography } from "@/components/ui/Typography";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";
import { ITEMS, CATEGORIES } from "@/src/data";

const EN_CATEGORIES = ['All', 'Electronics', 'Sports', 'Music', 'Clothing', 'Books', 'Home'];
const CAT_MAP: Record<string, string> = {
  'Wszystkie': 'All', 'Elektronika': 'Electronics', 'Sport': 'Sports',
  'Muzyka': 'Music', 'Odzież': 'Clothing', 'Książki': 'Books', 'Dom': 'Home',
};
const CAT_ICONS: Record<string, string> = {
  All: 'star-outline', Electronics: 'laptop-outline', Sports: 'bicycle',
  Music: 'musical-notes-outline', Clothing: 'shirt-outline', Books: 'book-outline', Home: 'home-outline',
};

export default function HomeScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [search, setSearch] = useState('');
  const [activeCat, setActiveCat] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const activeCatOrAll = activeCat || 'All';
  const filtered = ITEMS.filter(it =>
    (activeCatOrAll === 'All' || CAT_MAP[it.category] === activeCatOrAll) &&
    it.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <ScreenWrapper username="Jakub" withTopBar withScroll={false}>
      <View className="flex-row items-center border-[3px] border-secondary dark:border-secondary-dark bg-surface dark:bg-surface-dark rounded-full px-4 py-3 mt-2 mb-4 gap-2">
        <Ionicons name="search-outline" size={18} color={theme.muted} />
        <TextInput
          className="flex-1 text-text dark:text-text-dark"
          placeholder="Search items..."
          placeholderTextColor={theme.muted}
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <Pressable onPress={() => setSearch('')} accessibilityRole="button" accessibilityLabel="Clear search">
            <Ionicons name="close-circle" size={18} color={theme.muted} />
          </Pressable>
        )}
      </View>

      <View className="rounded-[25px] border-[6px] border-primary dark:border-primary-dark mb-4 overflow-hidden bg-accent dark:bg-accent-dark">
        <View className="items-center justify-center py-5">
          <Ionicons name="map" size={48} color={theme.primary} />
          <Typography className="text-primary dark:text-primary-dark font-semibold mt-1">
            Kielce, center – {filtered.length} listings nearby
          </Typography>
        </View>
        <View className="flex-row items-center justify-end gap-2 px-3 pb-3">
          <View className="flex-row items-center gap-1 bg-background dark:bg-background-dark rounded-full px-3 py-1">
            <Ionicons name="location" size={12} color={theme.primary} />
            <Typography className="text-xs text-muted dark:text-muted-dark">5 km radius</Typography>
          </View>
          <AnimatedPressable
            accessibilityRole="button"
            accessibilityLabel="Filter listings"
            className="flex-row items-center gap-1 bg-primary dark:bg-primary-dark rounded-full px-3 py-1"
          >
            <Ionicons name="options-outline" size={12} color="white" />
            <Typography className="text-xs text-white font-bold">Filter</Typography>
          </AnimatedPressable>
        </View>
      </View>

      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{ flexShrink: 0 }} className="mb-2">
        <View style={{ flexDirection: 'row', gap: 8, paddingRight: 16 }}>
          {EN_CATEGORIES.map(cat => (
            <AnimatedPressable
              key={cat}
              onPress={() => setActiveCat(cat)}
              outerStyle={{
                paddingHorizontal: 16, paddingVertical: 8,
                borderRadius: 999, borderWidth: 3,
                backgroundColor: activeCatOrAll === cat ? theme.primary : theme.background,
                borderColor: activeCatOrAll === cat ? theme.primary : theme.secondary,
              }}
              style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}
            >
              <Ionicons name={CAT_ICONS[cat] as any} size={14} color={activeCatOrAll === cat ? 'white' : theme.muted} />
              <Typography style={{ fontSize: 14, fontWeight: '600', color: activeCatOrAll === cat ? 'white' : theme.muted }}>
                {cat}
              </Typography>
            </AnimatedPressable>
          ))}
        </View>
      </ScrollView>

      <View className="flex-row justify-between items-center mt-2 mb-1">
        <Typography variant="subTitle">
          {activeCatOrAll === 'All' ? 'All listings' : activeCatOrAll}
        </Typography>
        <Typography variant="muted">{filtered.length} items</Typography>
      </View>

      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 100 }}>
        {loading ? (
          <View className="items-center py-16">
            <ActivityIndicator size="large" color={theme.primary} />
            <Typography variant="muted" className="mt-3">Loading listings...</Typography>
          </View>
        ) : filtered.length === 0 ? (
          <View className="items-center py-16 gap-3">
            <Ionicons name="search-outline" size={48} color={theme.muted} />
            <Typography variant="subTitle">No listings found</Typography>
            <Typography variant="muted">Try a different category or search term</Typography>
          </View>
        ) : (
          <View className="flex-row flex-wrap justify-between">
            {filtered.map(item => (
              <Pressable
                key={item.id}
                onPress={() => router.push(`/detail/${item.id}`)}
                style={{ width: '48%' }}
                className="rounded-[20px] border-[6px] border-primary dark:border-primary-dark p-4 mt-3 bg-background dark:bg-background-dark"
              >
                <View className="self-center w-20 h-20 rounded-full border-[3px] border-primary dark:border-primary-dark items-center justify-center mb-3 bg-accent dark:bg-accent-dark">
                  <Ionicons name={item.iconName as any} size={36} color={theme.primary} />
                </View>
                <Typography className="font-semibold text-sm leading-5 h-10" numberOfLines={2}>{item.title}</Typography>
                <Typography variant="muted" className="text-xs mt-0.5" numberOfLines={1}>wants: {item.wants}</Typography>
                <View className="flex-row items-center justify-between mt-3">
                  <View className="flex-row items-center gap-1 bg-accent dark:bg-accent-dark rounded-full px-2 py-1">
                    <Ionicons name="location-outline" size={11} color={theme.primary} />
                    <Typography className="text-xs text-primary dark:text-primary-dark font-bold">{item.dist}</Typography>
                  </View>
                  <View className="flex-row items-center gap-0.5">
                    <Ionicons name="star" size={12} color={theme.primary} />
                    <Typography variant="muted" className="text-xs">{item.rating}</Typography>
                  </View>
                </View>
              </Pressable>
            ))}
          </View>
        )}
      </ScrollView>
    </ScreenWrapper>
  );
}
