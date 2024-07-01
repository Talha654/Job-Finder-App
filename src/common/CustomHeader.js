import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { moderateScale, verticalScale } from 'react-native-size-matters';
import { TEXT_COLOR } from '../utils/Colors';

const CustomHeader = ({ headerTitle, onBackPress }) => {
    return (
        <View style={styles.header}>
            <TouchableOpacity
                onPress={() => {
                    onBackPress();
                }}
            >
                <Image source={require('../images/back.png')} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>{headerTitle}</Text>
        </View>
    )
}

export default CustomHeader

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: verticalScale(45),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: moderateScale(20)
    },
    headerTitle: {
        color: TEXT_COLOR,
        fontSize: moderateScale(18),
        marginLeft: moderateScale(18),
        fontWeight: '600'
    },
})