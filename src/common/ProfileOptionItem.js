import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { TEXT_COLOR } from '../utils/Colors'
import { moderateScale, scale } from 'react-native-size-matters'

const ProfileOptionItem = ({ icon, title, onClick }) => {
    return (
        <TouchableOpacity style={styles.Btn}
            onPress={() => {
                onClick();
            }}
        >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Image source={icon} style={styles.icon} />

                <Text style={styles.title}>{title}</Text>
            </View>
            <Image source={require('../images/next.png')} style={styles.icon} />
        </TouchableOpacity>
    )
}

export default ProfileOptionItem

const styles = StyleSheet.create({
    Btn: {
        width: '90%',
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: moderateScale(20)
    },
    icon: {
        width: scale(20),
        height: scale(20)
    },
    title: {
        color: TEXT_COLOR,
        marginLeft: moderateScale(15),
        fontSize: moderateScale(16)
    }
})