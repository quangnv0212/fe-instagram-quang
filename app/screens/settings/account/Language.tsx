import React, { useState } from 'react';
import { View, Text, SafeAreaView, Image, TextInput, TouchableOpacity } from 'react-native';
import { COLORS, IMAGES } from '../../../constants/theme';
import Header from '../../../layout/Header';
import { GlobalStyleSheet } from '../../../constants/styleSheet';
import Button from '../../../components/button/Button';
import LanguageSheet from '../../../components/bottomsheet/LanguageoptionSheet';
import { useTheme } from '@react-navigation/native';


const Language = () => {

    const moresheet = React.useRef();
    
    const [Language, setLanguage] = useState('English');

    const theme = useTheme();
    const { colors } = theme;


  return (
     <SafeAreaView style={{ backgroundColor: colors.card, flex: 1 }}>
            <Header
              title='Language'
            />
          <View style={[GlobalStyleSheet.container, { marginTop: 15 }]}>
              <View>
                <View
                    style={[
                        GlobalStyleSheet.inputBox, {
                            borderColor:colors.border,
                            borderWidth: 1,
                            paddingLeft:20
                        },
                    ]}
                >
                    <Image
                        style={[GlobalStyleSheet.inputimage,{ tintColor: colors.title, left:'auto',right:15,}]}
                        source={IMAGES.downaeeowsmall}
                    />

                    <TextInput
                          editable={false}
                          style={[GlobalStyleSheet.input, { color: colors.title, }]}
                          value={Language}
                          placeholderTextColor={colors.border}
                    />
                </View>   
                  <TouchableOpacity style={{ position: 'absolute', top: 0, right: 0, left: 0, bottom: 0 }}
                      onPress={() => moresheet.current.openSheet()}
                  ></TouchableOpacity>
              </View>
              <Button
                  title="Save"
              />
          </View>
          <LanguageSheet
              ref={moresheet}
              setLanguage={setLanguage}
          />
      </SafeAreaView>
  )
}

export default Language