import { Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import CustomSolidBtn from '../../../common/CustomSolidBtn'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Home = () => {
    const navigation = useNavigation();
    const isFocused = useIsFocused();

    const [isLogin, setISLogin] = useState(false);

    useEffect(() => {
        getData();
    }, [isFocused]);

    const getData = async () => {
        const id = await AsyncStorage.getItem('USER_ID');
        const type = await AsyncStorage.getItem('USER_TYPE');

        if (id != null && type != null) {
            if (type == 'user') {
                setISLogin(true);
            }
        }
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity activeOpacity={1} style={styles.searchBox} onPress={() => { navigation.navigate('SearchJob') }} >
                <Image source={require('../../../images/search.png')} style={styles.icon} />
                <Text style={styles.placeHolder}>Search Job here....</Text>
            </TouchableOpacity>

            {
                !isLogin &&

                <View>
                    <Text style={styles.heading}>{'You are one step away from getting a good Job'}</Text>

                    <View style={styles.notes}>
                        <Image source={require('../../../images/star.png')} style={styles.icon} />
                        <Text style={styles.note}>{'Get job after creating Account'}</Text>
                    </View>

                    <View style={styles.notes}>
                        <Image source={require('../../../images/star.png')} style={styles.icon} />
                        <Text style={styles.note}>{'Chat with recruiter directly'}</Text>
                    </View>

                    <View style={styles.btnsView}>
                        <TouchableOpacity style={styles.loginBtn}
                            onPress={() => {
                                navigation.navigate('LoginForUser')
                            }}
                        >
                            <Text style={[styles.btnText, { color: BG_COLOR }]}>Login</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.signupBtn}
                            onPress={() => {
                                navigation.navigate('SignupForUser')
                            }}
                        >
                            <Text style={styles.btnText}>Register</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            }

            <View style={styles.jobSearchCard}>
                <Image source={require('../../../images/search.png')} style={styles.searchIcon} />

                <TextInput
                    style={styles.input}
                    placeholder='Enter Job Title'
                    placeholderTextColor={TEXT_COLOR}
                />

                <TextInput
                    style={styles.input}
                    placeholder='Enter Job Title'
                    placeholderTextColor={TEXT_COLOR}
                />

                <CustomSolidBtn title={'Search Jobs'}
                    onClick={() => {

                    }}
                />
            </View>

        </View>
    )
}

export default Home

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    searchBox: {
        width: '90%',
        height: verticalScale(45),
        borderWidth: .5,
        alignSelf: 'center',
        marginTop: moderateScale(20),
        borderRadius: moderateScale(30),
        borderColor: '#9e9e9e',
        flexDirection: 'row',
        paddingLeft: moderateScale(15),
        alignItems: 'center'
    },
    icon: {
        width: scale(18),
        height: scale(18),
        tintColor: 'grey'
    },
    placeHolder: {
        marginLeft: moderateScale(10),
        color: 'grey',

    },
    heading: {
        color: TEXT_COLOR,
        fontWeight: '700',
        fontSize: moderateScale(22),
        alignSelf: 'center',
        width: '90%',
        marginTop: moderateScale(20)
    },
    notes: {
        width: '90%',
        flexDirection: 'row',
        alignSelf: 'center',
        marginTop: moderateScale(4)
    },
    note: {
        marginLeft: moderateScale(10),
        color: TEXT_COLOR
    },
    btnsView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        marginTop: moderateVerticalScale(20)
    },
    loginBtn: {
        width: '40%',
        height: verticalScale(35),
        backgroundColor: TEXT_COLOR,
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center'
    },
    signupBtn: {
        width: '40%',
        height: verticalScale(35),
        borderColor: TEXT_COLOR,
        borderWidth: 1,
        borderRadius: moderateScale(30),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnText: {
        fontWeight: '500',
        fontSize: moderateScale(15),
        color: TEXT_COLOR,
    },
    jobSearchCard: {
        width: "90%",
        alignSelf: 'center',
        backgroundColor: '#f2f2f2',
        marginTop: moderateScale(50),
        borderRadius: moderateScale(10),
        paddingBottom: moderateScale(20)
    },
    searchIcon: {
        width: 40,
        height: 40,
        alignSelf: 'center',
        marginTop: moderateScale(20)
    },
    input: {
        width: '90%',
        height: verticalScale(35),
        borderWidth: 1,
        alignSelf: 'center',
        borderRadius: moderateScale(15),
        marginTop: moderateScale(10),
        paddingLeft: moderateScale(10)
    }
})