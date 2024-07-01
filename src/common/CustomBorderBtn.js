import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../utils/Colors'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'

const CustomBorderBtn = ({ title, onClick }) => {
    return (
        <TouchableOpacity style={styles.btn} onPress={() => {
            onClick();
        }}>
            <Text style={styles.btnTxt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomBorderBtn

const styles = StyleSheet.create({
    btn: {
        borderColor: TEXT_COLOR,
        width: '90%',
        height: moderateVerticalScale(45),
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: moderateVerticalScale(20)
    },
    btnTxt: {
        color: TEXT_COLOR,
        fontWeight: '500',
        fontSize: moderateScale(16),
    }
})

