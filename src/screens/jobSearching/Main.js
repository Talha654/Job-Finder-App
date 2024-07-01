import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import DrawerScreen from './DrawerScreen';
import { BG_COLOR, LOGO_COLOR, TEXT_COLOR } from '../../utils/Colors';
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters';
import Logout from './Logout';
import Profile from './tabs/Profile';
import Inbox from './tabs/Inbox';
import Applies from './tabs/Applies';
import Home from './tabs/Home';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Drawer = createDrawerNavigator();

const Main = () => {

    const [showDrawer, setShowDrawer] = useState(false);
    const [drawerSelectedTab, setDrawerSelectedTab] = useState(0);
    const [currentTab, setCurrentTab] = useState(0);

    // console.log('Cueent tab=>>>>>>>>>>>>>>>>>>>>', currentTab);
    const isFocused = useIsFocused();
    const navigation = useNavigation();

    const [isLogin, setISLogin] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    useEffect(() => {
        getData();
    }, [isFocused]);

    const getData = async () => {
        const id = await AsyncStorage.getItem('USER_ID');
        const type = await AsyncStorage.getItem('USER_TYPE');
        const mName = await AsyncStorage.getItem('NAME');
        const mEmail = await AsyncStorage.getItem('EMAIL');

        if (id != null && type != null) {
            if (type == 'user') {
                setISLogin(true);
                setEmail(mEmail);
                setName(mName);
            }
        }
    };


    return (
        <View style={styles.container}>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: verticalScale(10), paddingLeft: moderateScale(5) }}>
                {!showDrawer &&
                    < TouchableOpacity onPress={() => {
                        setShowDrawer(true);
                    }}>
                        <Image source={require('../../images/drawer.png')}
                            style={{ width: 40, height: 40, tintColor: TEXT_COLOR }} />
                    </TouchableOpacity>
                }
                <Text style={[styles.heading, { flex: 1, justifyContent: showDrawer ? 'center' : null }]}>FindMyJob</Text>
            </View>

            {
                drawerSelectedTab == 3 ? <DrawerScreen /> :
                    drawerSelectedTab == 4 ? <Logout /> : null
            }


            {/* Current Bottom Tabs */}

            {
                currentTab == 0 ? <Home />
                    : currentTab == 1 ? <Applies />
                        : currentTab == 2 ? <Inbox />
                            : <Profile />
            }

            {/* Bottom Tabs */}

            <View style={styles.bottomNavView}>
                <TouchableOpacity style={styles.tab}
                    onPress={() => {
                        setCurrentTab(0);
                        setDrawerSelectedTab(0);
                    }}
                >
                    <Image source={currentTab == 0 ? require('../../images/home.png') : require('../../images/homeOutline.png')} style={styles.tabIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tab}
                    onPress={() => {
                        setCurrentTab(1);
                        setDrawerSelectedTab(0);
                    }}
                >
                    <Image source={currentTab == 1 ? require('../../images/sendFill.png') : require('../../images/send.png')} style={styles.tabIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tab}
                    onPress={() => {
                        setCurrentTab(2);
                        setDrawerSelectedTab(0);
                    }}
                >
                    <Image source={currentTab == 2 ? require('../../images/chatFill.png') : require('../../images/chat.png')} style={styles.tabIcon} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.tab}
                    onPress={() => {
                        setCurrentTab(3);
                        setDrawerSelectedTab(0);
                    }}
                >
                    <Image source={currentTab == 3 ? require('../../images/userfill.png') : require('../../images/user.png')} style={styles.tabIcon} />
                </TouchableOpacity>

            </View>

            {/* Custom Drawer */}

            {
                showDrawer &&
                <View style={styles.drawerView}>

                    <TouchableOpacity onPress={() => {
                        setShowDrawer(false);
                    }}>
                        <Image source={require('../../images/close.png')}
                            style={{ width: 40, height: 40 }} />
                    </TouchableOpacity>

                    <View style={styles.topView}>
                        <Image source={require('../../images/profile.png')} style={styles.profileIcon} />
                        <View>
                            <Text style={styles.headingText}>{isLogin ? name : 'Build Your Profile'}</Text>
                            <Text style={[styles.sub_Heading, { width: isLogin ? '100%' : '60%' }]}>{isLogin ? email : 'Job Opportunities waiting for you at FindMyJob'}</Text>
                        </View>
                    </View>

                    {
                        !isLogin && (
                            <View style={styles.btnsView}>
                                <TouchableOpacity style={styles.loginBtn}>
                                    <Text style={[styles.btnText, { color: BG_COLOR }]}>Login</Text>
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.signupBtn}>
                                    <Text style={styles.btnText}>Register</Text>
                                </TouchableOpacity>
                            </View>
                        )
                    }

                    <View style={styles.seperator}></View>

                    <FlatList
                        contentContainerStyle={{ marginTop: moderateScale(50) }}
                        data={[
                            { title: 'Saved Jobs', icon: require('../../images/star.png') },
                            { title: 'Rate Us', icon: require('../../images/contact.png') },
                            { title: 'Theme', icon: require('../../images/theme.png') }
                        ]}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.menuItems}
                                    onPress={() => {
                                        if (index == 0) {
                                            setShowDrawer(false);
                                            navigation.navigate('SavedJobs')
                                        }
                                    }}
                                >
                                    <View style={styles.menuLeftView}>
                                        <Image source={item.icon} style={styles.menuItemIcon} />
                                        <Text style={styles.menuItemTitle}>{item.title}</Text>
                                    </View>
                                    <Image source={require('../../images/next.png')} style={{ width: scale(20), height: scale(20) }} />
                                </TouchableOpacity>
                            )
                        }}
                    />

                    {/* <View style={{ flex: 1, alignItems: 'center' }}>
                        <TouchableOpacity style={styles.drawerScreen}
                            onPress={() => {
                                setDrawerSelectedTab(3);
                                setCurrentTab(4);
                                setShowDrawer(false)
                            }}>
                            <Text style={{ color: TEXT_COLOR }}>Drawer Screen</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.drawerScreen}
                            onPress={() => {
                                setDrawerSelectedTab(4);
                                setCurrentTab(4);
                                setShowDrawer(false);
                            }}>
                            <Text style={{ color: TEXT_COLOR }}>Log Out Screen</Text>
                        </TouchableOpacity>

                    </View> */}

                </View>
            }


        </View >
    )
}

