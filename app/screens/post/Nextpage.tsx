import React, { useState } from "react";
import {
  View,
  Text,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  Modal,
} from "react-native";
import { useNavigation, useTheme } from "@react-navigation/native";
import Header from "../../layout/Header";
import { IMAGES, SIZES } from "../../constants/theme";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { ScrollView } from "react-native-gesture-handler";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPost, uploadImages } from "../../apis/post.api";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import http from "../../utils/http";
import Button from "../../components/button/Button";
import { TouchableOpacity } from "@gorhom/bottom-sheet";
import SuccessModal from "../../components/Modal/SuccessModal";

const Nextpage = (props) => {
  const image = props.route.params.image;
  const theme = useTheme();
  const { colors } = theme;
  const [value, setValue] = useState("");
  const queryClient = useQueryClient();
  const navigation = useNavigation();

  const createPostMutation = useMutation(createPost);

  const onAddPost = async () => {
    const idUser = await AsyncStorage.getItem("id_user");
    const response = await uploadImages(image);
    const imageResponse = response.data;
    createPostMutation.mutate(
      {
        type: null,
        background: "text",
        text: value,
        user: idUser,
        images: imageResponse,
      },
      {
        onSuccess(data, variables, context) {
          queryClient.invalidateQueries("post");
          setModalVisible(true);
          navigation.replace("BottomNavigation");
        },
        onError(error: any, variables, context) {
          console.log(error);
          if (error.response.status === 400) {
            // logout();
          }
        },
      }
    );
  };
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
      <Header title="New Post" post={true} onAddPost={onAddPost} />
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : ""}
      >
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <View
              style={{
                paddingVertical: 30,
                backgroundColor: "rgba(71,90,119,.25)",
              }}
            >
              <Image
                style={{
                  height: SIZES.width - SIZES.width * (20 / 100),
                  width: "100%",
                  resizeMode: "contain",
                }}
                source={{
                  uri: image,
                }}
              />
            </View>
          </View>
          <View style={[GlobalStyleSheet.container, { marginTop: 20 }]}>
            <Text
              style={[
                GlobalStyleSheet.inputlable,
                { color: colors.title, opacity: 0.6 },
              ]}
            >
              Write a caption...
            </Text>
            <View
              style={[
                GlobalStyleSheet.inputBox,
                {
                  borderColor: colors.border,
                  borderWidth: 1,
                  paddingLeft: 20,
                  height: "auto",
                },
              ]}
            >
              <TextInput
                multiline
                numberOfLines={5}
                value={value}
                onChangeText={(text) => setValue(text)}
                style={[
                  GlobalStyleSheet.input,
                  {
                    color: colors.title,
                    height: "auto",
                    paddingTop: 10,
                    paddingRight: 10,
                    paddingBottom: 10,
                    textAlignVertical: "top",
                  },
                ]}
              />
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
      <Modal animationType="slide" transparent={true} visible={modalVisible}>
        <View
          style={{
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
            position: "relative",
          }}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setModalVisible(false)}
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              backgroundColor: "rgba(0,0,0,.3)",
            }}
          />
          <SuccessModal />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Nextpage;
