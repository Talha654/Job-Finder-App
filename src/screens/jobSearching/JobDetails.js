import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { useIsFocused, useRoute } from '@react-navigation/native'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'

const JobDetails = () => {

    const route = useRoute();

    const isFocused = useIsFocused();
    const [isLogin, setISLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [isJobSaved, setIsJobSaved] = useState(false);
    const [isJobApplied, setIsJobApplied] = useState(false);
    const [savedJobId, setSavedJobId] = useState('');
    const [AppliedJobId, setAppliedJobId] = useState('');

    // console.log('Route Data =>>>>>>>>>>>>>>>>>>>>>>>', route.params.data);

    useEffect(() => {
        getData();
        getSavedJobs();
        getAppliedJobs();
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

    const saveJob = async () => {
        const id = await AsyncStorage.getItem('USER_ID');
        firestore().collection('saved_jobs').add({
            ...route.params.data,
            userId: id
        }).then(res => {
            // console.log('Job saved successfully');
            getSavedJobs();
        })
    };

    const applyJob = async () => {
        const id = await AsyncStorage.getItem('USER_ID');
        firestore().collection('applied_jobs').add({
            ...route.params.data,
            userId: id
        }).then(res => {
            console.log('Job applied successfully');
            getAppliedJobs();
        })
    };

    const getSavedJobs = async () => {
        const id = await AsyncStorage.getItem('USER_ID');
        firestore().collection('saved_jobs').where('userId', '==', id).get().then(snapshot => {
            // console.log('Saved Job =>>>>>>>>>>>>>', snapshot.docs);
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(item => {
                    if (item.data().id == route.params.data.id) {
                        // console.log("saved Job Id", item.data().id);
                        setIsJobSaved(true);
                        setSavedJobId(item.id);
                    }
                })
            } else {
                setIsJobSaved(false);
                setSavedJobId('');
            }


        });
    };

    const getAppliedJobs = async () => {
        const id = await AsyncStorage.getItem('USER_ID');
        firestore().collection('applied_jobs').where('userId', '==', id).get().then(snapshot => {
            // console.log('Saved Job =>>>>>>>>>>>>>', snapshot.docs);
            if (snapshot.docs.length > 0) {
                snapshot.docs.forEach(item => {
                    if (item.data().id == route.params.data.id) {
                        // console.log("saved Job Id", item.data().id);
                        setIsJobApplied(true);
                        setAppliedJobId(item.id);
                    }
                })
            } else {
                setIsJobApplied(false);
                setAppliedJobId('');
            }


        });
    };

    const removeSavedJob = () => {
        firestore().collection('saved_jobs').doc(savedJobId).delete().then(res => {
            getSavedJobs();
        })
    };

    const cancelAppliedJob = () => {
        firestore().collection('applied_jobs').doc(AppliedJobId).delete().then(res => {
            getAppliedJobs();
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.jobTitle}>{route.params.data.jobTitle}</Text>
            <View style={styles.detailsView}>
                <Text style={{ color: '#000' }}>{'Poster By :  ' + route.params.data.posterName}</Text>
            </View>

            <Text style={styles.jobDesc}>{route.params.data.jobDesc}</Text>
            <Text style={styles.exp}>{'Experience Required :  ' + route.params.data.experience + ' years'}</Text>
            <Text style={styles.exp}>{'Experience Skills :  ' + route.params.data.skill}</Text>
            <Text style={styles.exp}>{'Salary :  ' + route.params.data.salary + 'K'}</Text>
            <Text style={styles.exp}>{'Category :  ' + route.params.data.category}</Text>
            <Text style={styles.exp}>{'Company Name :  ' + route.params.data.company}</Text>

            <View style={styles.bottomView}>
                <TouchableOpacity disabled={isLogin ? false : true}
                    onPress={() => {
                        if (isJobSaved) {
                            removeSavedJob();
                        } else {
                            saveJob();
                        }

                    }}
                    style={styles.saveBtn}>
                    <Image source={isJobSaved ? require('../../images/starfill.png') : require('../../images/star.png')} style={styles.icon} />
                </TouchableOpacity>

                <TouchableOpacity disabled={isLogin ? false : true}
                    style={[styles.applyBtn, { backgroundColor: isLogin ? '#000' : '#9e9e9e' }]}
                    onPress={() => {
                        if (!isJobApplied) {
                            applyJob();
                        } else {
                            cancelAppliedJob();
                        }
                    }}
                >
                    <Text style={{ color: BG_COLOR }}>{isJobApplied ? 'Applied' : 'Apply'}</Text>
                </TouchableOpacity>

            </View>

        </View>
    )
}

export default JobDetails

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    jobTitle: {
        fontSize: moderateScale(30),
        fontWeight: '700',
        color: '#000',
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(20)
    },
    jobDesc: {
        width: '90%',
        marginTop: moderateScale(10),
        fontSize: moderateScale(16),
        fontWeight: '500',
        alignSelf: 'center',
        color: '#000'
    },
    exp: {
        color: '#000',
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(15),
        fontWeight: '500',
        fontSize: moderateScale(15)
    },
    detailsView: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '90%',
        alignSelf: 'center',
        marginTop: moderateScale(5)
    },
    bottomView: {
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        alignSelf: 'center',
        position: 'absolute',
        bottom: moderateScale(10),
    },
    saveBtn: {
        width: '25%',
        height: verticalScale(40),
        borderWidth: 0.5,
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    icon: {
        width: scale(30),
        height: scale(30)
    },
    applyBtn: {
        width: '70%',
        height: verticalScale(40),
        backgroundColor: TEXT_COLOR,
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    }
})