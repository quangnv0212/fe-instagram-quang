import {
  View,
  Text,
  Image,
  TouchableOpacity,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useContext } from "react";
import { IMAGES } from "../../constants/theme";
import StoryItem from "../../components/story/StoryItem";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../apis/user.api";
import { AppContext } from "../../contexts/app.context";

const StoryList = ({ theme }: { theme: any }) => {
  const { colors } = theme;
  const { logout, isAuthenticated } = useContext(AppContext);

  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getAllUser(),
    enabled: isAuthenticated,
  });
  return (
    <View style={{ marginHorizontal: -15 }}>
      <FlatList
        contentContainerStyle={{ paddingLeft: 10, paddingTop: 5 }}
        horizontal
        data={userList}
        renderItem={({ item }) => {
          return <StoryItem username={item.username} />;
        }}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        style={{
          paddingVertical: 10,
          borderBottomWidth: 1,
          borderBottomColor: colors.border,
        }}
      />
    </View>
  );
};

export default StoryList;
