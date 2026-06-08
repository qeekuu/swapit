import { View, Dimensions } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { Typography } from "@/components/ui/Typography";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";
import { SafeAreaView } from "react-native-safe-area-context";

const { width } = Dimensions.get('window');

const SLIDES = [
  {
    icon: "swap-horizontal" as const,
    title: "Welcome to SwapIt",
    description: "Swap items with people nearby — no money needed. Find something you want and offer something you have.",
  },
  {
    icon: "search-outline" as const,
    title: "Discover listings",
    description: "Browse items available in your area. Filter by category or search for something specific.",
  },
  {
    icon: "megaphone-outline" as const,
    title: "Add your listing",
    description: "Got something you no longer need? Post a listing and tell others what you'd like in return.",
  },
  {
    icon: "checkmark-circle-outline" as const,
    title: "Agree & meet up",
    description: "When both sides agree, arrange a meetup and make the swap. It's that simple!",
  },
];

export default function OnboardingScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [step, setStep] = useState(0);

  const isLast = step === SLIDES.length - 1;
  const slide = SLIDES[step];

  const next = () => {
    if (isLast) {
      router.replace('/(tabs)');
    } else {
      setStep(s => s + 1);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={{ flex: 1, paddingHorizontal: 32, justifyContent: 'space-between', paddingVertical: 40 }}>

        {/* Skip */}
        <View style={{ alignItems: 'flex-end' }}>
          {!isLast && (
            <AnimatedPressable onPress={() => router.replace('/(tabs)')}>
              <Typography variant="muted" className="font-semibold">Skip</Typography>
            </AnimatedPressable>
          )}
        </View>

        {/* Illustration */}
        <View style={{ alignItems: 'center', gap: 24 }}>
          <View
            style={{
              width: 160, height: 160, borderRadius: 80,
              borderWidth: 6, borderColor: theme.primary,
              backgroundColor: theme.accent,
              alignItems: 'center', justifyContent: 'center',
            }}
          >
            <Ionicons name={slide.icon} size={72} color={theme.primary} />
          </View>
          <Typography variant="title" className="text-center text-2xl">{slide.title}</Typography>
          <Typography variant="muted" className="text-center leading-6 text-base">{slide.description}</Typography>
        </View>

        {/* Dots + button */}
        <View style={{ gap: 24 }}>
          <View style={{ flexDirection: 'row', justifyContent: 'center', gap: 8 }}>
            {SLIDES.map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === step ? 24 : 8,
                  height: 8, borderRadius: 4,
                  backgroundColor: i === step ? theme.primary : theme.secondary,
                }}
              />
            ))}
          </View>

          <AnimatedPressable
            onPress={next}
            style={{
              backgroundColor: theme.primary,
              borderRadius: 999,
              paddingVertical: 16,
              alignItems: 'center',
            }}
          >
            <Typography style={{ color: 'white', fontWeight: '700', fontSize: 16 }}>
              {isLast ? "Get started" : "Next"}
            </Typography>
          </AnimatedPressable>
        </View>
      </View>
    </SafeAreaView>
  );
}
