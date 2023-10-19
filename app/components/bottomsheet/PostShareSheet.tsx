import React, {
  forwardRef,
  useCallback,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Keyboard,
} from "react-native";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetScrollView,
  BottomSheetTextInput,
  BottomSheetView,
  useBottomSheetDynamicSnapPoints,
} from "@gorhom/bottom-sheet";
import { useTheme } from "@react-navigation/native";
import { GlobalStyleSheet } from "../../constants/styleSheet";
import { COLORS, FONTS, IMAGES, SIZES } from "../../constants/theme";
import Button from "../button/Button";
import { useNavigation } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { getAllUser } from "../../apis/user.api";

const Item = ({
  title,
  image,
  text,
  hasStory,
  navigation,
  theme,
}: {
  title: string;
  image: any;
  text: string;
  hasStory: boolean;
  navigation: any;
  theme: any;
}) => {
  const [isChecked, setIsChecked] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => setIsChecked(!isChecked)}
      style={{
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        paddingHorizontal: 15,
        marginBottom: 10,
      }}
    >
      <View
        style={{ flexDirection: "row", alignItems: "center", marginBottom: 10 }}
      >
        <View>
          <TouchableOpacity
            onPress={() => {
              hasStory == false
                ? navigation.navigate("AnotherProfile")
                : navigation.navigate("status", {
                    name: title,
                    image: image,
                    statusData: [IMAGES.profilepic11, IMAGES.profilepic12],
                  });
            }}
            style={{ marginRight: 10 }}
          >
            {hasStory == true ? (
              <View style={{ justifyContent: "center", alignItems: "center" }}>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  source={image}
                />
                <Image
                  style={{
                    width: 58,
                    height: 58,
                    position: "absolute",
                    resizeMode: "contain",
                  }}
                  source={IMAGES.cricle}
                />
              </View>
            ) : (
              <View>
                <Image
                  style={{ width: 50, height: 50, borderRadius: 50 }}
                  source={{
                    uri: image,
                  }}
                />
              </View>
            )}
          </TouchableOpacity>
        </View>
        <View>
          <Text
            style={{
              ...FONTS.font,
              ...FONTS.fontMedium,
              color: theme.colors.title,
            }}
          >
            {title}
          </Text>
          <Text style={{ ...FONTS.fontXs, color: theme.colors.text }}>
            {text}
          </Text>
        </View>
      </View>

      <View
        style={[
          {
            borderWidth: 2,
            width: 22,
            height: 22,
            borderRadius: 50,
            borderColor: theme.colors.border,
            alignItems: "center",
            justifyContent: "center",
          },
          isChecked == true && {
            backgroundColor: "#2979F8",
            borderWidth: 0,
          },
        ]}
      >
        <View
          style={{
            width: 10,
            height: 10,
            backgroundColor: theme.colors.card,
            borderRadius: 50,
          }}
        ></View>
      </View>
    </TouchableOpacity>
  );
};

const PostShareSheet = (props, ref) => {
  // ref
  const { data: userList } = useQuery({
    queryKey: ["userList"],
    queryFn: () => getAllUser(),
  });
  const bottomSheetRef = useRef(null);
  // variables
  const snapPoints = useMemo(() => ["75%"], []);
  // callbacks
  const handleSheetChanges = useCallback((index) => {
    if (index === -1) {
      Keyboard.dismiss();
    }
  }, []);

  // renders
  const renderBackdrop = useCallback((props) => (
    <BottomSheetBackdrop {...props} disappearsOnIndex={-1} appearsOnIndex={0} />
  ));

  const navigation = useNavigation();

  useImperativeHandle(ref, () => ({
    // methods connected to `ref`
    openSheet: () => {
      openSheet();
    },
  }));
  // internal method
  const openSheet = () => {
    bottomSheetRef.current.snapToIndex(0);
  };

  const theme = useTheme();
  const { colors } = theme;

  return (
    <BottomSheet
      ref={bottomSheetRef}
      index={-1}
      enablePanDownToClose={true}
      snapPoints={snapPoints}
      keyboardBehavior="interactive"
      android_keyboardInputMode={"adjustResize"}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      handleStyle={{ top: 0 }}
      handleIndicatorStyle={{ backgroundColor: colors.border, width: 92 }}
      backgroundStyle={{ backgroundColor: colors.card }}
    >
      <BottomSheetTextInput
        placeholder="Search here..."
        placeholderTextColor={colors.placeholder}
        style={[
          GlobalStyleSheet.inputBox,
          {
            backgroundColor: colors.input,
            paddingLeft: 25,
            marginHorizontal: 15,
          },
        ]}
      />
      <View style={{ flex: 1 }}>
        <BottomSheetFlatList
          showsVerticalScrollIndicator={false}
          data={userList}
          renderItem={({ item }: any) => (
            <Item
              title={item?.username}
              image={item?.picture}
              text={item?.email}
              hasStory={false}
              navigation={navigation}
              theme={theme}
            />
          )}
          keyExtractor={(item) => item.id}
        />
        <View style={{ paddingHorizontal: 30, paddingBottom: 10 }}>
          <Button title="Send" />
        </View>
      </View>
    </BottomSheet>
  );
};

export default forwardRef(PostShareSheet);
