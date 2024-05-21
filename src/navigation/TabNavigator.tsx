import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { H2, H6 } from "tamagui";

import useBetData from "hooks/useBetData";
import CreateScreen from "screens/CreateScreen";
import Home from "screens/HomeScreen";
import MyBetsScreen from "screens/MyBetsScreen";
import WagerScreen from "screens/WagerScreen";
import { QUERY_KEYS } from "utils/constants";

const Tab = createBottomTabNavigator<BottomTabParamList>();

const TabNavigator = () => {
  const { fetchWallet } = useBetData();
  const getWalletQuery = useQuery({
    queryKey: [QUERY_KEYS.WALLET],
    queryFn: fetchWallet,
  });

  const walletAmount = getWalletQuery.data?.amount || 0;

  return (
    <Tab.Navigator
      screenOptions={{
        headerLeft: () => <H2 color="$accentColor">Roundie</H2>,
        headerRight: () => (
          <View>
            <H6>{`Coins: ${walletAmount}`}</H6>
          </View>
        ),
        headerTitle: () => null,
      }}
    >
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Wager" component={WagerScreen} />
      <Tab.Screen name="My Bets" component={MyBetsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
