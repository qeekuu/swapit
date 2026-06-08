import { View, Alert } from "react-native";
import { useState } from "react";
import { ScreenWrapper } from "@/components/wrappers/ScreenWrapper";
import { Typography } from "@/components/ui/Typography";
import AnimatedPressable from "@/components/AnimatedPressable";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useColorScheme } from "@/hooks/use-color-scheme";
import { Colors } from "@/src/theme";
import { OFFERS } from "@/src/data";

type Status = 'pending' | 'accepted' | 'rejected';

export default function OffersScreen() {
  const scheme = useColorScheme() ?? 'light';
  const theme = Colors[scheme];
  const [statuses, setStatuses] = useState<Record<string, Status>>({});

  const resolve = (id: string, status: Status) => {
    setStatuses(prev => ({ ...prev, [id]: status }));
    if (status === 'accepted')
      Alert.alert('Swap accepted!', 'You can now arrange a meetup to exchange items.');
  };

  const pending = OFFERS.filter(o => !statuses[o.id] || statuses[o.id] === 'pending').length;

  return (
    <ScreenWrapper withTopBar title="Swap Offers" withScroll>
      <View className="flex-row justify-between items-center mt-2 mb-2">
        <Typography variant="muted">{OFFERS.length} proposals from users</Typography>
        {pending > 0 && (
          <View className="bg-primary dark:bg-primary-dark rounded-full px-3 py-1">
            <Typography className="text-white text-xs font-bold">{pending} pending</Typography>
          </View>
        )}
      </View>

      {OFFERS.map(item => {
        const status: Status = statuses[item.id] ?? 'pending';
        return (
          <View
            key={item.id}
            className={`rounded-[25px] border-[6px] border-primary dark:border-primary-dark p-4 mt-4 bg-background dark:bg-background-dark ${status !== 'pending' ? 'opacity-60' : ''}`}
          >
            {/* Header */}
            <View className="flex-row items-center mb-4 gap-3">
              <View className="w-12 h-12 rounded-full border-[3px] border-primary dark:border-primary-dark items-center justify-center bg-accent dark:bg-accent-dark">
                <Typography className="font-bold text-primary dark:text-primary-dark">{item.initials}</Typography>
              </View>
              <View className="flex-1">
                <Typography className="font-semibold">{item.from}</Typography>
                <View className="flex-row items-center gap-1">
                  <Ionicons name="time-outline" size={12} color={theme.muted} />
                  <Typography variant="muted" className="text-xs">{item.timeAgo} ago</Typography>
                </View>
              </View>
              {status === 'pending' && (
                <View className="bg-accent dark:bg-accent-dark rounded-full px-3 py-1">
                  <Typography className="text-primary dark:text-primary-dark text-xs font-bold">NEW</Typography>
                </View>
              )}
              {status === 'accepted' && (
                <View className="bg-accent dark:bg-accent-dark rounded-full px-3 py-1">
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="checkmark-circle" size={12} color={theme.primary} />
                    <Typography className="text-primary dark:text-primary-dark text-xs font-bold">Accepted</Typography>
                  </View>
                </View>
              )}
              {status === 'rejected' && (
                <View className="rounded-full px-3 py-1" style={{ backgroundColor: '#FFEBEE' }}>
                  <View className="flex-row items-center gap-1">
                    <Ionicons name="close-circle" size={12} color="#C62828" />
                    <Typography className="text-xs font-bold" style={{ color: '#C62828' }}>Declined</Typography>
                  </View>
                </View>
              )}
            </View>

            {/* Swap visual: what for what */}
            <View className="flex-row items-center gap-3 mb-4">
              <View className="flex-1 items-center gap-2">
                <View className="w-16 h-16 rounded-[18px] border-[3px] border-secondary dark:border-secondary-dark bg-accent dark:bg-accent-dark items-center justify-center">
                  <Ionicons name={item.iconName as any} size={30} color={theme.primary} />
                </View>
                <View className="bg-accent dark:bg-accent-dark rounded-full px-2 py-1">
                  <Typography className="text-xs font-bold text-primary dark:text-primary-dark">OFFERS</Typography>
                </View>
                <Typography className="text-xs font-semibold text-center" numberOfLines={2}>{item.itemOffered}</Typography>
              </View>

              <View className="w-10 h-10 rounded-full border-[3px] border-primary dark:border-primary-dark items-center justify-center">
                <Ionicons name="swap-horizontal" size={18} color={theme.primary} />
              </View>

              <View className="flex-1 items-center gap-2">
                <View className="w-16 h-16 rounded-[18px] border-[3px] border-secondary dark:border-secondary-dark bg-surface dark:bg-surface-dark items-center justify-center">
                  <Ionicons name="bag-outline" size={28} color={theme.primary} />
                </View>
                <View className="rounded-full px-2 py-1" style={{ backgroundColor: '#E3F2FD' }}>
                  <Typography className="text-xs font-bold" style={{ color: '#1565C0' }}>WANTS</Typography>
                </View>
                <Typography className="text-xs font-semibold text-center" numberOfLines={2}>{item.myItem}</Typography>
              </View>
            </View>

            {/* Actions */}
            {status === 'pending' && (
              <View className="gap-2">
                <AnimatedPressable
                  onPress={() => resolve(item.id, 'accepted')}
                  className="bg-primary dark:bg-primary-dark rounded-full items-center py-4"
                >
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="checkmark-circle-outline" size={18} color="#4ade80" />
                    <Typography className="text-white font-bold">Accept</Typography>
                  </View>
                </AnimatedPressable>
                <AnimatedPressable
                  onPress={() => resolve(item.id, 'rejected')}
                  className="rounded-full items-center py-4 border-[2px] border-primary dark:border-primary-dark"
                >
                  <View className="flex-row items-center gap-2">
                    <Ionicons name="close-circle-outline" size={18} color="#f87171" />
                    <Typography className="text-primary dark:text-primary-dark font-bold">Decline</Typography>
                  </View>
                </AnimatedPressable>
                <AnimatedPressable className="flex-row items-center justify-center gap-2 rounded-full py-4 border-[2px] border-secondary dark:border-secondary-dark">
                  <Ionicons name="chatbubble-outline" size={16} color={theme.muted} />
                  <Typography variant="muted" className="font-semibold">Send a Message</Typography>
                </AnimatedPressable>
              </View>
            )}

            {status === 'accepted' && (
              <View className="bg-accent dark:bg-accent-dark rounded-[14px] p-3 items-center">
                <View className="flex-row items-center gap-2">
                  <Ionicons name="calendar-outline" size={16} color={theme.primary} />
                  <Typography className="text-primary dark:text-primary-dark font-semibold text-sm">
                    Arrange a meetup with {item.from}
                  </Typography>
                </View>
              </View>
            )}

            {status === 'rejected' && (
              <View className="rounded-[14px] p-3 items-center" style={{ backgroundColor: '#FFEBEE' }}>
                <Typography className="text-sm font-semibold" style={{ color: '#C62828' }}>
                  Proposal declined. The user has been notified.
                </Typography>
              </View>
            )}
          </View>
        );
      })}
    </ScreenWrapper>
  );
}
