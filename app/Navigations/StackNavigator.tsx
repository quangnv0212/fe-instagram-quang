import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
  useTheme,
} from "@react-navigation/native";
import {
  CardStyleInterpolators,
  createStackNavigator,
} from "@react-navigation/stack";
import React, { useContext, useEffect } from "react";
import { StatusBar } from "react-native";
import { COLORS } from "../constants/theme";
import { AppContext } from "../contexts/app.context";
import Login from "../screens/auth/Login";
import Register from "../screens/auth/Register";
import Comments from "../screens/comment/Comments";
import CreateStory from "../screens/createstory/CreateStory";
import HomeScreen from "../screens/home/HomeScreen";
import CreatePost from "../screens/post/CreatePost";
import Nextpage from "../screens/post/Nextpage";
import WriteCaption from "../screens/post/WriteCaption";
import AnotherProfile from "../screens/profile/AnotherProfile";
import EditProfile from "../screens/profile/EditProfile";
import ProfilePost from "../screens/profile/ProfilePost";
import Settings from "../screens/settings/Settings";
import About from "../screens/settings/about/About";
import Account from "../screens/settings/account/Account";
import Contacts from "../screens/settings/account/Contacts";
import Language from "../screens/settings/account/Language";
import PersonalInformation from "../screens/settings/account/PersonalInformation";
import SettingNotification from "../screens/settings/notification/SettingNotification";
import LoginActivity from "../screens/settings/security/LoginActivity";
import Security from "../screens/settings/security/Security";
import Theme from "../screens/settings/theme/Theme";
import AddStory from "../screens/status/AddStory";
import Status from "../screens/status/Status";
import BottomNavigation from "./BottomNavigation";
import SingleChat from "../screens/chat/SingleChat";
const Stack = createStackNavigator();
function Root() {
  const authCtx = useContext(AppContext);
  useEffect(() => {
    async function fetchToken() {
      const storedToken = await AsyncStorage.getItem("token");
      const idUser = (await AsyncStorage.getItem("id_user")) || "";
      const username = (await AsyncStorage.getItem("username")) || "";
      const avatar = (await AsyncStorage.getItem("avatar")) || "";
      if (storedToken || idUser) {
        authCtx.authenticate(storedToken, idUser, username, avatar);
      }
    }
    fetchToken();
  }, []);
  return <Navigation />;
}
function Navigation() {
  const authCtx = useContext(AppContext);
  const { isDarkTheme } = useContext(AppContext);
  const CustomDefaultTheme = {
    ...NavigationDefaultTheme,
    colors: {
      ...NavigationDefaultTheme.colors,
      background: COLORS.background,
      title: COLORS.title,
      card: COLORS.card,
      text: COLORS.text,
      border: COLORS.border,
      input: COLORS.input,
      placeholder: COLORS.placeholder,
    },
  };

  const CustomDarkTheme = {
    ...NavigationDarkTheme,
    colors: {
      ...NavigationDarkTheme.colors,
      background: COLORS.darkBackground,
      title: COLORS.darkTitle,
      card: COLORS.darkCard,
      text: COLORS.darkText,
      border: COLORS.darkBorder,
      input: COLORS.darkInput,
      placeholder: COLORS.darkPlaceholder,
    },
  };

  const theme = isDarkTheme ? CustomDarkTheme : CustomDefaultTheme;
  return (
    <NavigationContainer theme={theme}>
      {!authCtx.isAuthenticated && <AuthStack />}
      {authCtx.isAuthenticated && <AuthenticatedStack />}
    </NavigationContainer>
  );
}
const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="Login" component={Login} />
      <Stack.Screen name="Register" component={Register} />
    </Stack.Navigator>
  );
};
const AuthenticatedStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: "transparent" },
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
      }}
    >
      <Stack.Screen name="BottomNavigation" component={BottomNavigation} />
      <Stack.Screen name="homescreen" component={HomeScreen} />
      <Stack.Screen name="Comments" component={Comments} />
      <Stack.Screen name="createpost" component={CreatePost} />
      <Stack.Screen name="SingleChat" component={SingleChat} />
      <Stack.Screen name="status" component={Status} />
      <Stack.Screen name="AddStory" component={AddStory} />
      <Stack.Screen name="Settings" component={Settings} />
      <Stack.Screen
        name="SettingNotification"
        component={SettingNotification}
      />
      <Stack.Screen name="Security" component={Security} />
      <Stack.Screen name="LoginActivity" component={LoginActivity} />
      <Stack.Screen name="Account" component={Account} />
      <Stack.Screen
        name="PersonalInformation"
        component={PersonalInformation}
      />
      <Stack.Screen name="Language" component={Language} />
      <Stack.Screen name="Contacts" component={Contacts} />
      <Stack.Screen name="About" component={About} />
      <Stack.Screen name="Theme" component={Theme} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProfilePost" component={ProfilePost} />
      <Stack.Screen name="AnotherProfile" component={AnotherProfile} />
      <Stack.Screen name="Nextpage" component={Nextpage} />
      <Stack.Screen name="WriteCaption" component={WriteCaption} />
      <Stack.Screen name="CreateStory" component={CreateStory} />
    </Stack.Navigator>
  );
};
const StackNavigator = () => {
  const theme = useTheme();
  const { isDarkTheme } = useContext(AppContext);

  return (
    <>
      <StatusBar
        barStyle={isDarkTheme ? "light-content" : "dark-content"}
        backgroundColor={theme.colors.card}
      />
      <Root />
    </>
  );
};
export default StackNavigator;
