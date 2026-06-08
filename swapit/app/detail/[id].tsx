import { View, Alert } from "react-native";
import { useState } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { Typography } from "@/components/ui/Typography";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";
import { ITEMS } from "@/src/data";

const CAT_MAP: Record<string, string> = {
  Elektronika: 'Electronics', Sport: 'Sports', Muzyka: 'Music',
  Odzież: 'Clothing', Książki: 'Books', Dom: 'Home',
};

export default function DetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const item = ITEMS.find(it => it.id === id) ?? ITEMS[0];
  const [proposed, setProposed] = useState(false);
  const [liked, setLiked] = useState(false);

  const propose = () => {
    setProposed(true);
    Alert.alert('Proposal sent!', `${item.owner} has been notified. Wait for their reply!`);
  };

  return (
    <ScreenWrapper withScroll noPadding>
      {/* Back + Like header */}
      <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
        <AnimatedPressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="w-10 h-10 rounded-full border-[3px] border-primary dark:border-primary-dark items-center justify-center bg-background dark:bg-background-dark"
        >
          <Ionicons name="arrow-back" size={18} color={theme.primary} />
        </AnimatedPressable>
        <Typography variant="subTitle" className="flex-1 text-center">Item Details</Typography>
        <AnimatedPressable
          onPress={() => setLiked(l => !l)}
          accessibilityRole="button"
          accessibilityLabel={liked ? 'Remove from favorites' : 'Add to favorites'}
          className="w-10 h-10 rounded-full border-[3px] border-primary dark:border-primary-dark items-center justify-center bg-background dark:bg-background-dark"
        >
          <Ionicons name={liked ? 'heart' : 'heart-outline'} size={18} color={liked ? '#E53935' : theme.primary} />
        </AnimatedPressable>
      </View>

      <View className="px-4">
        {/* Big emoji card */}
        <View className="rounded-[25px] border-[6px] border-primary dark:border-primary-dark h-52 items-center justify-center bg-accent dark:bg-accent-dark mb-4">
          <Ionicons name={item.iconName as any} size={90} color={theme.primary} />
          <View className="absolute bottom-3 right-4 flex-row gap-1">
            {[0, 1, 2].map(i => (
              <View key={i} className={`h-2 rounded-full ${i === 0 ? 'w-5 bg-primary dark:bg-primary-dark' : 'w-2 bg-secondary dark:bg-secondary-dark'}`} />
            ))}
          </View>
        </View>

        {/* Title + meta */}
        <View className="flex-row items-center justify-between mb-1">
          <View className="bg-accent dark:bg-accent-dark rounded-full px-3 py-1">
            <Typography className="text-xs font-bold text-primary dark:text-primary-dark">
              {CAT_MAP[item.category] ?? item.category}
            </Typography>
          </View>
          <Typography variant="muted" className="text-xs">
            {item.daysAgo === 1 ? '1 day' : `${item.daysAgo} days`} ago
          </Typography>
        </View>

        <Typography variant="title" className="mt-2 mb-1">{item.title}</Typography>
        <View className="flex-row items-center gap-1 mb-4">
          <Ionicons name="location-outline" size={14} color={theme.muted} />
          <Typography variant="muted" className="text-sm">{item.loc} · {item.dist} from you</Typography>
        </View>

        {/* Owner card */}
        <View className="rounded-[25px] border-[6px] border-primary dark:border-primary-dark flex-row items-center p-4 gap-3 mb-5">
          <View className="w-12 h-12 rounded-full border-[3px] border-primary dark:border-primary-dark items-center justify-center bg-accent dark:bg-accent-dark">
            <Typography className="font-bold text-primary dark:text-primary-dark">{item.ownerInitials}</Typography>
          </View>
          <View className="flex-1">
            <Typography className="font-semibold">{item.owner}</Typography>
            <View className="flex-row items-center gap-1">
              <Ionicons name="star" size={12} color={theme.primary} />
              <Typography variant="muted" className="text-xs">{item.rating} · {item.trades} swaps</Typography>
            </View>
          </View>
          <AnimatedPressable className="bg-primary dark:bg-primary-dark rounded-full px-3 py-2">
            <Typography className="text-white text-xs font-bold">Profile →</Typography>
          </AnimatedPressable>
        </View>

        {/* Description */}
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="document-text-outline" size={16} color={theme.text} />
          <Typography className="font-bold">Item description</Typography>
        </View>
        <Typography variant="muted" className="leading-6 mb-5">{item.desc}</Typography>

        {/* Looking for */}
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="swap-horizontal-outline" size={16} color={theme.text} />
          <Typography className="font-bold">Looking for in exchange</Typography>
        </View>
        <View className="flex-row flex-wrap gap-2 mb-5">
          {item.wantsCategories.map(cat => (
            <View key={cat} className="bg-accent dark:bg-accent-dark border-[2px] border-secondary dark:border-secondary-dark rounded-full px-4 py-2">
              <Typography className="text-sm font-semibold text-primary dark:text-primary-dark">{CAT_MAP[cat] ?? cat}</Typography>
            </View>
          ))}
        </View>

        {/* Location card */}
        <View className="flex-row items-center gap-2 mb-2">
          <Ionicons name="location-outline" size={16} color={theme.text} />
          <Typography className="font-bold">Meeting location</Typography>
        </View>
        <View className="rounded-[25px] border-[6px] border-primary dark:border-primary-dark h-24 items-center justify-center mb-6 bg-accent dark:bg-accent-dark gap-1">
          <Ionicons name="location" size={24} color={theme.primary} />
          <Typography className="font-semibold text-primary dark:text-primary-dark">{item.loc}</Typography>
          <Typography variant="muted" className="text-xs">Kielce · {item.dist} from you</Typography>
        </View>

        {/* Footer actions */}
        {proposed ? (
          <View className="rounded-[25px] border-[6px] border-primary dark:border-primary-dark items-center py-4 mb-6 bg-accent dark:bg-accent-dark">
            <View className="flex-row items-center gap-2">
            <Ionicons name="checkmark-circle" size={18} color={theme.primary} />
            <Typography className="font-bold text-primary dark:text-primary-dark">Proposal sent! Waiting for a reply.</Typography>
          </View>
          </View>
        ) : (
          <AnimatedPressable
            onPress={propose}
            className="bg-primary dark:bg-primary-dark rounded-full items-center py-4 mb-3"
          >
            <View className="flex-row items-center gap-2">
              <Ionicons name="swap-horizontal" size={20} color="white" />
              <Typography variant="subTitle" className="text-white">Propose a Swap</Typography>
            </View>
          </AnimatedPressable>
        )}

        <AnimatedPressable className="rounded-full items-center py-4 mb-8 border-[3px] border-primary dark:border-primary-dark">
          <View className="flex-row items-center gap-2">
            <Ionicons name="chatbubble-outline" size={18} color={theme.primary} />
            <Typography className="font-bold text-primary dark:text-primary-dark text-base">Send a Message</Typography>
          </View>
        </AnimatedPressable>
      </View>
    </ScreenWrapper>
  );
}
