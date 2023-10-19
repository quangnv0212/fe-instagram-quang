import React, { forwardRef } from "react";
import { View } from "react-native";
import { FlatList } from "react-native-gesture-handler";
import PostCard from "../../components/PostCard";

const PostList = (props, ref: { props: any; ref: any }) => {
  return (
    <View>
      <FlatList
        data={props.postListData}
        renderItem={({ item }) => {
          return (
            <PostCard
              id={item._id}
              name={item.user.username}
              profileimage={item.user.picture}
              date={item.createdAt}
              postimage={item.images}
              comment={item?.comments || []}
              posttitle={item.text}
              sheetRef={props.sheetRef}
              optionSheet={props.optionSheet}
              hasStory={false}
            />
          );
        }}
      />
    </View>
  );
};

export default forwardRef(PostList);