export default Main

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    drawerView: {
        height: '100%',
        width: '70%',
        borderWidth: moderateScale(.5),
        borderColor: 'grey',
        borderTopRightRadius: 20,
        borderBottomEndRadius: 20,
        position: 'absolute',
        top: 0,
        left: 0,
        backgroundColor: '#E1E0E2'
    },
    drawerScreen: {
        marginTop: 20,
        borderWidth: .5,
        borderColor: TEXT_COLOR,
        padding: 15,
        borderRadius: 10
    },
    heading: {
        fontSize: moderateScale(25),
        // marginLeft: moderateScale(60),
        // marginTop: moderateVerticalScale(5),
        fontWeight: '600',
        color: LOGO_COLOR,
        textAlign: 'center',
    },
    bottomNavView: {
        width: '100%',
        height: verticalScale(80),
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        borderTopWidth: .3,
        borderTopColor: '#9e9e9e',
        zIndex: 1,
        backgroundColor: 'grey'
    },
    tab: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabIcon: {
        width: scale(25),
        height: scale(25)
    },
    profileIcon: {
        width: scale(50),
        height: scale(50),
        marginTop: moderateVerticalScale(10),
        marginLeft: moderateScale(10)
    },
    topView: {
        flexDirection: 'row'
    },
    headingText: {
        fontSize: 18,
        color: TEXT_COLOR,
        width: '70%',
        fontWeight: '700',
        marginLeft: moderateScale(10),
        marginTop: moderateScale(5)
    },
    sub_Heading: {
        fontSize: moderateScale(10),
        color: TEXT_COLOR,
        width: '60%',
        marginLeft: moderateScale(10),
        marginTop: moderateScale(4)
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
    seperator: {
        width: '90%',
        height: verticalScale(.5),
        BG_COLOR: '#9e9e9e',
        alignSelf: 'center',
        marginTop: moderateScale(20),
        backgroundColor: TEXT_COLOR,
        opacity: .5
    },
    menuItems: {
        width: '90%',
        height: verticalScale(40),
        alignSelf: 'center',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    menuLeftView: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    menuItemIcon: {
        width: scale(25),
        height: scale(25)
    },
    menuItemTitle: {
        fontWeight: '600',
        color: TEXT_COLOR,
        fontSize: moderateScale(20),
        marginLeft: moderateScale(10)
    }
});