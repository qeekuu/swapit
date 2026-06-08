import { View, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import { Typography } from "@/components/ui/Typography";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { AppInput } from "@/components/ui/AppInput";
import AnimatedPressable from "@/components/AnimatedPressable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";

export default function LoginScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPass, setShowPass] = useState(false);

  const login = () => {
    if (!email.trim() || !password.trim()) {
      Alert.alert('Missing fields', 'Please enter your email and password.');
      return;
    }
    router.replace('/(tabs)');
  };

  return (
    <ScreenWrapper withScroll noPadding>
      {/* Logo area */}
      <View className="items-center pt-12 pb-8 px-6">
        <View className="w-28 h-28 rounded-full border-[6px] border-primary dark:border-primary-dark items-center justify-center mb-4">
          <Ionicons name="swap-horizontal" size={52} color={theme.primary} />
        </View>
        <Typography variant="title" className="tracking-widest">SwapIt</Typography>
        <Typography variant="muted" className="mt-1">Exchange items in your neighborhood</Typography>
      </View>

      {/* Form card */}
      <View className="bg-surface dark:bg-surface-dark rounded-[24px] p-6 mx-4 gap-3">
        <View className="mb-2">
          <Typography variant="title">Welcome back!</Typography>
          <Typography variant="muted">Sign in to continue</Typography>
        </View>

        <Typography variant="muted">E-mail</Typography>
        <AppInput
          type="rounded"
          placeholder="email address"
          keyboardType="email-address"
          autoCapitalize="none"
          value={email}
          onChangeText={setEmail}
        />

        <Typography variant="muted">Password</Typography>
        <AppInput
          type="rounded"
          placeholder="password"
          secureTextEntry={!showPass}
          value={password}
          onChangeText={setPassword}
          rightElement={
            <AnimatedPressable
              onPress={() => setShowPass(p => !p)}
              accessibilityRole="button"
              accessibilityLabel={showPass ? 'Hide password' : 'Show password'}
            >
              <Typography variant="muted" className="font-bold">{showPass ? 'Hide' : 'Show'}</Typography>
            </AnimatedPressable>
          }
        />

        <View className="flex-row justify-end mt-1">
          <AnimatedPressable onPress={() => router.push('/forgot-password')}>
            <Typography variant="muted">Forgot password?</Typography>
          </AnimatedPressable>
        </View>

        <AnimatedPressable
          onPress={login}
          className="bg-primary dark:bg-primary-dark rounded-full items-center p-4 mt-2"
        >
          <Typography variant="subTitle" className="text-white">Sign In</Typography>
        </AnimatedPressable>

        <View className="flex-row items-center justify-center">
          <View className="flex-1 h-[1px] bg-secondary dark:bg-secondary-dark" />
          <Typography variant="muted" className="px-2">or sign in with</Typography>
          <View className="flex-1 h-[1px] bg-secondary dark:bg-secondary-dark" />
        </View>

        <View className="flex-row items-center justify-center gap-8">
          <AnimatedPressable onPress={login} accessibilityRole="button" accessibilityLabel="Sign in with Google">
            <Ionicons name="logo-google" size={36} color={theme.text} />
          </AnimatedPressable>
          <AnimatedPressable onPress={login} accessibilityRole="button" accessibilityLabel="Sign in with Apple">
            <Ionicons name="logo-apple" size={36} color={theme.text} />
          </AnimatedPressable>
          <AnimatedPressable onPress={login} accessibilityRole="button" accessibilityLabel="Sign in with Facebook">
            <Ionicons name="logo-facebook" size={36} color={theme.text} />
          </AnimatedPressable>
        </View>

        <View className="flex-row items-center justify-center mt-2 gap-1">
          <Typography variant="muted">Don't have an account?</Typography>
          <AnimatedPressable onPress={() => router.push('/sign-up')}>
            <Typography className="font-bold text-primary dark:text-primary-dark">Sign up</Typography>
          </AnimatedPressable>
        </View>
      </View>
      <View className="h-10" />
    </ScreenWrapper>
  );
}
