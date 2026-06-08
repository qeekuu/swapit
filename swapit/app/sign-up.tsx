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

export default function SignUpScreen() {
  const router = useRouter();
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPass, setShowPass] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const register = () => {
    if (!name.trim() || !email.trim() || !password.trim() || !confirmPassword.trim()) {
      Alert.alert('Missing fields', 'Please fill in all fields.');
      return;
    }
    if (password !== confirmPassword) {
      Alert.alert('Password mismatch', 'Passwords do not match.');
      return;
    }
    router.replace('/(tabs)');
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
            <Ionicons name="person-add-outline" size={42} color={theme.primary} />
          </View>
          <Typography variant="title">Create account</Typography>
          <Typography variant="muted" className="text-center mt-2">
            Join SwapIt and start exchanging items in your neighborhood.
          </Typography>
        </View>

        <View className="bg-surface dark:bg-surface-dark rounded-[24px] p-6 gap-4">
          <View className="gap-2">
            <Typography variant="muted">Full name</Typography>
            <AppInput
              type="rounded"
              placeholder="e.g. Jakub Tomczyk"
              autoCapitalize="words"
              value={name}
              onChangeText={setName}
              leftElement={<Ionicons name="person-outline" size={18} color={theme.muted} />}
            />
          </View>

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

          <View className="gap-2">
            <Typography variant="muted">Password</Typography>
            <AppInput
              type="rounded"
              placeholder="min. 8 characters"
              secureTextEntry={!showPass}
              value={password}
              onChangeText={setPassword}
              leftElement={<Ionicons name="lock-closed-outline" size={18} color={theme.muted} />}
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
          </View>

          <View className="gap-2">
            <Typography variant="muted">Confirm password</Typography>
            <AppInput
              type="rounded"
              placeholder="repeat your password"
              secureTextEntry={!showConfirm}
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              leftElement={<Ionicons name="lock-closed-outline" size={18} color={theme.muted} />}
              rightElement={
                <AnimatedPressable
                  onPress={() => setShowConfirm(p => !p)}
                  accessibilityRole="button"
                  accessibilityLabel={showConfirm ? 'Hide password' : 'Show password'}
                >
                  <Typography variant="muted" className="font-bold">{showConfirm ? 'Hide' : 'Show'}</Typography>
                </AnimatedPressable>
              }
            />
          </View>

          <AnimatedPressable
            onPress={register}
            className="bg-primary dark:bg-primary-dark rounded-full items-center p-4 mt-2"
          >
            <View className="flex-row items-center gap-2">
              <Ionicons name="checkmark-circle-outline" size={20} color="white" />
              <Typography variant="subTitle" className="text-white">Create Account</Typography>
            </View>
          </AnimatedPressable>

          <View className="flex-row items-center justify-center">
            <View className="flex-1 h-[1px] bg-secondary dark:bg-secondary-dark" />
            <Typography variant="muted" className="px-2">or sign up with</Typography>
            <View className="flex-1 h-[1px] bg-secondary dark:bg-secondary-dark" />
          </View>

          <View className="flex-row items-center justify-center gap-8">
            <AnimatedPressable onPress={register} accessibilityRole="button" accessibilityLabel="Sign up with Google">
              <Ionicons name="logo-google" size={36} color={theme.text} />
            </AnimatedPressable>
            <AnimatedPressable onPress={register} accessibilityRole="button" accessibilityLabel="Sign up with Apple">
              <Ionicons name="logo-apple" size={36} color={theme.text} />
            </AnimatedPressable>
            <AnimatedPressable onPress={register} accessibilityRole="button" accessibilityLabel="Sign up with Facebook">
              <Ionicons name="logo-facebook" size={36} color={theme.text} />
            </AnimatedPressable>
          </View>

          <AnimatedPressable onPress={() => router.back()} className="items-center py-2">
            <Typography variant="muted">Already have an account?{' '}
              <Typography className="font-bold text-primary dark:text-primary-dark">Sign in</Typography>
            </Typography>
          </AnimatedPressable>
        </View>
      </View>
      <View className="h-10" />
    </ScreenWrapper>
  );
}
