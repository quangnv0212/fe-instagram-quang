import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { COLORS, FONTS, IMAGES } from "../../constants/theme";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { useTheme } from "@react-navigation/native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllUser, getConversation } from "../../apis/user.api";
import moment from "moment";

const Item = ({
  id,
  theme,
  username,
  avatar,
}: {
  id: string;
  theme: any;
  username: string;
  avatar: string;
}) => {
  const navigation = useNavigation();
  const { data: chatData } = useQuery({
    queryKey: ["chat", id],
    queryFn: () => getConversation(id),
    enabled: !!id,
  });
  const lastMessage =
    chatData && chatData.length > 0
      ? chatData[chatData.length - 1].content
      : "";
  const lastMessageTime =
    chatData && chatData.length > 0
      ? chatData[chatData.length - 1].createdAt
      : "";

  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate("SingleChat", { id, username, avatar })
      }
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 10,
        paddingVertical: 10,
        paddingLeft: 10,
        marginBottom: 8,
        borderWidth: 1,
        borderRadius: 15,
        marginHorizontal: 15,
        borderColor: theme.colors.border,
        backgroundColor: theme.dark ? "rgba(255,255,255,0.03)" : "#F4F8FD",
      }}
    >
      <View>
        <TouchableOpacity
          onPress={() => {
            navigation.navigate("AnotherProfile", { username });
          }}
          style={{ marginRight: 10 }}
        >
          <View>
            <Image
              style={{ width: 42, height: 42, borderRadius: 50 }}
              source={{
                uri: avatar,
              }}
            />
          </View>

          <View
            style={{
              backgroundColor: COLORS.success,
              width: 12,
              height: 12,
              borderRadius: 50,
              position: "absolute",
              bottom: -1,
              right: -1,
              borderWidth: 2,
              borderColor: theme.dark ? theme.colors.card : "#F4F8FD",
            }}
          ></View>
        </TouchableOpacity>
      </View>
      <View style={{ flex: 1 }}>
        <View style={{ flexDirection: "row", marginBottom: 5 }}>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontMedium,
              color: theme.colors.title,
              flex: 1,
            }}
          >
            {username}
          </Text>
          {lastMessageTime && (
            <Text
              style={{
                ...FONTS.fontSm,
                ...FONTS.fontRegular,
                color: theme.colors.title,
                opacity: 0.4,
              }}
            >
              {moment(lastMessageTime).fromNow()}
            </Text>
          )}
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ ...FONTS.fontXs, color: theme.colors.text, flex: 1 }}>
            {lastMessage || "You have no message! Click to start chat"}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const ActiveChat = ({ userList }: any) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const { colors } = theme;
  const chatPrivate = (id: string, username: string, avatar: string) => {
    navigation.navigate("SingleChat", { id, username, avatar });
  };
  return (
    <View>
      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 15, gap: 10 }}
        data={userList}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() =>
              chatPrivate(item?._id, item?.username, item?.picture)
            }
            style={{ alignItems: "center", marginBottom: 10, width: 65 }}
          >
            <Image
              style={{ width: 55, height: 55, borderRadius: 50 }}
              source={{ uri: item?.picture }}
            />
            <Text
              numberOfLines={1}
              style={{
                ...FONTS.fontMedium,
                color: colors.title,
                fontSize: 10,
                marginTop: 5,
              }}
            >
              {item?.username}
            </Text>
            <View
              style={{
                backgroundColor: COLORS.success,
                width: 12,
                height: 12,
                borderRadius: 50,
                position: "absolute",
                bottom: 20,
                right: 8,
                borderWidth: 2,
                borderColor: colors.card,
              }}
            ></View>
          </TouchableOpacity>
        )}
      />

      <Text
        style={{
          ...FONTS.fontMedium,
          fontSize: 16,
          color: colors.title,
          paddingHorizontal: 15,
          marginBottom: 10,
        }}
      >
        Messages
      </Text>
    </View>
  );
};

const Chat = ({ navigation }: { navigation: any }) => {
  const theme = useTheme();
  const { colors } = theme;
  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getAllUser(),
  });
  return (
    <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
      <View style={GlobalStyleSheet.container}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            paddingVertical: 10,
            borderBottomWidth: 1,
            borderBottomColor: colors.border,
            marginHorizontal: -15,
            paddingHorizontal: 15,
          }}
        >
          <Text
            style={{
              ...FONTS.fontSemiBold,
              fontSize: 18,
              color: colors.title,
              flex: 1,
            }}
          >
            Chat
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("NewChat")}>
            <Image
              style={{
                width: 20,
                height: 20,
                resizeMode: "contain",
                tintColor: colors.title,
              }}
              source={IMAGES.write}
            />
          </TouchableOpacity>
        </View>
        <View style={{ marginVertical: 20, marginBottom: 10 }}>
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
                tintColor: Colors.text,
                width: 20,
                height: 20,
                resizeMode: "contain",
              }}
              source={IMAGES.search}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Search chat here..."
            placeholderTextColor={colors.placeholder}
            style={[
              GlobalStyleSheet.inputBox,
              {
                backgroundColor: colors.input,
              },
            ]}
          />
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={userList}
          renderItem={({ item }) => {
            return (
              <Item
                avatar={item?.picture}
                id={item?._id}
                username={item?.username}
                theme={theme}
              />
            );
          }}
          ListHeaderComponent={() => <ActiveChat userList={userList} />}
          keyExtractor={(item) => item.id}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
export default Chat;
