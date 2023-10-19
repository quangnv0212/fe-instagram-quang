import { createContext, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useQueryClient } from "@tanstack/react-query";

interface AppContextInterface {
  token: string | null;
  isAuthenticated: boolean;
  authenticate: (
    token: any,
    idUser: string,
    username: string,
    avatar: string
  ) => void;
  logout: () => void;
  setDarkTheme: () => void;
  setLightTheme: () => void;
  isDarkTheme: boolean;
  userName: string;
  idUser: string;
  avatar: string;
}

export const getInitialAppContext: () => AppContextInterface = () => ({
  token: "",
  isAuthenticated: false,
  authenticate: (token, idUser, username) => {},
  logout: () => {},
  setDarkTheme: () => {},
  setLightTheme: () => {},
  isDarkTheme: false,
  userName: "",
  idUser: "",
  avatar: "",
});

const initialAppContext = getInitialAppContext();

export const AppContext = createContext<AppContextInterface>(initialAppContext);

export const AppProvider = ({
  children,
  defaultValue = initialAppContext,
}: {
  children: React.ReactNode;
  defaultValue?: AppContextInterface;
}) => {
  const [authToken, setAuthToken] = useState<string | null>();
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [idUser, setIdUser] = useState<string | null>();
  const [userName, setUserName] = useState<string | null>();
  const [avatar, setAvatar] = useState<string | null>();
  const queryClient = useQueryClient();
  function authenticate(
    token: string,
    idUser: string,
    userName: string,
    avatar: string
  ) {
    setAuthToken(token);
    AsyncStorage.setItem("token", token);
    setIdUser(idUser);
    AsyncStorage.setItem("id_user", idUser);
    setUserName(userName);
    AsyncStorage.setItem("username", userName);
    setAvatar(avatar);
    AsyncStorage.setItem("avatar", avatar);
    queryClient.resetQueries();
  }

  function logout() {
    setAuthToken(null);
    AsyncStorage.removeItem("token");
    setIdUser(null);
    AsyncStorage.removeItem("id_user");
    setUserName(null);
    AsyncStorage.removeItem("username");
    setAvatar(null);
    AsyncStorage.removeItem("avatar");
    queryClient.resetQueries();
  }
  function setDarkTheme() {
    setIsDarkTheme(true);
  }
  function setLightTheme() {
    setIsDarkTheme(false);
  }

  const value = {
    token: authToken,
    isAuthenticated: Boolean(authToken),
    authenticate: authenticate,
    logout: logout,
    setDarkTheme,
    setLightTheme,
    isDarkTheme,
    userName: userName,
    idUser: idUser,
    avatar: avatar,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};
