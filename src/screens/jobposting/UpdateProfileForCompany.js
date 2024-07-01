import { Image, ScrollView, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, LOGO_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import CustomTextInput from '../../common/CustomTextInput'
import CustomSolidBtn from '../../common/CustomSolidBtn'
import CustomBorderBtn from '../../common/CustomBorderBtn'
import { useNavigation, useRoute } from '@react-navigation/native'
import Loader from '../../common/Loader';
import firestore from '@react-native-firebase/firestore'
import CustomHeader from '../../common/CustomHeader'
import AsyncStorage from '@react-native-async-storage/async-storage'

const UpdateProfileForCompany = () => {

    const navigation = useNavigation();

    const [name, setName] = useState('');
    const [badName, setBadName] = useState('');

    const [email, setEmail] = useState('');
    const [badEmail, setBadEmail] = useState('');

    const [contact, setContact] = useState('');
    const [badContact, setBadContact] = useState('');

    const [companyName, setCompanyName] = useState('');
    const [badCompanyName, setBadCompanyName] = useState('');

    const [address, setAddress] = useState('');
    const [badAddress, setBadAddress] = useState('');

    const [loading, setLoading] = useState(false);

    const validate = () => {
        let nameRegex = /^[a-zA-Z]+$/;
        let validEmail = true;
        let validName = true;
        let validContact = true;
        let validCompanyName = true;
        let validAddress = true;

        if (name == '') {
            setBadName('Please Enter Name');
            validName = false;
        } else if (name != '' && name.length < 3) {
            setBadName('Please Enter Valid Name');
            validName = false;
        } else if (name != '' && name.length >= 3 && !name.toString().match(nameRegex)) {
            setBadName('Please Enter Valid Name');
            validName = false;
        } else if (name != '' && name.length >= 3 && name.toString().match(nameRegex)) {
            setBadName('');
            validName = true;
        }

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

        let contactRegex = /^\d+$/;

        if (contact == '') {
            validContact = false;
            setBadContact('Please Enter Contact');
        } else if (contact != '' && contact.length < 11) {
            validContact = false;
            setBadContact('Please Enter Valid Contact');
        } else if (contact != '' && contact.length == 11 && !contact.match(contactRegex)) {
            validContact = false;
            setBadContact('Please Enter Valid Contact');
        } else if (contact != '' && contact.length == 11 && contact.match(contactRegex)) {
            validContact = true;
            setBadContact('');
        }

        if (companyName == '') {
            validCompanyName = false;
            setBadCompanyName('Please Enter Compant Name');
        } else if (companyName != '') {
            validCompanyName = true;
            setBadCompanyName('')
        }

        if (address == '') {
            validAddress = false;
            setBadAddress('Please Enter Address');
        } else if (companyName != '') {
            validAddress = true;
            setBadAddress('')
        }

        return validName && validEmail && validContact && validCompanyName && validAddress;
    };

    const updateUser = async () => {

        const id = await AsyncStorage.getItem('USER_ID');

        setLoading(true)

        firestore().collection('job_posters').doc(id).update({
            name: name,
            email: email,
            contact: contact,
            companyName: companyName,
            address: address
        }).then(async () => {
            await AsyncStorage.setItem('NAME', name);
            setLoading(false);
            navigation.goBack();
        }).catch(err => {
            setLoading(false);
            console.log(err);
        })
    };

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        const mEmail = await AsyncStorage.getItem('EMAIL');
        firestore()
            .collection('job_posters')
            .where('email', '==', mEmail)
            .get()
            .then(res => {
                res.docs.forEach(item => {
                    setName(item.data().name)
                    setEmail(item.data().email)
                    setContact(item.data().contact)
                    setCompanyName(item.data().companyName)
                    setAddress(item.data().address)
                })
            })
    };

    return (
        <View style={styles.container}>

            <CustomHeader
                headerTitle={'Edit Profile'}
                onBackPress={() => {
                    navigation.goBack()
                }}
            />


            <CustomTextInput
                title={'Name'}
                placeholder={'xyz'}
                value={name}
                onChangeText={setName}
                bad={badName != '' ? true : false}
            />
            {badName != '' && <Text style={styles.errorMsg}>{badName}</Text>}

            <CustomTextInput
                title={'Email'}
                placeholder={'xyz@gmail.com'}
                value={email}
                onChangeText={setEmail}
                bad={badEmail != '' ? true : false}
            />
            {badEmail != '' && <Text style={styles.errorMsg}>{badEmail}</Text>}

            <CustomTextInput
                title={'Contact'}
                placeholder={'9230344***'}
                value={contact}
                onChangeText={setContact}
                bad={badContact != '' ? true : false}
            />
            {badContact != '' && <Text style={styles.errorMsg}>{badContact}</Text>}

            <CustomTextInput
                title={'Company Name'}
                placeholder={'ex. facebook'}
                value={companyName}
                onChangeText={setCompanyName}
                bad={badCompanyName != '' ? true : false}
            />
            {badCompanyName != '' && <Text style={styles.errorMsg}>{badCompanyName}</Text>}

            <CustomTextInput
                title={'Address'}
                placeholder={'ex. Lahore'}
                value={address}
                onChangeText={setAddress}
                bad={badAddress != '' ? true : false}
            />
            {badAddress != '' && <Text style={styles.errorMsg}>{badAddress}</Text>}

            <CustomSolidBtn
                title={'Update'}
                onClick={() => {
                    if (validate()) {
                        updateUser();
                    }

                }}
            />

            <Loader visible={loading} />


        </View>
    )
}

export default UpdateProfileForCompany

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
    },
    logo: {
        width: scale(80),
        height: scale(80),
        alignSelf: 'center',
        marginTop: moderateVerticalScale(30)
    },
    title: {
        fontSize: moderateScale(25),
        color: LOGO_COLOR,
        alignSelf: "center",
        fontWeight: '600',
        marginTop: moderateVerticalScale(30)
    },
    errorMsg: {
        marginLeft: moderateScale(25),
        marginTop: moderateVerticalScale(5),
        color: 'red'
    }

})