import { useNavigation, useTheme } from "@react-navigation/native";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import moment from "moment";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  KeyboardAvoidingView,
  Platform,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";
import { commentPost, getPostDetails } from "../../apis/post.api";
import ChatoptionSheet from "../../components/bottomsheet/ChatoptionSheet";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { FONTS, IMAGES } from "../../constants/theme";
const Item = ({
  title,
  image,
  time,
  comment,
  moresheet,
  hasStory,
  navigation,
  theme,
}: {
  title: string;
  image: string;
  time: string;
  comment: string;
  moresheet: any;
  hasStory: boolean;
  navigation: any;
  theme: any;
}) => {
  const { colors } = theme;
  return (
    <View style={[GlobalStyleSheet.container, { marginTop: 0 }]}>
      <View style={{ marginBottom: 20 }}>
        <View style={{ flexDirection: "row" }}>
          <View style={{ marginTop: 10 }}>
            <TouchableOpacity
              onPress={() => {
                hasStory == false
                  ? navigation.navigate("status", {
                      name: title,
                      image: image,
                      statusData: [IMAGES.profilepic11, IMAGES.profilepic12],
                    })
                  : navigation.navigate("AnotherProfile", { username: title });
              }}
            >
              {hasStory == false ? (
                <View
                  style={{ justifyContent: "center", alignItems: "center" }}
                >
                  <Image
                    style={{ width: 42, height: 42, borderRadius: 50 }}
                    source={{
                      uri: image,
                    }}
                  />
                  <Image
                    style={{
                      width: 50,
                      height: 50,
                      position: "absolute",
                      resizeMode: "contain",
                    }}
                    source={IMAGES.cricle}
                  />
                </View>
              ) : (
                <View>
                  <Image
                    style={{ width: 42, height: 42, borderRadius: 50 }}
                    source={{
                      uri: image,
                    }}
                  />
                </View>
              )}
            </TouchableOpacity>
          </View>
          <View style={{ marginLeft: 10, flex: 1 }}>
            <View style={[GlobalStyleSheet.flexaling, { gap: 10 }]}>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("AnotherProfile", { username: title })
                }
              >
                <Text
                  style={[
                    GlobalStyleSheet.textfont,
                    { marginBottom: 5, color: colors.title },
                  ]}
                >
                  {title}
                </Text>
              </TouchableOpacity>
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: 100,
                  backgroundColor: colors.placeholder,
                  opacity: 0.5,
                }}
              />
              <Text
                style={{
                  ...FONTS.fontSm,
                  ...FONTS.fontMedium,
                  color: colors.text,
                  opacity: 0.5,
                }}
              >
                {moment(time).fromNow()}
              </Text>
            </View>
            <View>
              <Text
                style={{
                  ...FONTS.font,
                  ...FONTS.fontMedium,
                  color: colors.title,
                  marginBottom: 10,
                }}
              >
                {comment}
              </Text>
            </View>
          </View>
          <View>
            <TouchableOpacity onPress={() => moresheet.current.openSheet()}>
              <Image
                style={{
                  width: 15,
                  height: 15,
                  resizeMode: "contain",
                  marginTop: 15,
                  tintColor: colors.title,
                }}
                source={IMAGES.more}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const Comments = (props) => {
  const theme = useTheme();
  const { colors } = theme;
  const moresheet = React.useRef();
  const navigation = useNavigation();
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const commentMutation = useMutation(commentPost);
  const { data } = useQuery({
    queryKey: ["comment", props.route.params.postData],
    queryFn: () => getPostDetails(props.route.params.postData),
    enabled: !!props.route.params.postData,
  });
  const postId = props.route.params.postData;
  const onComment = async () => {
    commentMutation.mutate(
      { comment: value, image: "", postId },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries({
            queryKey: ["comment", props.route.params.postData],
          });
          queryClient.invalidateQueries({
            queryKey: ["post"],
          });
          setValue("");
        },
        onError(error, variables, context) {
          console.log(error);
        },
      }
    );
  };
  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: colors.card,
      }}
    >
      <View style={GlobalStyleSheet.container}>
        <View
          style={{
            height: 50,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Image
                style={{ width: 18, height: 18, tintColor: colors.title }}
                source={IMAGES.arrowleft}
              />
            </TouchableOpacity>
            <View>
              <Text
                style={{
                  ...FONTS.fontMedium,
                  fontSize: 16,
                  color: colors.title,
                  marginLeft: 20,
                }}
              >
                Comments
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{ ...FONTS.fontMedium, fontSize: 16, color: colors.title }}
            >
              365
            </Text>
          </View>
        </View>
        <View style={{ marginBottom: 10 }}>
          <TouchableOpacity
            style={{
              zIndex: 1,
              position: "absolute",
              top: 13,
              left: 15,
            }}
          >
            <Image
              style={{
                tintColor: colors.text,
                width: 20,
                height: 20,
              }}
              source={IMAGES.happy}
            />
          </TouchableOpacity>
          <TextInput
            value={value}
            onChangeText={(text) => setValue(text)}
            placeholder="Send your comment..."
            placeholderTextColor={colors.placeholder}
            style={[
              GlobalStyleSheet.inputBox,
              {
                backgroundColor: colors.input,
              },
            ]}
          />
          <TouchableOpacity
            onPress={onComment}
            style={{
              zIndex: 1,
              position: "absolute",
              top: 13,
              right: 15,
            }}
          >
            <Image
              style={{
                tintColor: colors.primary,
                width: 20,
                height: 20,
              }}
              source={IMAGES.send}
            />
          </TouchableOpacity>
        </View>
      </View>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <FlatList
          showsVerticalScrollIndicator={false}
          data={data?.comments}
          renderItem={({ item }) => (
            <Item
              title={item.commentBy?.username}
              image={item.commentBy?.picture}
              id={item?._id}
              time={item?.commentAt}
              comment={item?.comment}
              like={35}
              commentNumber={30}
              counter={60}
              moresheet={moresheet}
              hasStory={true}
              navigation={navigation}
              theme={theme}
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </KeyboardAvoidingView>
      <ChatoptionSheet ref={moresheet} deleteChat={false} />
    </SafeAreaView>
  );
};

export default Comments;
