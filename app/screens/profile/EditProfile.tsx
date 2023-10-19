import React, { useContext, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  Platform,
  Modal,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ImagePicker from "react-native-image-crop-picker";
import { IMAGES } from "../../constants/theme";
import Header from "../../layout/Header";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import Button from "../../components/button/Button";
import { useNavigation, useTheme } from "@react-navigation/native";
import http from "../../utils/http";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  getProfile,
  updateProfile,
  updateProfilePicture,
} from "../../apis/user.api";
import { launchImageLibrary } from "react-native-image-picker";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { AppContext } from "../../contexts/app.context";
import { set } from "react-hook-form";
import { uploadImages } from "../../apis/post.api";
import SuccessModal from "../../components/Modal/SuccessModal";

const EditProfile = () => {
  const theme = useTheme();
  const { userName } = useContext(AppContext);
  const { data: profileData } = useQuery({
    queryKey: ["profile", userName],
    queryFn: () => getProfile(userName),
    enabled: Boolean(userName),
  });
  const queryClient = useQueryClient();
  const [modalVisible, setModalVisible] = useState(false);
  const [value, setValue] = useState(profileData?.details?.bio);
  const [selectImage, setSelectImage] = React.useState(profileData?.picture);
  const { colors } = theme;
  const handleImageSelect = () => {
    if (Platform.OS == "android") {
      try {
        ImagePicker.openPicker({
          width: 200,
          height: 200,
          cropping: true,
        }).then((image) => {
          setImageUrl(image.path);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      pickImage();
    }
  };
  const pickImage = () => {
    const options = {
      storageOptions: {
        path: "images",
      },
    };
    launchImageLibrary(options, (response) =>
      setSelectImage(response.assets[0].uri)
    );
  };
  const updateProfileMutation = useMutation(updateProfile);
  const updateProfilePictureMutation = useMutation(updateProfilePicture);

  const updateBio = async () => {
    try {
      const uploadImageRes = await uploadImages(selectImage);
      const { url } = uploadImageRes.data[0];
      updateProfilePictureMutation.mutate(
        { url: url },
        {
          onSuccess(data, variables, context) {
            console.log(data);
          },
          onError(error, variables, context) {
            console.log(error);
          },
        }
      );
      updateProfileMutation.mutate(
        { bio: value },
        {
          onSuccess(data, variables, context) {
            queryClient.invalidateQueries(["profile", userName]);
            setModalVisible(true);
            queryClient.invalidateQueries(["userList"]);
          },
          onError(error, variables, context) {
            console.log(error);
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
      <Header title="Edit profile" />
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
          marginTop: 20,
        }}
      >
        <View>
          <View style={{}}>
            <Image
              style={{ width: 100, height: 100, borderRadius: 100 }}
              source={selectImage ? { uri: selectImage } : IMAGES.profile}
            />
          </View>
          <TouchableOpacity
            onPress={handleImageSelect}
            style={{ position: "absolute", bottom: 0, right: 0 }}
          >
            <View
              style={{
                backgroundColor: theme.dark ? "#112036" : "#fff",
                width: 36,
                height: 36,
                borderRadius: 50,
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <View
                style={{
                  backgroundColor: "#2979F8",
                  width: 30,
                  height: 30,
                  borderRadius: 50,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Image
                  style={{ width: 18, height: 18, resizeMode: "contain" }}
                  source={IMAGES.write2}
                />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[GlobalStyleSheet.container, { marginTop: 15 }]}>
        <Text
          style={[
            GlobalStyleSheet.inputlable,
            { color: colors.title, opacity: 0.6 },
          ]}
        >
          Bio
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
            value={value}
            onChangeText={(text) => setValue(text)}
            multiline
            numberOfLines={5}
            placeholder="Bio"
            style={[
              GlobalStyleSheet.input,
              {
                color: colors.title,
                height: "auto",
                paddingTop: 10,
                paddingRight: 10,
                textAlignVertical: "top",
                paddingBottom: 10,
              },
            ]}
          />
        </View>

        <Button title="Save" onPress={updateBio} />
      </View>
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

export default EditProfile;
