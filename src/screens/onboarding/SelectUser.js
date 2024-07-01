import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { BG_COLOR, LOGO_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import { useNavigation } from '@react-navigation/native'

const SelectUser = () => {
    const navigation = useNavigation();
    return (
        <View style={styles.container}>
            <Image source={require('../../images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>What are you looking for?</Text>
            <TouchableOpacity style={styles.wantToHire} onPress={() => {
                navigation.navigate('JobPostingNavigator');
            }}>
                <Text style={styles.btnTxt1}>Want To Hire Candidate</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.wantToJob}
                onPress={() => {
                    navigation.navigate('JobSearchingNavigator');
                }}
            >
                <Text style={styles.btnTxt2}>Want To Get Job</Text>
            </TouchableOpacity>
        </View>
    )
}

export default SelectUser

const styles = StyleSheet.create({
    container: {
        flex: 1,
        bgc: BG_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        color: LOGO_COLOR,
        fontSize: moderateScale(20),
        fontWeight: '600'
    },
    wantToHire: {
        width: '90%',
        height: verticalScale(50),
        backgroundColor: TEXT_COLOR,
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateVerticalScale(20)
    },
    wantToJob: {
        width: '90%',
        height: verticalScale(50),
        borderColor: TEXT_COLOR,
        borderWidth: 1,
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: moderateVerticalScale(20)
    },
    btnTxt1: {
        fontSize: moderateScale(16),
        color: BG_COLOR,
        fontWeight: '500'
    },
    btnTxt2: {
        fontSize: moderateScale(16),
        color: TEXT_COLOR,
        fontWeight: '500'
    },
    logo: {
        width: scale(100),
        height: scale(100),
        marginBottom: verticalScale(50)
    },
})