import React, { useContext, useRef } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import HomeHeader from "./HomeHeader";
import StoryList from "./StoryList";
import PostList from "./PostList";
import PostShareSheet from "../../components/bottomsheet/PostShareSheet";
import PostoptionSheet from "../../components/bottomsheet/PostoptionSheet";
import { AppContext } from "../../contexts/app.context";
import { getAllPosts } from "../../apis/post.api";
import { useQuery } from "@tanstack/react-query";

const HomeScreen = () => {
  const { logout, isAuthenticated } = useContext(AppContext);
  const theme = useTheme();
  const { colors } = theme;
  const sheetRef = useRef();
  const moresheet = useRef();
  const scrollRef = useRef();
  const { data: posts } = useQuery({
    queryKey: ["post"],
    queryFn: () => getAllPosts(),
    enabled: isAuthenticated,
  });
  const postListData = posts?.data;
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.card,
      }}
    >
      <ScrollView scrollEventThrottle={16} showsVerticalScrollIndicator={false}>
        <View style={GlobalStyleSheet.container}>
          <HomeHeader theme={theme} />
          <StoryList theme={theme} />
          <PostList
            postListData={postListData}
            sheetRef={sheetRef}
            optionSheet={moresheet}
            ref={scrollRef}
          />
        </View>
      </ScrollView>
      <PostShareSheet ref={sheetRef} />
      <PostoptionSheet ref={moresheet} />
    </SafeAreaView>
  );
};

export default HomeScreen;
