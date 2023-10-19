import React from 'react';
import { View, Text, Image,TouchableOpacity } from 'react-native';
import { useTheme } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, IMAGES, SIZES } from '../../constants/theme';
import { GlobalStyleSheet } from '../../constants/styleSheet';

const CreateStory = ({ navigation }) => {

    const theme = useTheme();
    const { colors } = theme;
  return (
    <SafeAreaView style={{backgroundColor:colors.card}}>
      <View style={{paddingVertical:50}}>
        <Image
          style={{
            width: '100%',
            height:'100%',
          }}
          source={IMAGES.musicpic}
        />
        <TouchableOpacity
          style={{ position: 'absolute', left: 20, top: 70 }}
          onPress={() => navigation.navigate('AddStory')}
        >
          <Image
            style={[GlobalStyleSheet.image,{tintColor:COLORS.white}]}
            source={IMAGES.close2}
          />
        </TouchableOpacity>
        <TouchableOpacity
          style={{ position: 'absolute', right: 20, top: 70 }}
          onPress={() => navigation.navigate('Home')}
        >
          <Image
            style={[GlobalStyleSheet.image, { tintColor: COLORS.white, width:25,height:30 }]}
            source={IMAGES.share}
          />
        </TouchableOpacity>
      </View>

      <View style={{ position: 'absolute', bottom: 100, right: 20 }}>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity
            //onPress={() => navigation.navigate('Comments')}
          >
            <View style={GlobalStyleSheet.background}>
              <Image
                style={[GlobalStyleSheet.image, { tintColor: COLORS.white }]}
                source={IMAGES.sticker}
              />
            </View>
          </TouchableOpacity>
          <Text style={GlobalStyleSheet.Text}>Sticker</Text>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity
          //onPress={() => navigation.navigate('Comments')}
          >
            <View style={GlobalStyleSheet.background}>
              <Image
                style={[GlobalStyleSheet.image, { tintColor: COLORS.white }]}
                source={IMAGES.music}
              />
            </View>
          </TouchableOpacity>
          <Text style={GlobalStyleSheet.Text}>Music</Text>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity
          //onPress={() => navigation.navigate('Comments')}
          >
            <View style={GlobalStyleSheet.background}>
              <Image
                style={[GlobalStyleSheet.image, { tintColor: COLORS.white }]}
                source={IMAGES.effect}
              />
            </View>
          </TouchableOpacity>
          <Text style={GlobalStyleSheet.Text}>Effect</Text>
        </View>
        <View style={{ alignItems: 'center', marginBottom: 10 }}>
          <TouchableOpacity
          //onPress={() => navigation.navigate('Comments')}
          >
            <View style={GlobalStyleSheet.background}>
              <Image
                style={[GlobalStyleSheet.image, { tintColor: COLORS.white }]}
                source={IMAGES.text}
              />
            </View>
          </TouchableOpacity>
          <Text style={GlobalStyleSheet.Text}>Text</Text>
        </View>
      </View>  

      
   </SafeAreaView>
  )
}

export default CreateStory;