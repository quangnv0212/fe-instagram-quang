import React from 'react';
import {  Platform, Text, TouchableOpacity } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { COLORS, SIZES } from '../../constants/theme';

export const Button = (props) => {

    const { title, onPress, style, color, size } = props;

  return (
      <TouchableOpacity
        onPress={onPress}
      >
          <DropShadow
              style={[GlobalStyleSheet.shadowPrimary,color && {shadowOpacity:0},Platform.OS === 'ios' && !color && {backgroundColor:COLORS.primary,borderRadius:SIZES.radius_lg}, style && { ...style }]}
          >
              <LinearGradient
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 0 }}
                  colors={color ? [color , color] : ['#7BAEFF', '#156CF7'] }
                  style={[
                      GlobalStyleSheet.btn,
                      size === 'sm' && {
                          paddingHorizontal: 25,
                          paddingVertical: 10,
                          height: 40,
                      }, size === 'lg' && {
                          paddingHorizontal: 35,
                          paddingVertical: 16,
                          height: 58,
                      }
                  ]}
              >
                  <Text style={GlobalStyleSheet.btnTxt}>{title}</Text>
              </LinearGradient>
          </DropShadow>

      </TouchableOpacity>
  )
}



export default Button;