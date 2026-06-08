import { View } from "react-native";
import { useRouter } from "expo-router";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { Typography } from "@/components/ui/Typography";
import AnimatedPressable from "@/components/AnimatedPressable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";

const FAQ_ITEMS = [
  {
    q: "How does SwapIt work?",
    a: "Browse listings from users nearby. When you find something interesting, tap 'Propose a Swap' to offer one of your items in exchange.",
  },
  {
    q: "How do I add a listing?",
    a: "Tap the Add tab at the bottom of the screen. Fill in the title, category, description and what you're looking for in exchange, then tap 'Publish Listing'.",
  },
  {
    q: "What happens when I accept a swap?",
    a: "You'll see a confirmation and can then use the 'Send a Message' button to arrange a meetup with the other person.",
  },
  {
    q: "Can I decline a proposal?",
    a: "Yes. In the Offers tab, tap 'Decline' on any proposal. You'll be asked to confirm before the proposal is declined.",
  },
  {
    q: "Is my location shared with other users?",
    a: "Only an approximate area (e.g. 'Kielce, center') is shown. Your exact address is never shared.",
  },
  {
    q: "How do I sign out?",
    a: "Go to your Profile tab and scroll to the bottom — tap 'Sign out'.",
  },
];

export default function FAQScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];

  return (
    <ScreenWrapper withScroll>
      {/* Header row with back button */}
      <View className="flex-row items-center mb-4 gap-3">
        <AnimatedPressable onPress={() => router.back()} hitSlop={8}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </AnimatedPressable>
        <Typography className="font-bold text-lg tracking-widest">Help & FAQ</Typography>
      </View>

      <Typography variant="muted" className="mb-4">
        Frequently asked questions about SwapIt.
      </Typography>

      {FAQ_ITEMS.map((item, i) => (
        <View
          key={i}
          className="rounded-[20px] border-[4px] border-primary dark:border-primary-dark bg-background dark:bg-background-dark p-4 mb-3"
        >
          <View className="flex-row items-start gap-3 mb-2">
            <View className="w-7 h-7 rounded-full bg-accent dark:bg-accent-dark items-center justify-center mt-0.5">
              <Typography className="text-xs font-bold text-primary dark:text-primary-dark">Q</Typography>
            </View>
            <Typography className="font-semibold flex-1">{item.q}</Typography>
          </View>
          <View className="flex-row items-start gap-3">
            <View className="w-7 h-7 rounded-full bg-surface dark:bg-surface-dark items-center justify-center mt-0.5">
              <Ionicons name="chatbubble-outline" size={14} color={theme.muted} />
            </View>
            <Typography variant="muted" className="flex-1 leading-5">{item.a}</Typography>
          </View>
        </View>
      ))}
    </ScreenWrapper>
  );
}
