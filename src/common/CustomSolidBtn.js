import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../utils/Colors'
import { moderateScale, moderateVerticalScale } from 'react-native-size-matters'

const CustomSolidBtn = ({ title, onClick, marginBottom }) => {
    return (
        <TouchableOpacity style={[styles.btn, { marginBottom: marginBottom }]}
            onPress={() => {
                onClick()
            }}
        >
            <Text style={styles.btnTxt}>{title}</Text>
        </TouchableOpacity>
    )
}

export default CustomSolidBtn

const styles = StyleSheet.create({
    btn: {
        backgroundColor: TEXT_COLOR,
        width: '90%',
        height: moderateVerticalScale(45),
        alignSelf: 'center',
        marginTop: moderateVerticalScale(20),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnTxt: {
        color: BG_COLOR,
        fontWeight: '500',
        fontSize: moderateScale(16)
    }
})