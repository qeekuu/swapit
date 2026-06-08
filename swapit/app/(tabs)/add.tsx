import { View, ScrollView, Alert, KeyboardAvoidingView, Platform } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { Typography } from "@/components/ui/Typography";
import { AppInput } from "@/components/ui/AppInput";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";
import { CATEGORIES } from "@/src/data";

const REAL_CATS = CATEGORIES.filter(c => c !== 'Wszystkie');

const CAT_EN: Record<string, string> = {
  Elektronika: 'Electronics', Sport: 'Sports', Muzyka: 'Music',
  Odzież: 'Clothing', Książki: 'Books', Dom: 'Home',
};
const CAT_ICONS: Record<string, string> = {
  Electronics: 'laptop-outline', Sports: 'bicycle', Music: 'musical-notes-outline',
  Clothing: 'shirt-outline', Books: 'book-outline', Home: 'home-outline',
};

export default function AddScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [desc, setDesc] = useState('');
  const [wants, setWants] = useState('');
  const [loc, setLoc] = useState('');
  const [photos, setPhotos] = useState(0);

  const publish = () => {
    if (!title.trim() || !category || !desc.trim() || !wants.trim()) {
      Alert.alert('Missing fields', 'Please fill in all required fields.');
      return;
    }
    Alert.alert('Published!', 'Your listing is now visible to users nearby.', [
      { text: 'Great!', onPress: () => router.replace('/(tabs)') },
    ]);
  };

  return (
    <ScreenWrapper title="New Listing" withTopBar>
      <KeyboardAvoidingView className="flex-1" behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: 40 }}>

          {/* Photo upload */}
          <View className="rounded-[25px] border-[6px] border-primary dark:border-primary-dark mt-4 bg-accent dark:bg-accent-dark overflow-hidden">
            {photos === 0 ? (
              <AnimatedPressable
                onPress={() => setPhotos(p => Math.min(p + 1, 5))}
                className="h-36 items-center justify-center gap-2"
              >
                <Ionicons name="camera-outline" size={36} color={theme.primary} />
                <Typography className="text-primary dark:text-primary-dark font-semibold">Add item photos</Typography>
                <Typography variant="muted" className="text-xs">Tap to add · max 5 photos</Typography>
              </AnimatedPressable>
            ) : (
              <View className="p-4 gap-3">
                <View className="flex-row flex-wrap gap-2">
                  {Array.from({ length: photos }).map((_, i) => (
                    <View key={i} className="w-16 h-16 rounded-xl border-[2px] border-secondary dark:border-secondary-dark bg-background dark:bg-background-dark items-center justify-center">
                      <Ionicons name="image-outline" size={24} color={theme.muted} />
                    </View>
                  ))}
                  {photos < 5 && (
                    <AnimatedPressable
                      onPress={() => setPhotos(p => Math.min(p + 1, 5))}
                      className="w-16 h-16 rounded-xl border-[2px] border-dashed border-primary dark:border-primary-dark items-center justify-center"
                    >
                      <Ionicons name="add" size={24} color={theme.primary} />
                    </AnimatedPressable>
                  )}
                </View>
                <Typography variant="muted" className="text-xs">{photos} / 5 photos added</Typography>
              </View>
            )}
          </View>

          {/* Title */}
          <View className="mt-5 gap-2">
            <Typography variant="muted">Listing title <Typography className="text-red-500">*</Typography></Typography>
            <AppInput
              placeholder="e.g. Trek Marlin 5 mountain bike"
              value={title}
              onChangeText={setTitle}
              maxLength={80}
            />
          </View>

          {/* Category */}
          <View className="mt-4 gap-2">
            <Typography variant="muted">Category <Typography className="text-red-500">*</Typography></Typography>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2 pr-4">
                {REAL_CATS.map(cat => {
                  const en = CAT_EN[cat] ?? cat;
                  const active = category === cat;
                  return (
                    <AnimatedPressable
                      key={cat}
                      onPress={() => setCategory(cat)}
                      className={`flex-row items-center gap-1 px-4 py-2 rounded-full border-[3px] ${
                        active
                          ? 'bg-primary dark:bg-primary-dark border-primary dark:border-primary-dark'
                          : 'bg-background dark:bg-background-dark border-secondary dark:border-secondary-dark'
                      }`}
                    >
                      <Ionicons name={CAT_ICONS[en] as any} size={14} color={active ? 'white' : theme.muted} />
                      <Typography className={`text-sm font-semibold ${active ? 'text-white' : 'text-muted dark:text-muted-dark'}`}>
                        {en}
                      </Typography>
                    </AnimatedPressable>
                  );
                })}
              </View>
            </ScrollView>
          </View>

          {/* Description */}
          <View className="mt-4 gap-2">
            <Typography variant="muted">Item description <Typography className="text-red-500">*</Typography></Typography>
            <AppInput
              placeholder="Describe condition, dimensions, brand, year, any defects..."
              value={desc}
              onChangeText={setDesc}
              multiline
              maxLength={500}
              textAlignVertical="top"
              style={{ height: 90 }}
            />
            <Typography variant="muted" className="text-xs text-right">{desc.length} / 500</Typography>
          </View>

          {/* Looking for */}
          <View className="mt-4 gap-2">
            <Typography variant="muted">What are you looking for in exchange? <Typography className="text-red-500">*</Typography></Typography>
            <AppInput
              placeholder="e.g. camera, laptop, guitar..."
              value={wants}
              onChangeText={setWants}
              leftElement={<Ionicons name="swap-horizontal-outline" size={18} color={theme.muted} />}
            />
          </View>

          {/* Location */}
          <View className="mt-4 gap-2">
            <Typography variant="muted">Meeting place <Typography className="text-red-500">*</Typography></Typography>
            <AppInput
              placeholder="Enter address or use GPS"
              value={loc}
              onChangeText={setLoc}
              leftElement={<Ionicons name="location-outline" size={18} color={theme.muted} />}
            />
            <AnimatedPressable
              onPress={() => setLoc('Kielce, Ogrodowa 5')}
              className="flex-row items-center justify-center gap-2 bg-primary dark:bg-primary-dark rounded-full py-3 mt-1"
            >
              <Ionicons name="locate" size={18} color="white" />
              <Typography className="text-white font-semibold">Use my location</Typography>
            </AnimatedPressable>
          </View>

          <Typography variant="muted" className="text-xs mt-3">* Required fields</Typography>

          {/* Publish */}
          <AnimatedPressable
            onPress={publish}
            className="bg-primary dark:bg-primary-dark rounded-full items-center p-4 mt-6"
          >
            <View className="flex-row items-center gap-2">
              <Ionicons name="megaphone-outline" size={20} color="white" />
              <Typography variant="subTitle" className="text-white">Publish Listing</Typography>
            </View>
          </AnimatedPressable>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
}
