import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../utils/Colors'
import { moderateScale } from 'react-native-size-matters'
import CustomSolidBtn from './CustomSolidBtn'

const NoLoginComponent = ({ heading, desc }) => {
    return (
        <View style={styles.container}>
            <Text style={styles.headingTxt}>{heading ? heading : ''}</Text>
            <Text style={styles.descTxt}>{desc ? desc : ''}</Text>

            <CustomSolidBtn title={'Login'} onClick={() => { }} />

            <View style={styles.signUpView}>
                <Text style={styles.text1}>{"Don't have an account?"}</Text>
                <Text style={styles.text2}>{"Create Account"}</Text>
            </View>
        </View>
    )
}

export default NoLoginComponent

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    headingTxt: {
        color: TEXT_COLOR,
        fontSize: moderateScale(25),
        alignSelf: 'center',
        width: '90%',
        marginTop: moderateScale(100),
        fontWeight: '700',
        textAlign: 'center'
    },
    descTxt: {
        width: '80%',
        alignSelf: 'center',
        fontSize: moderateScale(15),
        textAlign: 'center',
        marginTop: moderateScale(10),
        color: TEXT_COLOR
    },
    signUpView: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        marginTop: moderateScale(50),
        justifyContent: 'center'
    },
    text1: {
        fontWeight: '500',
        fontSize: moderateScale(16),
        color: TEXT_COLOR
    },
    text2: {
        fontWeight: '700',
        fontSize: moderateScale(16),
        color: TEXT_COLOR,
        marginLeft: moderateScale(10)
    }
})