import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { BG_COLOR, TEXT_COLOR } from '../utils/Colors'

const CustomTextInput = ({ title, placeholder, value, onChangeText, bad, secure, keyboardType }) => {
    return (
        <View style={[styles.inputBox, { borderColor: bad ? 'red' : '#9e9e9e' }]}>
            <Text style={[styles.title, { color: bad ? 'red' : TEXT_COLOR }]}>{title}</Text>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor={'#9e9e9e'}
                secureTextEntry={secure}
                keyboardType={keyboardType ? keyboardType : 'default'}
                value={value}
                onChangeText={(txt) => onChangeText(txt)}
                style={styles.input}
            />
        </View>
    )
}

export default CustomTextInput

const styles = StyleSheet.create({
    inputBox: {
        width: '90%',
        height: verticalScale(45),
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        marginTop: moderateVerticalScale(20),
        paddingLeft: moderateScale(10),
        paddingRight: moderateScale(10)
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
    }
})