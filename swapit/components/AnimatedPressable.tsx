import { Pressable, PressableProps, type StyleProp, type ViewStyle } from "react-native";
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from "react-native-reanimated";

interface AnimatedPressableProps extends PressableProps {
  className?: string;
  outerStyle?: StyleProp<ViewStyle>;
  children: React.ReactNode;
}

const AnimatedPressable = ({ onPress, className, outerStyle, children, ...props }: AnimatedPressableProps) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
  }));

  return (
    <Animated.View style={[animatedStyle, outerStyle]}>
      <Pressable
        onPress={onPress}
        onPressIn={() => { scale.value = withTiming(0.97, { duration: 100 }); }}
        onPressOut={() => { scale.value = withTiming(1, { duration: 150 }); }}
        className={className}
        style={outerStyle ? { flex: 1 } : undefined}
        {...props}
      >
        {children}
      </Pressable>
    </Animated.View>
  );
};

export default AnimatedPressable;
