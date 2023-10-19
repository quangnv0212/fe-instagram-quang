import { useTheme } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useRef, useState } from "react";
import {
  Animated,
  Image,
  ImageBackground,
  Share,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import LinearGradient from "react-native-linear-gradient";
import { getProfile } from "../../apis/user.api";
import Followbtn from "../../components/button/Followbtn";
import Sharebtn from "../../components/button/Sharebtn";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../constants/theme";
import { AppContext } from "../../contexts/app.context";
import ProfilePostData from "./ProfilePostData";

const Profile = ({ navigation }) => {
  const authCtx = useContext(AppContext);
  const { data:profileData } = useQuery({
    queryKey: ["profile",authCtx.userName],
    queryFn: () => getProfile(authCtx.userName),
    enabled: Boolean(authCtx.userName),
  });
  const scrollRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slideIndicator = scrollX.interpolate({
    inputRange: [0, SIZES.width],
    outputRange: [0, (SIZES.width - 30) / 2],
    extrapolate: "clamp",
  });

  const onPressTouch = (val) => {
    setCurrentIndex(val);
    scrollRef.current?.scrollTo({
      x: SIZES.width * val,
      animated: true,
    });
  };
  const theme = useTheme();
  const { colors } = theme;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share your profile link here.",
      });
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          // shared with activity type of result.activityType
        } else {
          // shared
        }
      } else if (result.action === Share.dismissedAction) {
        // dismissed
      }
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <View
      style={{
        backgroundColor: theme.dark ? colors.background : colors.card,
        flex: 1,
      }}
    >
      <ScrollView showsVerticalScrollIndicator={false}>
        <ImageBackground
          style={{
            width: "100%",
            height: 340,
            borderBottomLeftRadius: 25,
            borderBottomRightRadius: 25,
            overflow: "hidden",
          }}
          source={{
            uri:"https://img.rawpixel.com/s3fs-private/rawpixel_images/website_content/rm422-076.jpg?w=800&dpr=1&fit=default&crop=default&q=65&vib=3&con=3&usm=15&bg=F4F4F3&ixlib=js-2.2.1&s=c84e74a29cd699a10e8fe5d9cac8ed92"
          }}
        >
          <View style={GlobalStyleSheet.container}>
            <View style={[GlobalStyleSheet.flexalingjust, { marginTop: 10 }]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Image
                  style={{ width: 18, height: 18, tintColor: "#fff" }}
                  source={IMAGES.arrowleft}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => navigation.navigate("Settings")}>
                <View style={GlobalStyleSheet.background}>
                  <Image
                    style={[
                      GlobalStyleSheet.image,
                      { tintColor: COLORS.white },
                    ]}
                    source={IMAGES.setting}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: "center", justifyContent: "center" }}>
            <View>
              <TouchableOpacity>
                <View
                  style={{
                    backgroundColor: "rgba(217, 217, 217, .6)",
                    height: 110,
                    width: 110,
                    borderRadius: 100,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    style={{ width: 100, height: 100, borderRadius: 100 }}
                    source={
                      {uri:profileData?.picture}
                    }
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => navigation.navigate("EditProfile")}
                style={{ position: "absolute", bottom: 0, right: 0 }}
              >
                <View
                  style={{
                    backgroundColor: "#001F50",
                    width: 36,
                    height: 36,
                    borderRadius: 50,
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <View
                    style={{
                      backgroundColor: "#2979F8",
                      width: 30,
                      height: 30,
                      borderRadius: 50,
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Image
                      style={{ width: 18, height: 18, resizeMode: "contain" }}
                      source={IMAGES.write2}
                    />
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{ marginTop: 20, alignItems: "center" }}>
              <Text
                style={{
                  ...FONTS.h6,
                  ...FONTS.fontMedium,
                  color: COLORS.white,
                }}
              >
                {profileData?.username}
              </Text>
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontRegular,
                  color: COLORS.white,
                  opacity: 0.6,
                  marginTop: 5,
                }}
              >
                {profileData?.email}

              </Text>
            </View>
            <View
              style={{
                backgroundColor: "rgba(255, 255, 255, .1)",
                height: 70,
                width: 300,
                borderRadius: 12,
                marginTop: 20,
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "row",
              }}
            >
              <View style={{ alignItems: "center", width: "33.33%" }}>
                <Text style={GlobalStyleSheet.textfont2}>{profileData?.posts?.length}</Text>
                <Text style={GlobalStyleSheet.titlefont}>Post</Text>
              </View>
              <View style={{ width: "33.33%" }}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => navigation.navigate("Followers")}
                >
                  <Text style={GlobalStyleSheet.textfont2}>{ profileData?.followers.length}</Text>
                  <Text style={GlobalStyleSheet.titlefont}>Followers</Text>
                </TouchableOpacity>
              </View>
              <View style={{ width: "33.33%" }}>
                <TouchableOpacity
                  style={{ alignItems: "center" }}
                  onPress={() => navigation.navigate("Followers")}
                >
                  <Text style={GlobalStyleSheet.textfont2}>{ profileData?.following.length}</Text>
                  <Text style={GlobalStyleSheet.titlefont}>Following</Text>
                </TouchableOpacity>
              </View>

              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.00) ",
                  "rgba(255, 255, 255, 0.20)",
                  "rgba(255, 255, 255, 0.00) ",
                ]}
                style={{
                  width: 2,
                  height: 50,
                  position: "absolute",
                  right: 100,
                }}
              ></LinearGradient>
              <LinearGradient
                colors={[
                  "rgba(255, 255, 255, 0.00) ",
                  "rgba(255, 255, 255, 0.20)",
                  "rgba(255, 255, 255, 0.00) ",
                ]}
                style={{
                  width: 2,
                  height: 50,
                  position: "absolute",
                  left: 100,
                }}
              ></LinearGradient>
            </View>
          </View>
        </ImageBackground>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            marginTop: 20,
          }}
        >
          <Followbtn
            onPress={() => navigation.navigate("Search")}
            title="Suggestions"
          />
          <Sharebtn onPress={onShare} title="Share Profile" />
        </View>
        <View
          style={[
            GlobalStyleSheet.container,
            {
              backgroundColor: theme.dark ? "rgba(255,255,255,.1)" : "#EFF3FA",
              padding: 10,
              marginHorizontal: 15,
              borderRadius: 6,
              marginTop: 20,
            },
          ]}
        >
          <Text
            style={{ ...FONTS.fontXs, lineHeight: 18, color: colors.title }}
          >
  {profileData?.details?.bio}
          </Text>
        </View>
        <View style={GlobalStyleSheet.container}>
          <View
            style={{ flexDirection: "row", marginTop: 10, marginBottom: 0 }}
          >
            <TouchableOpacity
              onPress={() => onPressTouch(0)}
              style={GlobalStyleSheet.TouchableOpacity2}
            >
              <Image
                style={[
                  { width: 16, height: 16, tintColor: "#475A77" },
                  currentIndex == 0 && { tintColor: COLORS.primary },
                ]}
                source={IMAGES.profilepic}
              />
              <Text
                style={[
                  {
                    ...FONTS.fontMedium,
                    fontSize: 14,
                    color: "#475A77",
                    marginLeft: 5,
                  },
                  currentIndex == 0 && { color: COLORS.primary },
                ]}
              >
                Post
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onPressTouch(1)}
              style={GlobalStyleSheet.TouchableOpacity2}
            >
              <Image
                style={[
                  { width: 16, height: 16, tintColor: "#475A77" },
                  currentIndex == 1 && { tintColor: COLORS.primary },
                ]}
                source={IMAGES.reels}
              />
              <Text
                style={[
                  {
                    ...FONTS.fontMedium,
                    fontSize: 14,
                    color: "#475A77",
                    marginLeft: 5,
                  },
                  currentIndex == 1 && { color: COLORS.primary },
                ]}
              >
                Reels
              </Text>
            </TouchableOpacity>
            <Animated.View
              style={{
                backgroundColor: COLORS.primary,
                width: "50%",
                height: 2,
                position: "absolute",
                bottom: 0,
                left: 0,
                transform: [{ translateX: slideIndicator }],
              }}
            ></Animated.View>
          </View>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          scrollEventThrottle={16}
          ref={scrollRef}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            { useNativeDriver: false }
          )}
          onMomentumScrollEnd={(e) => {
            if (
              e.nativeEvent.contentOffset.x.toFixed(0) == SIZES.width.toFixed(0)
            ) {
              setCurrentIndex(1);
            } else if (e.nativeEvent.contentOffset.x.toFixed(0) == 0) {
              setCurrentIndex(0);
            } else {
              setCurrentIndex(0);
            }
          }}
        >
          <View style={{ width: SIZES.width }}>
            <ProfilePostData data={profileData?.posts} navigation={navigation} />
          </View>
          <View style={{ width: SIZES.width }}>
            <View
              style={{ marginTop: 5, flexDirection: "row", flexWrap: "wrap" }}
            >
<View></View>
            </View>
          </View>
        </ScrollView>
      </ScrollView>
    </View>
  );
};

export default Profile;
