import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useTheme } from "@react-navigation/native";
import React from "react";
import { SafeAreaView } from "react-native";
import BottomTab from "../layout/BottomTab";
import HomeScreen from "../screens/home/HomeScreen";
import Profile from "../screens/profile/Profile";
import Search from "../screens/search/Search";
import Chat from "../screens/chat/Chat";

const Tab = createBottomTabNavigator();

function BottomNavigation() {
  const theme = useTheme();
  const { colors } = theme;
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.card }}>
      <Tab.Navigator
        tabBar={(props) => <BottomTab {...props} />}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        <Tab.Screen name="Search" component={Search} />
        <Tab.Screen name="Reels" component={Search} />
        <Tab.Screen name="Chat" component={Chat} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default BottomNavigation;
