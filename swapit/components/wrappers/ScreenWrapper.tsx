import { ScrollView, View, type StyleProp, type ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../TopBar";

export type ScreenWrapperProps = {
  children: React.ReactNode;
  username?: string;
  title?: string;
  withScroll?: boolean;
  withTopBar?: boolean;
  noPadding?: boolean;
  style?: StyleProp<ViewStyle>;
  contentStyle?: StyleProp<ViewStyle>;
};

export const ScreenWrapper = ({
  children, username, title, withScroll, withTopBar, noPadding = false, style, contentStyle,
}: ScreenWrapperProps) => {
  const ContentContainer = withScroll ? ScrollView : View;

  return (
    <View style={style} className="flex-1 bg-background dark:bg-background-dark">
      <SafeAreaView edges={['top']} className={`flex-1 ${noPadding ? '' : 'px-4 pt-4'} bg-background dark:bg-background-dark`}>
        {withTopBar && <TopBar username={username} title={title} />}
        <ContentContainer
          style={!withScroll ? [{ flex: 1 }, contentStyle] : undefined}
          contentContainerStyle={withScroll ? [{ flexGrow: 1, paddingBottom: 80 }, contentStyle] : undefined}
          showsVerticalScrollIndicator={false}
        >
          <View className="flex-1">{children}</View>
        </ContentContainer>
      </SafeAreaView>
    </View>
  );
};
