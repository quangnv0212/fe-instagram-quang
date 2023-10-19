import { useTheme } from "@react-navigation/native";
import React from "react";
import { Image, Pressable } from "react-native";
import {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import { IMAGES } from "../../constants/theme";
const LikeBtn = ({
  color,
  sizes,
  onPress,
  isLiked,
}: {
  color?: string;
  sizes?: string;
  onPress: () => void;
  isLiked?: boolean;
}) => {
  const liked = useSharedValue(0);
  const outlineStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: interpolate(liked.value, [0, 1], [1, 0], Extrapolate.CLAMP),
        },
      ],
    };
  });
  const fillStyle = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: liked.value,
        },
      ],
    };
  });
  const theme = useTheme();
  const { colors } = theme;

  const handleLike = () => {
    liked.value = withSpring(liked.value ? 0 : 1);
    onPress();
  };

  return (
    <Pressable
      accessible={true}
      accessibilityLabel="Like Btn"
      accessibilityHint="Like this item"
      onPress={() => {
        handleLike();
      }}
      style={[
        {
          alignItems: "center",
          justifyContent: "center",
        },
        sizes == "sm"
          ? {
              height: 25,
              width: 25,
            }
          : sizes == "xm"
          ? {
              height: 20,
              width: 20,
            }
          : sizes == "xs"
          ? {
              height: 15,
              width: 15,
            }
          : {
              height: 50,
              width: 50,
            },
      ]}
    >
      <Image
        style={[
          {
            resizeMode: "contain",
          },
          sizes == "sm"
            ? {
                height: 22,
                width: 22,
              }
            : sizes == "xm"
            ? {
                height: 20,
                width: 20,
              }
            : sizes == "xs"
            ? {
                height: 15,
                width: 15,
              }
            : {
                height: 25,
                width: 25,
              },
        ]}
        source={isLiked ? IMAGES.like : IMAGES.like2}
      />
    </Pressable>
  );
};

export default LikeBtn;
