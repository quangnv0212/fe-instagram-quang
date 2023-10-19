import React from "react";
import { View, Text, TouchableOpacity, Image } from "react-native";
import { IMAGES, FONTS, COLORS } from "../../constants/theme";

const ProfilePostData = ({
  data,
  navigation,
}: {
  data: any;
  navigation: any;
}) => {
  return (
    <View style={{ marginTop: 5, flexDirection: "row", flexWrap: "wrap" }}>
      {data?.map((data: any, index: number) => {
        return (
          <View key={index} style={[{ width: "33.33%" }]}>
            <TouchableOpacity
              style={{ padding: 2 }}
              onPress={() => navigation.navigate("ProfilePost", { data: data })}
            >
              <Image
                style={{ width: "100%", height: undefined, aspectRatio: 1 / 1 }}
                source={{ uri: data?.images[0]?.url }}
              />
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  );
};

export default ProfilePostData;
