import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../utils/Colors'

const CustomDropDown = ({ title, placeholder, bad, onClick }) => {
    return (
        <TouchableOpacity style={[styles.inputBox, { borderColor: bad ? 'red' : '#9e9e9e' }]}
            onPress={() => {
                onClick();
            }}
        >
            <Text style={[styles.title, { color: bad ? 'red' : TEXT_COLOR }]}>{title}</Text>
            <Text style={{ color: placeholder.includes('Select') ? '#9e9e9e' : TEXT_COLOR }}>{placeholder}</Text>
            <Image source={require('../images/down.png')} style={styles.icon} />
        </TouchableOpacity>
    )
}

export default CustomDropDown

const styles = StyleSheet.create({
    inputBox: {
        width: '90%',
        height: verticalScale(45),
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        marginTop: moderateVerticalScale(20),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        // paddingLeft: 10,
        // backgroundColor:'tomato'
        color: TEXT_COLOR
    },
    title: {
        alignSelf: 'flex-start',
        color: TEXT_COLOR,
        backgroundColor: BG_COLOR,
        borderRadius: 3,
        marginLeft: moderateScale(20),
        top: -moderateVerticalScale(8),
        position: 'absolute',
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10)
    },
    icon: {
        width: scale(20),
        height: scale(20)
    }
});
