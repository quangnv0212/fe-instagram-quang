import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Image, Text, TouchableOpacity, View } from "react-native";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { IMAGES } from "../../constants/theme";

const HomeHeader = ({ theme }: { theme: any }) => {
  const { colors } = theme;
  const navigation = useNavigation();
  return (
    <View style={[GlobalStyleSheet.flexalingjust, { height: 50 }]}>
      <View style={{ flexDirection: "row" }}>
        <Image
          style={{
            width: 40,
            height: 40,
            tintColor: theme.dark ? "#fff" : "#475A77",
          }}
          source={IMAGES.logo2}
        />
        <Image
          style={{
            width: 40,
            height: 40,
            tintColor: theme.dark ? "#fff" : "#475A77",
          }}
          source={IMAGES.logo}
        />
        <Image
          style={{
            width: 40,
            height: 40,
            tintColor: theme.dark ? "#fff" : "#475A77",
          }}
          source={IMAGES.logo3}
        />
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={[
            GlobalStyleSheet.btnicon,
            {
              marginRight: 10,
              backgroundColor: theme.dark ? "rgba(255,255,255,.1)" : "#EFF3FA",
            },
          ]}
          onPress={() => navigation.navigate("createpost")}
        >
          <Image
            style={{
              width: 16,
              height: 16,
              tintColor: theme.dark ? "#fff" : "#475A77",
            }}
            source={IMAGES.plus}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            GlobalStyleSheet.btnicon,
            {
              marginRight: 10,
              backgroundColor: theme.dark ? "rgba(255,255,255,.1)" : "#EFF3FA",
            },
          ]}
          onPress={() => navigation.navigate("notification")}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              tintColor: theme.dark ? "#fff" : "#475A77",
            }}
            source={IMAGES.bell}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default HomeHeader;
