import React, { useContext } from "react";
import { TouchableOpacity, Text, Image, View } from "react-native";
import { COLORS, FONTS, IMAGES, SIZES } from "../../constants/theme";
import LinearGradient from "react-native-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../apis/user.api";
import { AppContext } from "../../contexts/app.context";

const StoryItem = ({ username }: { username: string }) => {
  const { userName } = useContext(AppContext);
  const isMe = username === userName;
  const navigation = useNavigation();
  const theme = useTheme();
  const { colors } = theme;
  const { data: userData } = useQuery({
    queryKey: ["userList", username],
    queryFn: () => getProfile(username),
  });
  const statusData = userData?.posts?.flatMap(
    (post: any) => post?.images[0]?.url
  );

  const hasPost = userData?.posts?.length > 0;
  return (
    <TouchableOpacity
      onPress={() => {
        isMe
          ? navigation.navigate("AddStory")
          : hasPost
          ? navigation.navigate("status", {
              name: userData?.username,
              image: userData?.picture,
              statusData: statusData,
            })
          : navigation.navigate("AnotherProfile", {
              username: userData?.username,
            });
      }}
      style={{ marginRight: 10, alignItems: "center" }}
    >
      <View style={{ marginRight: 5 }}>
        {!hasPost || isMe ? (
          <View>
            <Image
              style={{ width: 65, height: 65, borderRadius: 50 }}
              source={{
                uri: userData?.picture,
              }}
            />
          </View>
        ) : (
          <View style={{ justifyContent: "center", alignItems: "center" }}>
            <Image
              style={{ width: 65, height: 65, borderRadius: 50 }}
              source={{
                uri: userData?.picture,
              }}
            />
            <Image
              style={{
                width: 75,
                height: 75,
                position: "absolute",
                resizeMode: "contain",
              }}
              source={IMAGES.cricle}
            />
          </View>
        )}
        {isMe ? (
          <View>
            <TouchableOpacity
              onPress={() => navigation.navigate("AddStory")}
              style={{ position: "absolute", bottom: -4, right: 0 }}
            >
              <View
                style={{
                  width: 22,
                  height: 22,
                  backgroundColor: theme.dark ? "#112036" : "#fff",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: 50,
                }}
              >
                <LinearGradient
                  colors={["#40ACEA", "#002B43"]}
                  style={{
                    width: 20,
                    height: 20,
                    alignItems: "center",
                    borderRadius: 50,
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: 12, height: 12, tintColor: "#fff" }}
                    source={IMAGES.plus}
                  />
                </LinearGradient>
              </View>
            </TouchableOpacity>
          </View>
        ) : null}
      </View>
      <Text
        style={{
          ...FONTS.fontMedium,
          color: colors.title,
          fontSize: 10,
          marginTop: 5,
        }}
      >
        {userData?.username}
      </Text>
    </TouchableOpacity>
  );
};

export default StoryItem;
