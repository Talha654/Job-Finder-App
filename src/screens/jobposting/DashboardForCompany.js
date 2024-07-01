import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR } from '../../utils/Colors'
import { verticalScale } from 'react-native-size-matters'
import MyJob from './tabs/MyJob';
import SearchCandidate from './tabs/SearchCandidate';
import AddJob from './tabs/AddJob';
import Chats from './tabs/Chats';
import Profile1 from './tabs/Profile1';
import { useNavigation } from '@react-navigation/native';

const DashboardForCompany = () => {

    const [selectedTab, setSelectedTab] = useState(0);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            {
                selectedTab == 0 ? <MyJob />
                    : selectedTab == 1 ? <SearchCandidate />
                        : selectedTab == 2 ? <Chats />
                            : <Profile1
                                onJobsClick={() => {
                                    setSelectedTab(0)
                                }}
                            />
            }
            <View style={styles.bottomView}>
                <TouchableOpacity style={[styles.bottomTab, { borderTopWidth: selectedTab == 0 ? 2 : 0, borderTopColor: 'red' }]}
                    onPress={() => {
                        setSelectedTab(0);
                    }}
                >
                    <Image
                        source={require('../../images/home.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 0 ? 'red' : 'grey' }]}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.bottomTab, { borderTopWidth: selectedTab == 1 ? 2 : 0, borderTopColor: 'red' }]}
                    onPress={() => {
                        setSelectedTab(1);
                    }}
                >
                    <Image
                        source={require('../../images/userSearch.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 1 ? 'red' : 'grey' }]}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={styles.bottomTab}
                    onPress={() => {
                        navigation.navigate('AddJob')
                    }}
                >
                    <Image
                        source={require('../../images/add.png')}
                        style={styles.tabIcon}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.bottomTab, { borderTopWidth: selectedTab == 2 ? 2 : 0, borderTopColor: 'red' }]}
                    onPress={() => {
                        setSelectedTab(2);
                    }}
                >
                    <Image
                        source={require('../../images/chatFill.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 2 ? 'red' : 'grey' }]}
                    />
                </TouchableOpacity>

                <TouchableOpacity style={[styles.bottomTab, { borderTopWidth: selectedTab == 3 ? 2 : 0, borderTopColor: 'red' }]}
                    onPress={() => {
                        setSelectedTab(3);
                    }}
                >
                    <Image
                        source={require('../../images/userfill.png')}
                        style={[styles.tabIcon, { tintColor: selectedTab == 3 ? 'red' : 'grey' }]}
                    />
                </TouchableOpacity>
            </View>
        </View>
    )
};

export default DashboardForCompany

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    bottomView: {
        width: '100%',
        height: verticalScale(70),
        backgroundColor: '#e8e2e2',
        shadowColor: 'rgba(0,0,0,.5)',
        shadowOpacity: 1,
        shadowOffset: { x: 0, y: 1 },
        position: 'absolute',
        bottom: 0,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    bottomTab: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    tabIcon: {
        width: 30,
        height: 30
    }
})