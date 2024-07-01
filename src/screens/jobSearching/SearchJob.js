import { FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, moderateVerticalScale, scale, verticalScale } from 'react-native-size-matters'
import firestore from '@react-native-firebase/firestore'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const SearchJob = () => {

    const navigation = useNavigation();

    const [search, setSearch] = useState('');
    const [jobs, setJobs] = useState([]);
    const [savedJobs, setSavedJobs] = useState([]);
    const isFocused = useIsFocused();

    console.log('Saved Jobs =>>>>>>>>>>>>>>', savedJobs);


    useEffect(() => {
        getSavedJobs();
    }, [isFocused]);

    const searchJob = (txt) => {
        firestore().collection('jobs').where('jobTitle', '==', txt).get().then(res => {
            console.log(res.docs);
            let temp = [];

            res.docs.forEach(item => {
                temp.push({ ...item.data(), id: item.id });
            });
            setJobs(temp);
        })
    };


    const saveJob = async (data) => {
        const id = await AsyncStorage.getItem('USER_ID');
        firestore().collection('saved_jobs').add({
            ...data,
            userId: id
        }).then(res => {
            // console.log('Job saved successfully');
            getSavedJobs();
        })
    };

    const getSavedJobs = async () => {
        const id = await AsyncStorage.getItem('USER_ID');
        firestore().collection('saved_jobs').where('userId', '==', id).get().then(snapshot => {
            // console.log('Saved Job =>>>>>>>>>>>>>', snapshot.docs);
            if (snapshot.docs.length > 0) {
                let temp = [];
                snapshot.docs.forEach(item => {
                    temp.push({ ...item.data(), savedId: item.id });
                });

                setSavedJobs(temp);

            } else {
                setSavedJobs([]);
            }


        });
    };

    const removeSavedJob = async (id) => {
        console.log('remove job =???????????????????????')
        const docId = await getSavedJobId(id);

        firestore().collection('saved_jobs').doc(docId).delete().then(res => {
            getSavedJobs();
        })
    };

    const checkSavedJobs = (id) => {
        let temp = savedJobs;
        let isSaved = false;

        temp.map(item => {
            if (item.id == id) {
                isSaved = true
            }
        });

        return isSaved;
    };

    const getSavedJobId = async (idd) => {

        // console.log('get saved job ID =???????????????')
        const id = await AsyncStorage.getItem('USER_ID');
        let JobId = '';
        const snapshot = await firestore().collection('saved_jobs').where('userId', '==', id).get();

        snapshot.docs.forEach(item => {
            if (idd == item.data().id) {
                JobId = item.id;
            }
        })

        console.log('jobid=>>>>>>>>>>>>>>>>>>', JobId)
        return JobId;
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchBox}>
                <Image source={require('../../images/search.png')} style={styles.icon} />
                <TextInput
                    placeholderTextColor={'#9e9e9e'}
                    placeholder='Search Job here...'
                    value={search}
                    onChangeText={(txt) => {
                        setSearch(txt);
                        searchJob(txt);
                    }}
                    style={styles.input}
                />
                {search != '' &&
                    < TouchableOpacity onPress={() => {
                        setSearch('');
                        searchJob('');
                    }}>
                        <Image source={require('../../images/close.png')} style={styles.icon} />
                    </TouchableOpacity>
                }
            </View>
            <FlatList
                data={jobs}
                renderItem={({ item, index }) => {
                    return (
                        <TouchableOpacity style={styles.jobItem}
                            onPress={() => { navigation.navigate('JobDetails', { data: item }) }}
                        >
                            <View style={{ flexDirection: 'row', alignItems: 'center', width: '100%' }}>
                                <Text style={styles.jobTitle}>{item.jobTitle}</Text>
                                <TouchableOpacity
                                    onPress={() => {
                                        if (checkSavedJobs(item.id)) {
                                            removeSavedJob(item.id);
                                        } else {
                                            saveJob(item)
                                        }
                                    }}
                                >
                                    <Image source={checkSavedJobs(item.id) ? require('../../images/starfill.png') : require('../../images/star.png')} style={{ width: 30, height: 30 }} />
                                </TouchableOpacity>
                            </View>
                            <Text style={styles.subTitle}>{'Job Category: ' + item.category}</Text>
                            <Text style={styles.subTitle}>{'Posted By: ' + item.posterName}</Text>
                        </TouchableOpacity>
                    )
                }}
            />
        </View >
    )
}

export default SearchJob

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
    }
});