import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoLoginComponent from '../../../common/NoLoginComponent'
import { BG_COLOR } from '../../../utils/Colors'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { FlatList } from 'react-native-gesture-handler'
import firestore from '@react-native-firebase/firestore'
import { moderateScale } from 'react-native-size-matters'
import SavedJobs from '../SavedJobs'

const Applies = () => {

    const isFocused = useIsFocused();
    const [isLogin, setISLogin] = useState(false);
    const navigation = useNavigation();
    const [saveJobs, setSaveJobs] = useState([]);

    useEffect(() => {
        getData();
        getJobs();
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

    const getJobs = async () => {

        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('applied_jobs').where('userId', '==', id).get().then(res => {
            console.log('applied Jobs =>>>>>>>>>>.', res.docs);
            let temp = [];

            res.docs.forEach(item => {
                temp.push({ ...item.data(), appliedId: item.id });
            })
            setSaveJobs(temp);

        })
    };

    const removeSavedJob = (id) => {
        firestore().collection('applied_jobs').doc(id).delete().then(res => {
            getJobs();
        })
    };

    return (
        <View style={styles.container}>

            {
                !isLogin &&
                <NoLoginComponent
                    heading={'One place to track all your application'}
                    desc={'track all your jobs which you applied but for that you need to create account first'}

                />
            }

            {
                isLogin && saveJobs.length > 0 ?
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
                                                removeSavedJob(item.appliedId);
                                            }}
                                        >
                                            <Image source={require('../../../images/starfill.png')} style={{ width: 30, height: 30 }} />
                                        </TouchableOpacity>
                                    </View>
                                    <Text style={styles.subTitle}>{'Job Category: ' + item.category}</Text>
                                    <Text style={styles.subTitle}>{'Job Category: ' + item.posterName}</Text>
                                </TouchableOpacity>
                            )
                        }}
                    /> : null
            }

            {

                isLogin && saveJobs.length < 1 ?
                    (
                        <View style={styles.emptyView}>
                            <Text style={styles.emptyText}>No Applied Jobs</Text>
                        </View>
                    )
                    : null

            }

        </View>
    )
}

export default Applies

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
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
})