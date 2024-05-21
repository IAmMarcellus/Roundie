import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { Button, H2, View, YStack } from "tamagui";

import useBetData from "hooks/useBetData";
import { QUERY_KEYS } from "utils/constants";

type HomeScreenProps = BottomTabScreenProps<BottomTabParamList, "Home">;

const HomeScreen = ({ navigation }: HomeScreenProps) => {
  // Prefetch bets to hydrate cache
  const { fetchBets } = useBetData();
  useQuery({
    queryKey: [QUERY_KEYS.BETS],
    queryFn: fetchBets,
    notifyOnChangeProps: [],
  });

  return (
    <YStack
      flex={1}
      justifyContent="space-around"
      backgroundColor="$background"
    >
      <View flex={1} alignSelf="center" justifyContent="center">
        <H2>Welcome to Roundie</H2>
      </View>
      <YStack flex={1} justifyContent="space-around">
        <Button
          size="$6"
          onPress={() => navigation.navigate("Create")}
          borderRadius="$4"
          backgroundColor="$accentBackground"
          margin="$4"
        >
          Create a bet
        </Button>
        <Button
          size="$6"
          onPress={() => navigation.navigate("Wager")}
          borderRadius="$4"
          backgroundColor="$accentBackground"
          margin="$4"
        >
          Place a bet
        </Button>
      </YStack>
    </YStack>
  );
};

export default HomeScreen;
