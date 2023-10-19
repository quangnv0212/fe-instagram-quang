import { useTheme } from "@react-navigation/native";
import React from "react";
import {
  Image,
  Modal,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { launchImageLibrary } from "react-native-image-picker";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { FONTS, IMAGES, SIZES } from "../../constants/theme";
import Header from "../../layout/Header";
import SuccessModal from "../../components/Modal/SuccessModal";
const CreatePost = ({ navigation }: { navigation: any }) => {
  const [selectImage, setSelectImage] = React.useState("");
  const theme = useTheme();
  const { colors } = theme;
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
  return (
    <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
      <Header title="New Post" next={true} image={selectImage} />
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
              uri: selectImage,
            }}
          />
        </View>
      </View>
      <View style={[GlobalStyleSheet.flexaling, { paddingHorizontal: 15 }]}>
        <Text
          style={{
            flex: 1,
            ...FONTS.fontMedium,
            ...FONTS.h5,
            color: colors.title,
          }}
        >
          Gallery
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("WriteCaption")}
          style={{ padding: 10 }}
        >
          <Image
            style={{ height: 24, width: 24, tintColor: colors.title }}
            source={IMAGES.write}
          />
        </TouchableOpacity>
        <TouchableOpacity style={{ padding: 10 }} onPress={pickImage}>
          <Image
            style={{ height: 24, width: 24, tintColor: colors.title }}
            source={IMAGES.camera}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CreatePost;
