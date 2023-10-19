import React, { useContext, useState } from "react";
import { View, Text, Image, TouchableOpacity, Modal } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { COLORS, IMAGES } from "../../constants/theme";
import Header from "../../layout/Header";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { useTheme } from "@react-navigation/native";
import { AppContext } from "../../contexts/app.context";
import OptionBar from "../../components/Modal/OptionBar";

const Settings = ({ navigation }: { navigation: any }) => {
  const { logout } = useContext(AppContext);
  const SettingData = [
    {
      id: "1",
      image: IMAGES.bell,
      text: "Notification",
      navigate: "SettingNotification",
    },
    {
      id: "2",
      image: IMAGES.verified,
      text: "Security",
      navigate: "Security",
    },
    {
      id: "3",
      image: IMAGES.usename,
      text: "Account",
      navigate: "Account",
    },
    {
      id: "4",
      image: IMAGES.about,
      text: "About",
      navigate: "About",
    },
    {
      id: "5",
      image: IMAGES.save,
      text: "Save",
      navigate: "Save",
    },
    {
      id: "6",
      image: IMAGES.theme,
      text: "Theme",
      navigate: "Theme",
    },
    {
      id: "7",
      image: IMAGES.logout,
      text: "Log out",
      onPress: () => {
        setModalVisible(true);
      },
    },
  ];

  const theme = useTheme();
  const { colors } = theme;
  const [modalVisible, setModalVisible] = useState(false);
  return (
    <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
      <Header title="Settings" />
      <View style={[GlobalStyleSheet.container, { marginTop: 10 }]}>
        {SettingData.map((data, index) => {
          return (
            <View key={index} style={{ marginHorizontal: -15 }}>
              <TouchableOpacity
                onPress={() => {
                  data.navigate && navigation.navigate(data.navigate);
                  data.onPress && data.onPress();
                }}
                style={[
                  GlobalStyleSheet.flexalingjust,
                  {
                    height: 48,
                    borderBottomWidth: 1,
                    borderBottomColor: colors.border,
                    marginHorizontal: 15,
                  },
                ]}
              >
                <View style={GlobalStyleSheet.flexaling}>
                  <Image
                    style={[
                      GlobalStyleSheet.image2,
                      {
                        height: 20,
                        width: 20,
                        resizeMode: "contain",
                        tintColor: colors.title,
                      },
                    ]}
                    source={data.image}
                  />
                  <Text
                    style={[
                      GlobalStyleSheet.textfont,
                      { fontSize: 15, marginLeft: 10, color: colors.title },
                    ]}
                  >
                    {data.text}
                  </Text>
                </View>
                <Image
                  style={[
                    GlobalStyleSheet.image2,
                    {
                      height: 15,
                      width: 15,
                      resizeMode: "contain",
                      tintColor: colors.title,
                    },
                  ]}
                  source={IMAGES.rigtharrow}
                />
              </TouchableOpacity>
            </View>
          );
        })}
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
          <OptionBar
            cancel={() => {
              setModalVisible(false);
            }}
            confirm={() => {
              logout();
            }}
          />
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Settings;
