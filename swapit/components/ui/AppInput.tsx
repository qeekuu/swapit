import { useColorScheme } from "@/hooks/use-color-scheme";
import { TextInput, View, type TextInputProps } from "react-native";
import { Colors } from "@/src/theme";

export type AppInputProps = TextInputProps & {
  className?: string;
  type?: 'default' | 'rounded';
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
};

export const AppInput = ({ className, type, rightElement, leftElement, ...rest }: AppInputProps) => {
  const scheme = useColorScheme() ?? 'light';
  const colors = Colors[scheme];

  return (
    <View
      className={
        "flex-row items-center border-[1px] border-secondary dark:border-secondary-dark " +
        "bg-surface dark:bg-surface-dark " +
        (type === 'rounded' ? 'rounded-full ' : 'rounded-xl ') +
        (className ?? '')
      }
    >
      {leftElement && <View className="pl-4">{leftElement}</View>}
      <TextInput
        placeholderTextColor={colors.muted}
        className="flex-1 p-4 text-text dark:text-text-dark"
        {...rest}
      />
      {rightElement && <View className="pr-4">{rightElement}</View>}
    </View>
  );
};

export default AppInput;
