import { Image, StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR, LOGO_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import CustomTextInput from '../../common/CustomTextInput'
import CustomSolidBtn from '../../common/CustomSolidBtn'
import CustomBorderBtn from '../../common/CustomBorderBtn'
import { useNavigation } from '@react-navigation/native'
import Loader from '../../common/Loader'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
const LoginForCompany = () => {

    const navigation = useNavigation();

    const [email, setEmail] = useState('');
    const [badEmail, setBadEmail] = useState('');

    const [password, setPassword] = useState('');
    const [badPassword, setBadPassword] = useState('');

    const [loading, setLoading] = useState(false);


    const validate = () => {

        let validEmail = true;
        let validPassword = true;


        let emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (email == '') {
            setBadEmail('Please Enter Email');
            validEmail = false;
        } else if (email != '' && !email.toString().match(emailRegex)) {
            setBadEmail('Please Enter Valid Email');
            validEmail = false;
        } else if (email != '' && email.toString().match(emailRegex)) {
            setBadEmail('');
            validEmail = true;
        }

        if (password == '') {
            validPassword = false;
            setBadPassword('Please Enter Password');
        } else if (password != '' && password.length < 6) {
            validPassword = false;
            setBadPassword('Please Enter Min 6 Char Password')
        } else if (password != '' && password.length >= 6) {
            validPassword = true;
            setBadPassword('');
        }

        return validEmail && validPassword;

    };

    const loginUser = () => {

        setLoading(true);

        firestore()
            .collection('job_posters')
            .where("email", '==', email)
            .get()
            .then(res => {
                console.log(res.docs)
                setLoading(false);
                if (res.docs.length > 0) {
                    res.docs.forEach(item => {
                        if (item.data().password == password) {
                            setBadEmail('');
                            setBadPassword('');
                            goToNextScreen(item.id, item.data().email, item.data().name)
                        } else {
                            setBadPassword('Wrong Password')
                        }
                    })
                } else {
                    setBadEmail('No User exist with this Email')
                }

            }).catch(err => {
                setLoading(false);
                console.log(err)
            })
    };

    const goToNextScreen = async (id, email, name) => {
        // console.log(id, '=>>>>>', email, '=>>>>', name)
        await AsyncStorage.setItem('USER_ID', id);
        await AsyncStorage.setItem('EMAIL', email);
        await AsyncStorage.setItem('NAME', name);
        await AsyncStorage.setItem('USER_TYPE', 'company')
        navigation.navigate('DashboardForCompany')

    };

    return (
        <View style={styles.container}>
            <Image source={require('../../images/logo.png')} style={styles.logo} />
            <Text style={styles.title}>Login</Text>
            <CustomTextInput
                title={'Email'}
                placeholder={'xyz@gmail.com'}
                value={email}
                onChangeText={setEmail}
                bad={badEmail != '' ? true : false}
            />
            {badEmail != '' && <Text style={styles.errorMsg}>{badEmail}</Text>}
            <CustomTextInput
                title={'Password'}
                placeholder={'*******'}
                value={password}
                onChangeText={setPassword}
                bad={badPassword != '' ? true : false}
            />
            {badPassword != '' && <Text style={styles.errorMsg}>{badPassword}</Text>}
            <Text style={styles.forgotPassword}>Forgot Password?</Text>

            <CustomSolidBtn
                title={'Login'}
                onClick={() => {
                    if (validate()) {
                        loginUser();
                    }
                }} />
            <CustomBorderBtn
                title={'Create Account'}
                onClick={() => {
                    navigation.navigate('SignupForCompany')
                }} />
            <Loader visible={loading} />
        </View>
    )
}

export default LoginForCompany

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    logo: {
        width: scale(80),
        height: scale(80),
        alignSelf: 'center',
        marginTop: moderateVerticalScale(40)
    },
    title: {
        fontSize: moderateScale(25),
        color: LOGO_COLOR,
        alignSelf: "center",
        fontWeight: '600',
        marginTop: moderateVerticalScale(40)
    },
    forgotPassword: {
        color: TEXT_COLOR,
        alignSelf: 'flex-end',
        marginRight: moderateScale(20),
        marginTop: moderateVerticalScale(10),
        fontWeight: '500',
        fontSize: moderateScale(16)
    },
    errorMsg: {
        marginLeft: moderateScale(25),
        marginTop: moderateVerticalScale(5),
        color: 'red'
    }
})