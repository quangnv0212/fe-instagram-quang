import React from 'react';
import { Platform, Text, TouchableOpacity } from 'react-native';
import DropShadow from 'react-native-drop-shadow';
import LinearGradient from 'react-native-linear-gradient';
import { GlobalStyleSheet } from '../../constants/styleSheet';
import { COLORS, SIZES } from '../../constants/theme';
import { useTheme } from '@react-navigation/native';

export const Followbtn = (props) => {

    const { title, onPress,color } = props;

    const theme = useTheme();
    const {colors} = theme;

    return (
        <TouchableOpacity
            onPress={onPress}
        >
            <DropShadow
                style={[GlobalStyleSheet.shadowPrimary,color && {shadowOpacity:0},Platform.OS === 'ios' && !color && {backgroundColor:COLORS.primary,borderRadius:SIZES.radius_lg}]}
            >
                <LinearGradient
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    colors={['#7BAEFF', '#156CF7']}
                    style={GlobalStyleSheet.followbtn}
                >
                    <Text style={GlobalStyleSheet.followbtnTxt}>{title}</Text>
                </LinearGradient>
            </DropShadow>

        </TouchableOpacity>
    )
}


export default Followbtn