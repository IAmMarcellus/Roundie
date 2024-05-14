import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Home from "../screens/HomeScreen";
import CreateScreen from "../screens/CreateScreen";

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={Home} />
      <Tab.Screen name="Create" component={CreateScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
