import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import CreateScreen from "screens/CreateScreen";
import Home from "screens/HomeScreen";
import MyBetsScreen from "screens/MyBetsScreen";
import WagerScreen from "screens/WagerScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={CreateScreen} />
      <Tab.Screen name="Wager" component={WagerScreen} />
      <Tab.Screen name="My Bets" component={MyBetsScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
