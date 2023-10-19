import React, { useContext, useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  FlatList,
} from "react-native";
import { useTheme } from "@react-navigation/native";
import { IMAGES, SIZES, FONTS } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import ProfilePostData from "../profile/ProfilePostData";
import { ScrollView } from "react-native-gesture-handler";
import Sharebtn from "../../components/button/Sharebtn";
import Followbtn from "../../components/button/Followbtn";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { follow, getAllUser, unfollow } from "../../apis/user.api";
import { AppContext } from "../../contexts/app.context";
import { getAllPublicPost } from "../../apis/post.api";

const Search = ({ navigation }: { navigation: any }) => {
  const theme = useTheme();
  const { logout, isAuthenticated, idUser } = useContext(AppContext);
  const { colors } = theme;
  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getAllUser(),
    enabled: isAuthenticated,
  });
  const { data: publicPost } = useQuery({
    queryKey: ["publicPost"],
    queryFn: () => getAllPublicPost(),
  });
  const queryClient = useQueryClient();

  const followMutation = useMutation(follow);
  const unFollowMutation = useMutation(unfollow);

  const onFollow = async (id: string) => {
    followMutation.mutate(id, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
          queryKey: ["userList"],
        });
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };
  const onUnfollow = async (id: string) => {
    unFollowMutation.mutate(id, {
      onSuccess(data, variables, context) {
        queryClient.invalidateQueries({
          queryKey: ["userList"],
        });
      },
      onError(error, variables, context) {
        console.log(error);
      },
    });
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
      <View style={GlobalStyleSheet.container}>
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
                tintColor: colors.text,
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
        <ScrollView showsVerticalScrollIndicator={false}>
          <Text
            style={[
              GlobalStyleSheet.textfont,
              {
                color: colors.title,
                fontSize: 14,
                paddingLeft: 15,
                marginBottom: 10,
              },
            ]}
          >
            Suggestion
          </Text>
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingLeft: 15 }}
            data={userList}
            renderItem={({ item }) => {
              const isFollowing = item.followers.includes(idUser);

              return (
                <View style={{ marginBottom: 30, marginRight: 10 }}>
                  <View
                    style={{
                      backgroundColor: colors.input,
                      height: 153,
                      width: 135,
                      borderRadius: SIZES.radius,
                    }}
                  >
                    <View style={{ alignItems: "center" }}>
                      <TouchableOpacity
                        onPress={() => {
                          navigation.navigate("AnotherProfile", {
                            username: item.username,
                          });
                        }}
                        style={{ marginTop: 20 }}
                      >
                        <View>
                          <Image
                            style={{
                              width: 50,
                              height: 50,
                              borderRadius: 50,
                            }}
                            source={{
                              uri: item.picture,
                            }}
                          />
                        </View>
                      </TouchableOpacity>
                      <Text
                        style={[
                          GlobalStyleSheet.textfont,
                          { color: colors.title, marginTop: 10 },
                        ]}
                      >
                        {item.username}
                      </Text>
                      <View style={{ marginTop: 10 }}>
                        {!isFollowing ? (
                          <Followbtn
                            title="Follow"
                            onPress={() => {
                              onFollow(item._id);
                            }}
                          />
                        ) : (
                          <Sharebtn
                            title="Following"
                            white={true}
                            onPress={() => onUnfollow(item._id)}
                          />
                        )}
                      </View>
                    </View>
                  </View>
                </View>
              );
            }}
          />
          <View style={{ width: SIZES.width }}>
            <Text
              style={[
                GlobalStyleSheet.textfont,
                {
                  color: colors.title,
                  fontSize: 14,
                  paddingLeft: 15,
                  marginBottom: 5,
                },
              ]}
            >
              Public Posts
            </Text>
            <ProfilePostData navigation={navigation} data={publicPost?.data} />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default Search;
