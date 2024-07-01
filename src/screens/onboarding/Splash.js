import { StyleSheet, Text, View, Image } from 'react-native'
import React from 'react'
import { BG_COLOR, LOGO_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Splash = ({ navigation }) => {

    setTimeout(() => {
        getData();
    }, 2000);


    const getData = async () => {
        let type = await AsyncStorage.getItem('USER_TYPE');
        // let type = null;
        if (type != null) {
            if (type == 'company') {
                navigation.navigate('DashboardForCompany');
            }
            else {
                navigation.navigate('JobSearchingNavigator');
            }
        } else {
            navigation.navigate('SelectUser')
        }
    };

    return (
        <View style={styles.container}>
            <Image source={require('../../images/logo.png')} style={styles.logo} />
            <Text style={styles.name}>FindMyJob</Text>
            <Text style={styles.slogan}>Post & Find Job in One Place</Text>
        </View>
    )
}

export default Splash

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        justifyContent: 'center',
        alignItems: 'center'
    },
    logo: {
        width: scale(100),
        height: verticalScale(100)
    },
    name: {
        fontSize: moderateScale(35),
        color: LOGO_COLOR,
        fontWeight: '600',
        marginTop: moderateVerticalScale(10)
    },
    slogan: {
        fontSize: moderateScale(16),
        color: TEXT_COLOR,
        position: 'absolute',
        bottom: moderateVerticalScale(50),
        fontWeight: '600',
        fontStyle: 'italic'
    }
})