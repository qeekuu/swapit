import { View, Alert } from "react-native";
import { useState } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { Typography } from "@/components/ui/Typography";
import { AppInput } from "@/components/ui/AppInput";
import AnimatedPressable from "@/components/AnimatedPressable";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";

export default function ForgotPasswordScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  const send = () => {
    if (!email.trim()) {
      Alert.alert('Missing field', 'Please enter your email address.');
      return;
    }
    setSent(true);
  };

  return (
    <ScreenWrapper withScroll noPadding>
      <View className="px-6 pt-4">
        <AnimatedPressable
          onPress={() => router.back()}
          accessibilityRole="button"
          accessibilityLabel="Go back"
          className="w-10 h-10 rounded-full border-[3px] border-primary dark:border-primary-dark items-center justify-center bg-background dark:bg-background-dark mb-6"
        >
          <Ionicons name="arrow-back" size={18} color={theme.primary} />
        </AnimatedPressable>

        <View className="items-center mb-8">
          <View className="w-24 h-24 rounded-full border-[6px] border-primary dark:border-primary-dark items-center justify-center mb-4 bg-accent dark:bg-accent-dark">
            <Ionicons name="lock-open-outline" size={42} color={theme.primary} />
          </View>
          <Typography variant="title">Forgot password?</Typography>
          <Typography variant="muted" className="text-center mt-2">
            Enter the email linked to your account and we'll send you a reset link.
          </Typography>
        </View>

        {sent ? (
          <View className="rounded-[24px] border-[6px] border-primary dark:border-primary-dark bg-accent dark:bg-accent-dark p-6 items-center gap-4">
            <Ionicons name="mail-open-outline" size={48} color={theme.primary} />
            <Typography variant="subTitle" className="text-center">Check your inbox!</Typography>
            <Typography variant="muted" className="text-center">
              We sent a password reset link to{' '}
              <Typography className="font-bold text-primary dark:text-primary-dark">{email}</Typography>.
            </Typography>
            <AnimatedPressable
              onPress={() => router.back()}
              className="bg-primary dark:bg-primary-dark rounded-full items-center py-4 px-8 mt-2"
            >
              <Typography variant="subTitle" className="text-white">Back to Sign In</Typography>
            </AnimatedPressable>
          </View>
        ) : (
          <View className="bg-surface dark:bg-surface-dark rounded-[24px] p-6 gap-4">
            <View className="gap-2">
              <Typography variant="muted">E-mail address</Typography>
              <AppInput
                type="rounded"
                placeholder="your@email.com"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                leftElement={<Ionicons name="mail-outline" size={18} color={theme.muted} />}
              />
            </View>

            <AnimatedPressable
              onPress={send}
              className="bg-primary dark:bg-primary-dark rounded-full items-center p-4 mt-2"
            >
              <View className="flex-row items-center gap-2">
                <Ionicons name="send-outline" size={18} color="white" />
                <Typography variant="subTitle" className="text-white">Send Reset Link</Typography>
              </View>
            </AnimatedPressable>

            <AnimatedPressable onPress={() => router.back()} className="items-center py-2">
              <Typography variant="muted">Remember your password?{' '}
                <Typography className="font-bold text-primary dark:text-primary-dark">Sign in</Typography>
              </Typography>
            </AnimatedPressable>
          </View>
        )}
      </View>
      <View className="h-10" />
    </ScreenWrapper>
  );
}
