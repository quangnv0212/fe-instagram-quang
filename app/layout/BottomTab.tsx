import {
  View,
  TouchableOpacity,
  Image,
  Animated,
  Platform,
} from "react-native";
import { COLORS, IMAGES, SIZES } from "../constants/theme";
import DropShadow from "react-native-drop-shadow";
import { GlobalStyleSheet } from "../constants/styleSheet";
import { useTheme } from "@react-navigation/native";
import { useContext, useEffect, useRef } from "react";
import { AppContext } from "../contexts/app.context";

function BottomTab({
  state,
  descriptors,
  navigation,
}: {
  state: any;
  descriptors: any;
  navigation: any;
}) {
  const theme = useTheme();
  const { colors } = theme;
  const tabWidth = SIZES.width;
  const circlePosition = useRef(
    new Animated.Value(
      tabWidth < SIZES.container ? tabWidth / 2.5 : SIZES.container / 2.5
    )
  ).current;
  const tabW = tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5;

  useEffect(() => {
    Animated.spring(circlePosition, {
      toValue: state.index * tabW,
      useNativeDriver: true,
    }).start();
  }, [state.index]);

  return (
    <DropShadow
      style={[
        GlobalStyleSheet.shadow,
        Platform.OS === "ios" && { backgroundColor: colors.card },
      ]}
    >
      <View
        style={{
          flexDirection: "row",
          height: 60,
          backgroundColor: colors.card,
          alignItems: "center",
        }}
      >
        <Animated.View
          style={{
            position: "absolute",
            height: "100%",
            width:
              tabWidth < SIZES.container ? tabWidth / 5 : SIZES.container / 5,
            alignItems: "center",
            justifyContent: "center",
            transform: [{ translateX: circlePosition }],
          }}
        >
          <View
            style={{
              height: 40,
              width: 40,
              borderRadius: 38,
              backgroundColor: COLORS.primary,
              opacity: 0.15,
            }}
          />
        </Animated.View>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              // The `merge: true` option makes sure that the params inside the tab screen are preserved
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };
          const { avatar } = useContext(AppContext);
          return (
            <TouchableOpacity
              key={index}
              activeOpacity={0.8}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{
                flex: 1,
                alignItems: "center",
                height: "100%",
                justifyContent: "center",
              }}
            >
              <Image
                style={
                  label == "Profile"
                    ? { width: 34, height: 34, borderRadius: 50 }
                    : {
                        width: 20,
                        height: 20,
                        opacity: isFocused ? 1 : 0.4,
                        tintColor: isFocused ? COLORS.primary : colors.text,
                      }
                }
                source={
                  label == "Home"
                    ? IMAGES.home
                    : label == "Search"
                    ? IMAGES.search
                    : label == "Reels"
                    ? IMAGES.reels
                    : label == "Chat"
                    ? IMAGES.chat
                    : label == "Profile"
                    ? {
                        uri: avatar,
                      }
                    : IMAGES.eyeclose
                }
              />
            </TouchableOpacity>
          );
        })}
      </View>
    </DropShadow>
  );
}

export default BottomTab;
