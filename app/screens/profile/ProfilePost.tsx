import React, { useRef, useState } from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, IMAGES, FONTS, SIZES } from "../../constants/theme";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "@react-navigation/native";
import Header from "../../layout/Header";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import LinearGradient from "react-native-linear-gradient";
import Swiper from "react-native-swiper";
import LikeBtn from "../../components/likebtn/LikeBtn";
import { ScrollView } from "react-native-gesture-handler";
import PostShareSheet from "../../components/bottomsheet/PostShareSheet";
import PostoptionSheet from "../../components/bottomsheet/PostoptionSheet";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getPostDetails, getReacts, likePost } from "../../apis/post.api";

const ProfilePost = (props) => {
  const { data } = props.route.params;
  const sheetRef = useRef();
  const moresheet = useRef();
  const theme = useTheme();
  const { colors } = theme;
  const navigation = useNavigation();
  const [isShow, setIsShow] = useState(false);
  const [show, setshow] = React.useState(true);
  const { data: count } = useQuery({
    queryKey: ["reactPost", data._id],
    queryFn: () => getReacts(data._id),
  });
  const isLiked = count?.check === "like";

  const { data: dataPost } = useQuery({
    queryKey: ["detailPost", data._id],
    queryFn: () => getPostDetails(data._id),
  });

  const queryClient = useQueryClient();
  const reactPostMutation = useMutation(likePost);

  const handleClickLike = async () => {
    try {
      reactPostMutation.mutate(data._id, {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries("reactPost");
        },
        onError(error, variables, context) {
          console.log(error);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
      <Header title="Post" />
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={GlobalStyleSheet.container}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              marginHorizontal: -15,
            }}
          >
            <View
              style={[
                GlobalStyleSheet.flexalingjust,
                { paddingVertical: 10, paddingHorizontal: 15 },
              ]}
            >
              <View style={GlobalStyleSheet.flexaling}>
                <View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("status", {
                        name: data.name,
                        image: data.image,
                        statusData: [IMAGES.profilepic17, IMAGES.profilepic18],
                      })
                    }
                  >
                    <View>
                      <Image
                        style={{ width: 42, height: 42, borderRadius: 50 }}
                        source={{
                          uri: data?.user?.picture,
                        }}
                      />
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          position: "absolute",
                          bottom: -4,
                          right: -4,
                          resizeMode: "contain",
                        }}
                        source={IMAGES.cricle}
                      />
                    </View>
                  </TouchableOpacity>
                </View>
                <View style={{ marginLeft: 10 }}>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("AnotherProfile", {
                        username: data.user.username,
                      })
                    }
                  >
                    <Text
                      style={{
                        ...FONTS.fontSm,
                        ...FONTS.fontMedium,
                        color: colors.title,
                      }}
                    >
                      {data.user.username}
                    </Text>
                  </TouchableOpacity>
                  <Text
                    style={{
                      ...FONTS.fontMedium,
                      fontSize: 11,
                      color: colors.text,
                    }}
                  >
                    {data.date}
                  </Text>
                </View>
              </View>
              <View style={{ flexDirection: "row" }}>
                <TouchableOpacity onPress={() => sheetRef.current.openSheet()}>
                  <Image
                    style={{
                      width: 18,
                      height: 18,
                      marginRight: 23,
                      tintColor: colors.title,
                    }}
                    source={IMAGES.share}
                  />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => moresheet.current.openSheet()}>
                  <Image
                    style={{ width: 18, height: 18, tintColor: colors.title }}
                    source={IMAGES.more}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <View
              style={{
                height: SIZES.width - SIZES.width * (20 / 100),
              }}
            >
              <Swiper
                height={"auto"}
                showsButtons={false}
                loop={false}
                paginationStyle={{
                  bottom: 10,
                }}
                dotStyle={{
                  width: 5,
                  height: 5,
                  backgroundColor: "rgba(255, 255, 255, 0.40)",
                }}
                activeDotStyle={{
                  width: 6,
                  height: 6,
                  backgroundColor: "#ffff",
                }}
              >
                {data?.images?.map((post, index) => {
                  return (
                    <Image
                      key={index}
                      style={{ width: "100%", height: "100%" }}
                      source={{
                        uri: post.url,
                      }}
                    />
                  );
                })}
              </Swiper>
            </View>
            <View
              style={{
                paddingVertical: 10,
                paddingHorizontal: 15,
                paddingBottom: 20,
              }}
            >
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <View style={[GlobalStyleSheet.flexaling, { gap: 22 }]}>
                  <View style={GlobalStyleSheet.flexaling}>
                    <TouchableOpacity>
                      <LikeBtn
                        isLiked={isLiked}
                        onPress={handleClickLike}
                        color={colors.title}
                        sizes={"sm"}
                      />
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => navigation.navigate("like")}
                    >
                      <Text
                        style={[
                          GlobalStyleSheet.postlike,
                          { color: colors.title },
                        ]}
                      >
                        {count?.total}
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate("Comments", {
                        comment: dataPost?.comments,
                        postData: dataPost._id,
                      })
                    }
                  >
                    <View
                      style={{ flexDirection: "row", alignItems: "center" }}
                    >
                      <Image
                        style={{
                          width: 22,
                          height: 22,
                          resizeMode: "contain",
                          tintColor: colors.title,
                        }}
                        source={IMAGES.comment}
                      />
                      <Text
                        style={[
                          GlobalStyleSheet.postlike,
                          { color: colors.title },
                        ]}
                      >
                        {dataPost?.comments?.length || 0}
                      </Text>
                    </View>
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity
                    onPress={() => {
                      setshow(!show);
                    }}
                  >
                    <Image
                      style={{
                        width: 18,
                        height: 18,
                        resizeMode: "contain",
                        margin: 10,
                        tintColor: show ? colors.title : colors.primary,
                      }}
                      source={show ? IMAGES.save : IMAGES.save2}
                    />
                  </TouchableOpacity>
                </View>
              </View>
              <View style={{ marginTop: 15 }}>
                <View style={{ paddingRight: 35 }}>
                  <Text
                    numberOfLines={isShow ? null : 2}
                    style={{
                      ...FONTS.fontRegular,
                      color: colors.title,
                      fontSize: 13,
                    }}
                  >
                    {dataPost?.text}
                  </Text>
                  {isShow === false && (
                    <TouchableOpacity
                      onPress={() => setIsShow(true)}
                      style={{ position: "absolute", bottom: -4, right: 0 }}
                    >
                      <Text
                        style={{
                          ...FONTS.fontRegular,
                          color: theme.dark
                            ? "rgba(255,255,255,0.5)"
                            : "rgba(71, 90, 119, 0.50)",
                          fontSize: 13,
                        }}
                      >
                        more
                      </Text>
                    </TouchableOpacity>
                  )}
                </View>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
      <PostShareSheet ref={sheetRef} />
      <PostoptionSheet ref={moresheet} />
    </SafeAreaView>
  );
};

export default ProfilePost;
