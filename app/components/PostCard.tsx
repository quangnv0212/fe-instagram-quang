import { useNavigation, useTheme } from "@react-navigation/native";
import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import Swiper from "react-native-swiper";
import { GlobalStyleSheet } from "../constants/styleSheet";
import { FONTS, IMAGES, SIZES } from "../constants/theme";
import LikeBtn from "./likebtn/LikeBtn";
import { getReacts, likePost } from "../apis/post.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppContext } from "../contexts/app.context";

const PostCard = ({
  id,
  name,
  profileimage,
  date,
  postimage,
  comment,
  posttitle,
  sheetRef,
  optionSheet,
  hasStory,
}: {
  id: string;
  name: string;
  profileimage: string;
  date: string;
  postimage: any;
  comment: any;
  posttitle: string;
  sheetRef: any;
  optionSheet: any;
  hasStory: boolean;
}) => {
  const navigation = useNavigation();
  const theme = useTheme();
  const queryClient = useQueryClient();
  const { logout, isAuthenticated } = useContext(AppContext);
  const { colors } = theme;
  const [isShow, setIsShow] = useState(false);
  const [show, setshow] = React.useState(true);
  const { data: count } = useQuery({
    queryKey: ["reactPost", id],
    queryFn: () => getReacts(id),
    enabled: isAuthenticated,
  });
  const reactPostMutation = useMutation(likePost);
  const handleClickLike = async () => {
    try {
      reactPostMutation.mutate(id, {
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

  const isLiked = count?.check === "like";
  return (
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
          { paddingVertical: 10, paddingHorizontal: 15, paddingRight: 5 },
        ]}
      >
        <View style={GlobalStyleSheet.flexaling}>
          <View>
            <TouchableOpacity
              onPress={() => {
                hasStory == false
                  ? navigation.navigate("AnotherProfile", { username: name })
                  : navigation.navigate("status", {
                      name: name,
                      image: profileimage,
                      statusData: [IMAGES.profilepic11, IMAGES.profilepic12],
                    });
              }}
            >
              {hasStory == true ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    source={{
                      uri: profileimage,
                    }}
                  />
                  <Image
                    style={{
                      width: 48,
                      height: 48,
                      position: "absolute",
                      resizeMode: "contain",
                    }}
                    source={IMAGES.cricle}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    style={{ width: 40, height: 40, borderRadius: 50 }}
                    source={{
                      uri: profileimage,
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10 }}>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("AnotherProfile", { username: name })
              }
            >
              <Text
                style={{
                  ...FONTS.fontSm,
                  ...FONTS.fontMedium,
                  color: colors.title,
                }}
              >
                {name}
              </Text>
            </TouchableOpacity>
            <Text
              style={{ ...FONTS.fontMedium, fontSize: 11, color: colors.text }}
            >
              {moment(date).fromNow()}
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity onPress={() => sheetRef.current.openSheet()}>
            <Image
              style={{
                width: 18,
                height: 18,
                margin: 10,
                tintColor: colors.title,
              }}
              source={IMAGES.share}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => optionSheet.current.openSheet()}>
            <Image
              style={{
                width: 18,
                height: 18,
                margin: 10,
                tintColor: colors.title,
              }}
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
            backgroundColor: "#fff",
          }}
        >
          {postimage?.map((data: any, index: number) => {
            return (
              <Image
                key={index}
                style={{ width: "100%", height: "100%" }}
                source={{
                  uri: data.url,
                }}
              />
            );
          })}
        </Swiper>
      </View>
      <View
        style={{ paddingHorizontal: 15, paddingBottom: 20, paddingRight: 5 }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={[GlobalStyleSheet.flexaling, { gap: 22 }]}>
            <View style={GlobalStyleSheet.flexaling}>
              <TouchableOpacity>
                <LikeBtn
                  onPress={handleClickLike}
                  color={colors.title}
                  sizes={"sm"}
                  isLiked={isLiked}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("like")}>
                <Text
                  style={[GlobalStyleSheet.postlike, { color: colors.title }]}
                >
                  {count?.total || 0}
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              onPress={() =>
                navigation.navigate("Comments", {
                  postData: id,
                  comment: comment,
                })
              }
            >
              <View style={{ flexDirection: "row", alignItems: "center" }}>
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
                  style={[GlobalStyleSheet.postlike, { color: colors.title }]}
                >
                  {comment.length}
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
        <View style={{ marginTop: 5 }}>
          <View style={{ paddingRight: 35 }}>
            <Text
              numberOfLines={isShow ? null : 2}
              style={{
                ...FONTS.fontRegular,
                color: colors.title,
                fontSize: 13,
              }}
            >
              {posttitle}
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
  );
};

export default PostCard;
