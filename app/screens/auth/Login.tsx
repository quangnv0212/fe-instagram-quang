import React, { useContext, useEffect } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { COLORS, FONTS, IMAGES } from "../../constants/theme";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import Button from "../../components/button/Button";
import { AppContext } from "../../contexts/app.context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import authApi from "../../apis/auth.api";
import { Controller, useForm } from "react-hook-form";

export type FormData = {
  email: string;
  password: string;
};
const Login = ({ navigation }: { navigation: any }) => {
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>();
  const authCtx = React.useContext(AppContext);
  const loginMutation = useMutation({
    mutationFn: (body: FormData) => authApi.login(body),
  });
  const queryClient = useQueryClient();
  const onSubmit = (data: any) => {
    loginMutation.mutate(data, {
      onSuccess: async (data) => {
        const token = data.data.token;
        const idUser = data.data.id;
        const username = data.data.username;
        const picture = data.data.picture;
        queryClient.invalidateQueries(["userList"]);
        authCtx.authenticate(token, idUser, username, picture);

        navigation.replace("BottomNavigation");
      },
      onError: (error) => {
        Alert.alert(
          "Authentication failed!",
          "Could not log you in. Please check your credentials or try again later!"
        );
      },
    });
  };
  const theme = useTheme();
  const { colors } = theme;
  const [show, setshow] = React.useState(true);
  const [loading, setLoading] = React.useState(false);
  const [inputFocus, setFocus] = React.useState({
    onFocus1: false,
    onFocus2: false,
  });
  useEffect(() => {
    if (loading) {
      navigation.navigate("BottomNavigation");
    }
  }, [loading]);
  useFocusEffect(() => {
    setLoading(false);
  });
  const loginWithGoogle = () => {};
  return (
    <>
      {loading && (
        <View
          style={{
            backgroundColor: "rgba(0,0,0,.5)",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            zIndex: 9,
            width: "100%",
            height: "100%",
          }}
        >
          <ActivityIndicator size={"large"} color={COLORS.white} />
        </View>
      )}
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          style={{ flex: 1 }}
          behavior={Platform.OS === "ios" ? "padding" : ""}
        >
          <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
            <View style={{ backgroundColor: COLORS.secondary, flex: 1 }}>
              <View style={{ alignItems: "center" }}>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.00)",
                    "rgba(255, 255, 255, 0.08)",
                  ]}
                  style={GlobalStyleSheet.cricleGradient1}
                ></LinearGradient>
                <LinearGradient
                  colors={[
                    "rgba(255, 255, 255, 0.00)",
                    "rgba(255, 255, 255, 0.08)",
                  ]}
                  style={GlobalStyleSheet.cricleGradient2}
                ></LinearGradient>
                <View
                  style={{
                    paddingTop: 40,
                    paddingBottom: 20,
                  }}
                ></View>
                <Text style={GlobalStyleSheet.formtitle}>Login Account</Text>
                <Text style={GlobalStyleSheet.forndescription}>
                  Please enter your credentials to access your account
                </Text>
              </View>
              <View
                style={[
                  GlobalStyleSheet.loginarea,
                  { backgroundColor: colors.card },
                ]}
              >
                <Text
                  style={[GlobalStyleSheet.inputlable, { color: colors.title }]}
                >
                  Email
                </Text>
                <View
                  style={[
                    GlobalStyleSheet.inputBox,
                    {
                      backgroundColor: colors.input,
                    },
                    inputFocus.onFocus1 && {
                      borderColor: COLORS.primary,
                    },
                  ]}
                >
                  <Image
                    style={[
                      GlobalStyleSheet.inputimage,
                      {
                        tintColor: theme.dark ? colors.title : colors.text,
                      },
                    ]}
                    source={IMAGES.email}
                  />
                  <Controller
                    rules={{
                      required: true,
                    }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          GlobalStyleSheet.input,
                          { color: colors.title },
                        ]}
                        placeholder="Enter your email"
                        placeholderTextColor={colors.placeholder}
                        onFocus={() =>
                          setFocus({ ...inputFocus, onFocus1: true })
                        }
                        onBlur={onBlur}
                        onChangeText={(value) => onChange(value)}
                        value={value}
                      />
                    )}
                    name="email"
                  />
                </View>

                <Text
                  style={[GlobalStyleSheet.inputlable, { color: colors.title }]}
                >
                  Password
                </Text>
                <View
                  style={[
                    GlobalStyleSheet.inputBox,
                    {
                      backgroundColor: colors.input,
                    },
                    inputFocus.onFocus2 && {
                      borderColor: COLORS.primary,
                    },
                  ]}
                >
                  <Image
                    style={[
                      GlobalStyleSheet.inputimage,
                      {
                        tintColor: theme.dark ? colors.title : colors.text,
                      },
                    ]}
                    source={IMAGES.lock}
                  />
                  <Controller
                    rules={{
                      required: true,
                    }}
                    control={control}
                    render={({ field: { onChange, onBlur, value } }) => (
                      <TextInput
                        style={[
                          GlobalStyleSheet.input,
                          { color: colors.title },
                        ]}
                        placeholder="Enter your password"
                        onChangeText={(value) => onChange(value)}
                        placeholderTextColor={colors.placeholder}
                        secureTextEntry={show}
                        onFocus={() =>
                          setFocus({ ...inputFocus, onFocus2: true })
                        }
                        onBlur={onBlur}
                        value={value}
                      />
                    )}
                    name="password"
                  />

                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      position: "absolute",
                      right: 15,
                    }}
                    onPress={() => {
                      setshow(!show);
                    }}
                  >
                    <Image
                      style={[
                        GlobalStyleSheet.inputSecureIcon,
                        {
                          tintColor: theme.dark ? colors.title : colors.text,
                        },
                      ]}
                      source={show ? IMAGES.eyeclose : IMAGES.eyeopen}
                    />
                  </TouchableOpacity>
                </View>
                <View style={{ alignItems: "flex-end" }}>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Forgot-password")}
                  >
                    <Text style={GlobalStyleSheet.btnlink}>
                      {" "}
                      Forgot Password?{" "}
                    </Text>
                  </TouchableOpacity>
                </View>
                <Button title="Login" onPress={handleSubmit(onSubmit)} />
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    paddingVertical: 40,
                    flex: 1,
                  }}
                >
                  <View
                    style={{
                      flex: 1,
                      width: 0,
                      backgroundColor: colors.border,
                      height: 1,
                    }}
                  ></View>
                  <View>
                    <Text
                      style={{
                        ...FONTS.font,
                        paddingHorizontal: 30,
                        color: colors.text,
                      }}
                    >
                      or login with
                    </Text>
                  </View>
                  <View
                    style={{
                      flex: 1,
                      width: 0,
                      backgroundColor: colors.border,
                      height: 1,
                    }}
                  ></View>
                </View>

                <TouchableOpacity
                  onPress={loginWithGoogle}
                  style={[
                    GlobalStyleSheet.mediabtn,
                    {
                      backgroundColor: theme.dark
                        ? "rgba(255,255,255,.1)"
                        : "#E8ECF2",
                    },
                  ]}
                >
                  <Image
                    style={{
                      position: "absolute",
                      left: 25,
                      width: 20,
                      height: 20,
                    }}
                    source={IMAGES.google}
                  />
                  <Text
                    style={{ ...FONTS.font, fontSize: 15, color: colors.title }}
                  >
                    Login with Google
                  </Text>
                </TouchableOpacity>

                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    marginBottom: 15,
                  }}
                >
                  <Text style={{ ...FONTS.font, color: colors.text }}>
                    Don't have an account?
                  </Text>
                  <TouchableOpacity
                    onPress={() => navigation.navigate("Register")}
                  >
                    <Text
                      style={{
                        ...FONTS.font,
                        color: COLORS.primary,
                        textDecorationLine: "underline",
                        textDecorationColor: "#2979F8",
                        marginLeft: 5,
                      }}
                    >
                      Sign Up
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </>
  );
};

export default Login;
