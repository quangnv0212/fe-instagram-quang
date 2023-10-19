import { useTheme } from "@react-navigation/native";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StatusBar,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { getConversation } from "../../apis/user.api";
import ChatoptionSheet from "../../components/bottomsheet/ChatoptionSheet";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { COLORS, FONTS, IMAGES } from "../../constants/theme";
import { AppContext } from "../../contexts/app.context";
import configHttp from "../../constants/configHttp";

const SingleChat = ({ navigation, route }: { navigation: any; route: any }) => {
  const { token, idUser, isAuthenticated } = useContext(AppContext);
  const socket = io(configHttp.baseUrl, {
    auth: {
      Authorization: `Bearer ${token}`,
    },
  });
  useEffect(() => {
    socket.auth = {
      _id: idUser,
    };
    socket.connect();
  }, []);
  const username = route.params.username;
  const avatar = route.params.avatar;
  const id = route.params.id;
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const { data: dataChat } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => getConversation(id),
    enabled: isAuthenticated,
  });
  const theme = useTheme();
  const { colors } = theme;
  const sendMessage = () => {
    const conversation = {
      content: value,
      sender_id: idUser,
      receiver_id: route.params.id,
    };

    socket.emit("send_message", {
      payload: conversation,
    });
  };
  const moresheet = React.useRef();
  return (
    <SafeAreaView style={{ backgroundColor: "#112036", flex: 1 }}>
      <StatusBar barStyle="light-content" backgroundColor={"#112036"} />
      <View style={GlobalStyleSheet.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <View style={{ flex: 1, flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{ width: 18, height: 18, tintColor: "#fff" }}
                source={IMAGES.arrowleft}
              />
            </TouchableOpacity>
            <TouchableOpacity style={{ marginRight: 10, marginLeft: 10 }}>
              <View>
                <Image
                  style={{ width: 40, height: 40, borderRadius: 50 }}
                  source={{ uri: avatar }}
                />
                <Image
                  style={{
                    width: 48,
                    height: 48,
                    position: "absolute",
                    bottom: -4,
                    right: -4,
                  }}
                  source={IMAGES.cricle}
                />
              </View>
            </TouchableOpacity>
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AnotherProfile", { username: username })
                }
              >
                <Text
                  style={{
                    ...FONTS.font,
                    ...FONTS.fontMedium,
                    color: "#fff",
                    marginBottom: 2,
                  }}
                >
                  {username}
                </Text>
              </TouchableOpacity>
              <Text style={{ ...FONTS.fontXs, color: "#fff", opacity: 0.7 }}>
                online
              </Text>
            </View>
          </View>
          <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => navigation.navigate("Call")}
              style={{ padding: 10 }}
            >
              <Image
                style={[GlobalStyleSheet.image, { tintColor: "#fff" }]}
                source={IMAGES.call}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => navigation.navigate("Video")}
              style={{ padding: 10 }}
            >
              <Image
                style={[GlobalStyleSheet.image, { tintColor: "#fff" }]}
                source={IMAGES.video}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => moresheet.current.openSheet()}
              style={{ padding: 10 }}
            >
              <Image
                style={[GlobalStyleSheet.image, { tintColor: "#fff" }]}
                source={IMAGES.more}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: theme.dark ? colors.background : "#fff",
            borderTopLeftRadius: 25,
            borderTopRightRadius: 25,
            paddingHorizontal: 20,
            paddingTop: 20,
          }}
        >
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={{ flex: 1 }}>
              {dataChat &&
                dataChat.map((data, index) => {
                  const send = data.sender_id === idUser;
                  return (
                    <View key={index}>
                      <View
                        style={[
                          {
                            width: "75%",
                            marginBottom: 10,
                          },
                          send == false
                            ? {
                                marginRight: "auto",
                                alignItems: "flex-start",
                              }
                            : {
                                marginLeft: "auto",
                                alignItems: "flex-end",
                              },
                        ]}
                      >
                        <View
                          style={[
                            send == false
                              ? {
                                  backgroundColor: COLORS.background,
                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  borderBottomRightRadius: 10,
                                }
                              : {
                                  backgroundColor: COLORS.primary,

                                  borderTopLeftRadius: 10,
                                  borderTopRightRadius: 10,
                                  borderBottomLeftRadius: 10,
                                },
                          ]}
                        >
                          <Text
                            style={{
                              ...FONTS.font,
                              ...FONTS.fontRegular,
                              color: data.send ? COLORS.white : COLORS.title,
                              paddingVertical: 10,
                              paddingHorizontal: 10,
                            }}
                          >
                            {data.content}
                          </Text>
                        </View>
                        {data.time && (
                          <Text
                            style={{
                              ...FONTS.fontXs,
                              ...FONTS.fontRegular,
                              color: COLORS.title,
                              opacity: 0.4,
                              marginTop: 3,
                            }}
                          >
                            {data.createdAt}
                          </Text>
                        )}
                      </View>
                    </View>
                  );
                })}
              {!dataChat?.length && <Text>Start to chat...</Text>}
            </View>
          </ScrollView>
        </View>

        <View
          style={{
            backgroundColor: theme.dark ? colors.background : colors.card,
            paddingHorizontal: 15,
          }}
        >
          <View>
            <TouchableOpacity
              style={{
                zIndex: 1,
                position: "absolute",
                top: 13,
                left: 15,
              }}
            >
              <Image
                style={{
                  tintColor: colors.text,
                  width: 20,
                  height: 20,
                }}
                source={IMAGES.happy}
              />
            </TouchableOpacity>
            <TextInput
              value={value}
              onChangeText={(text) => setValue(text)}
              placeholder="Send your message..."
              placeholderTextColor={colors.placeholder}
              style={[
                GlobalStyleSheet.inputBox,
                {
                  backgroundColor: colors.input,
                },
              ]}
            />
            <TouchableOpacity
              style={{
                zIndex: 1,
                position: "absolute",
                top: 13,
                right: 50,
              }}
            >
              <Image
                style={{
                  tintColor: colors.title,
                  opacity: 0.5,
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
                source={IMAGES.camera}
              />
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                zIndex: 1,
                position: "absolute",
                top: 13,
                right: 15,
              }}
              onPress={sendMessage}
            >
              <Image
                style={{
                  tintColor: colors.primary,
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
                source={IMAGES.send}
              />
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
      <ChatoptionSheet ref={moresheet} />
    </SafeAreaView>
  );
};

export default SingleChat;
