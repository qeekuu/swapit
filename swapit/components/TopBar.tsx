import { View } from "react-native";
import { Typography } from "./ui/Typography";

interface TopBarProps {
  username?: string;
  title?: string;
}

const TopBar = ({ username, title }: TopBarProps) => {
  if (title) {
    return (
      <View className="border-b-[6px] border-primary dark:border-primary-dark rounded-xl px-2 h-[58px] justify-center mb-2">
        <Typography className="tracking-widest font-semibold text-lg text-text dark:text-text-dark text-center">
          {title}
        </Typography>
      </View>
    );
  }

  return (
    <View className="border-b-[6px] border-primary dark:border-primary-dark rounded-xl px-2 h-[58px] justify-center mb-2">
      <View className="flex-row justify-between items-center">
        <Typography className="tracking-widest font-semibold text-lg text-text dark:text-text-dark">
          {username ?? 'SwapIt'}
        </Typography>
        <View className="w-10 h-10 rounded-full border-[3px] border-primary dark:border-primary-dark items-center justify-center">
          <Typography className="font-bold text-primary dark:text-primary-dark text-sm">
            {username ? username.slice(0, 2).toUpperCase() : 'SW'}
          </Typography>
        </View>
      </View>
    </View>
  );
};

export default TopBar;
