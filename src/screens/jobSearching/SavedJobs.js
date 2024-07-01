import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import firestore from '@react-native-firebase/firestore'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SavedJobs = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [saveJobs, setSaveJobs] = useState([]);

    useEffect(() => {
        getJobs();
    }, []);

    const getJobs = async () => {

        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('saved_jobs').where('userId', '==', id).get().then(res => {
            console.log(res.docs);
            let temp = [];

            res.docs.forEach(item => {
                temp.push({ ...item.data(), savedId: item.id });
            })
            setSaveJobs(temp);

        })
    };

    const removeSavedJob = (id) => {
        firestore().collection('saved_jobs').doc(id).delete().then(res => {
            getJobs();
        })
    };

    return (
        <View style={styles.container}>
            {
                saveJobs.length > 0 ?
                    < FlatList
                        data={saveJobs}
                        renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.jobItem}
                                    onPress={() => { navigation.navigate('JobDetails', { data: item }) }}
                                >
                                    <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                        <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                                        <TouchableOpacity
                                            onPress={() => {
                                                removeSavedJob(item.savedId);
                                            }}
                                        >
                                            <Image source={require('../../images/starfill.png')} style={{ width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.subTitle}>{'Job Category: ' + item.category}</Text>
                                    <Text style={styles.subTitle}>{'Job Category: ' + item.posterName}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    /> : (
                        <View style={styles.emptyView}>
                            <Text style={styles.emptyText}>No Saved Jobs</Text>
                        </View>
                    )
            }
        </View >
    )
}

export default SavedJobs

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    searchBox: {
        width: '90%',
        height: verticalScale(40),
        borderWidth: .4,
        alignSelf: 'center',
        borderRadius: moderateScale(30),
        marginTop: moderateVerticalScale(20),
        flexDirection: 'row',
        alignItems: 'center'
    },
    icon: {
        width: scale(18),
        height: scale(18),
        marginLeft: moderateScale(10)
    },
    input: {
        width: '75%',
        height: '100%',
        marginLeft: moderateScale(10),
        color: TEXT_COLOR,
        fontSize: moderateScale(16)
    },
    jobItem: {
        width: '90%',
        backgroundColor: '#f2f2f2',
        alignSelf: 'center',
        marginTop: moderateScale(20),
        padding: moderateScale(15),
        borderRadius: moderateScale(10)
    },
    jobTitle: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        color: '#000',
        width: '90%',
    },
    subTitle: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: '#2e2e2e',
        marginTop: moderateScale(3)
    },
    emptyView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    emptyText: {
        color: '#9e9e9e',
        fontSize: 30,
        fontWeight: '500'
    }
});