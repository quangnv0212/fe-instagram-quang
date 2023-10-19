import { useNavigation, useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Share, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyleSheet } from "../constants/styleSheet";
import { FONTS, IMAGES } from "../constants/theme";

const Header = (props: {
  title: string;
  onPress?: any;
  next?: boolean;
  transparent?: boolean;
  post?: boolean;
  share?: boolean;
  more?: boolean;
  moresheet?: any;
  share2?: boolean;
  homepage?: boolean;
  save?: boolean;
  onAddPost?: any;
  image?: any;
}) => {
  const navigation = useNavigation();
  const {
    title,
    onPress,
    next,
    transparent,
    post,
    share,
    more,
    moresheet,
    share2,
    homepage,
    save,
    onAddPost,
    image,
  } = props;

  const theme = useTheme();
  const { colors } = theme;

  const onShare = async () => {
    try {
      const result = await Share.share({
        message: "Share music link here.",
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
      console.log(error);
    }
  };

  return (
    <View
      style={[
        GlobalStyleSheet.headerstyle,
        { backgroundColor: colors.card, borderBottomColor: colors.border },
        transparent == true && {
          position: "absolute",
          left: 0,
          right: 0,
          top: 0,
          zIndex: 1,
          backgroundColor: "transparent",
          borderBottomWidth: 0,
        },
      ]}
    >
      <View>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            style={[
              { width: 18, height: 18, margin: 10, tintColor: colors.title },
              transparent == true && { tintColor: "#fff" },
            ]}
            source={IMAGES.arrowleft}
          />
        </TouchableOpacity>
      </View>
      <Text
        style={[
          {
            ...FONTS.h6,
            ...FONTS.fontMedium,
            marginLeft: 10,
            flex: 1,
            color: colors.title,
          },
          transparent == true && { color: "#fff" },
        ]}
      >
        {title}
      </Text>

      {next == true ? (
        <TouchableOpacity
          onPress={() => navigation.navigate("Nextpage", { image: image })}
        >
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontRegular,
              color: colors.primary,
            }}
          >
            next
          </Text>
        </TouchableOpacity>
      ) : null}

      {post == true ? (
        <TouchableOpacity onPress={onAddPost}>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontRegular,
              color: colors.primary,
            }}
          >
            Post
          </Text>
        </TouchableOpacity>
      ) : null}

      {share == true ? (
        <TouchableOpacity onPress={onShare}>
          <Image
            style={[
              GlobalStyleSheet.image,
              { tintColor: colors.title, margin: 10 },
            ]}
            source={IMAGES.share}
          />
        </TouchableOpacity>
      ) : null}

      {more == true ? (
        <TouchableOpacity onPress={() => moresheet.current.openSheet()}>
          <Image
            style={[
              GlobalStyleSheet.image,
              { tintColor: colors.title, margin: 10, marginRight: 0 },
            ]}
            source={IMAGES.more}
          />
        </TouchableOpacity>
      ) : null}

      {share2 == true ? (
        <TouchableOpacity onPress={() => navigation.navigate("Home")}>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontRegular,
              color: colors.primary,
            }}
          >
            share
          </Text>
        </TouchableOpacity>
      ) : null}

      {save == true ? (
        <TouchableOpacity onPress={() => navigation.navigate("SavedMusic")}>
          <Image
            style={[
              GlobalStyleSheet.image,
              { tintColor: colors.title, margin: 10, marginRight: 0 },
            ]}
            source={IMAGES.save2}
          />
        </TouchableOpacity>
      ) : null}
    </View>
  );
};

export default Header;
