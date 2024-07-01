import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, LOGO_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder'
import LinearGradient from 'react-native-linear-gradient'


const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const MyJob = () => {

    const navigation = useNavigation();
    const isFoucused = useIsFocused();
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getJobs();
    }, [isFoucused]);

    const getJobs = async () => {
        setLoading(true);
        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('jobs').where('postedBy', '==', id)
            .get()
            .then(async (data) => {
                // console.log('get Jobs =>>>>>>>>>>>>>>>>', data.docs);

                let temp = [];
                data.docs.forEach(item => {
                    temp.push({ ...item.data(), id: item.id })
                });

                setJobs(temp);
                await AsyncStorage.setItem('JOBS', temp.length + '')
                setLoading(false);
            }).catch(err => {
                setLoading(false);
                console.log(err);
            })
    };

    const deleteJob = (id) => {
        firestore().collection('jobs').doc(id).delete().then(() => {
            getJobs();
        })
    };

    return (
        <View style={styles.container}>
            <Text style={styles.heading}>FindMyJob</Text>

            {loading &&
                < FlatList
                    data={[1, 2, 3]}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={styles.loaderView}>
                                <ShimmerPlaceholder style={styles.loaderTitle} />
                                <ShimmerPlaceholder style={styles.loaderTitle} />
                                <ShimmerPlaceholder style={styles.loaderTitle} />
                                <ShimmerPlaceholder style={styles.loaderTitle} />
                                <ShimmerPlaceholder style={styles.loaderTitle} />

                                <View style={styles.loaderBottomView}>
                                    <ShimmerPlaceholder style={styles.loaderBtn} />
                                    <ShimmerPlaceholder style={styles.loaderBtn} />
                                </View>
                            </View>
                        )
                    }}

                />
            }

            {
                jobs.length > 0 ? (
                    <FlatList data={jobs}
                        renderItem={({ item, index }) => {
                            return (
                                <View style={styles.jobCard}>
                                    <Text style={styles.title}>{item.jobTitle}</Text>
                                    <Text style={styles.desc}>{item.jobDesc}</Text>
                                    <Text style={styles.salary}>{'Salary: ' + item.salary + ' L/year'}</Text>
                                    <Text style={styles.salary}>{'Category: ' + item.category}</Text>
                                    <Text style={styles.salary}>{'Skill: ' + item.skill}</Text>

                                    <View style={styles.bottomView}>
                                        <TouchableOpacity style={styles.editBtn}
                                            onPress={() => {
                                                navigation.navigate('EditJob', { data: item })
                                            }}
                                        >
                                            <Text style={styles.btnTitle}>Edit Job</Text>
                                        </TouchableOpacity>

                                        <TouchableOpacity style={styles.deleteBtn}
                                            onPress={() => {
                                                deleteJob(item.id)
                                            }}
                                        >
                                            <Text style={[styles.btnTitle, { color: 'red' }]}>Delete Job</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                            );
                        }}
                    />
                ) : (
                    <View style={styles.emptyView}>
                        <Text style={[styles.title, { color: '#9e9e9e' }]}>Empty Jobs</Text>
                    </View>
                )
            }

        </View>
    );
};

export default MyJob

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    heading: {
        fontSize: moderateScale(25),
        marginLeft: moderateScale(10),
        marginTop: moderateVerticalScale(5),
        fontWeight: '600',
        color: LOGO_COLOR
    },
    jobCard: {
        width: '90%',
        alignSelf: "center",
        marginTop: moderateScale(20),
        backgroundColor: '#f2f2f2',
        borderRadius: moderateScale(20),
        padding: moderateScale(15)
    },
    title: {
        fontSize: moderateScale(20),
        fontWeight: '600',
        color: TEXT_COLOR
    },
    desc: {
        fontSize: moderateScale(14),
        fontWeight: '500',
        color: TEXT_COLOR,
        marginTop: moderateScale(5)
    },
    salary: {
        fontSize: moderateScale(15),
        fontWeight: '600',
        marginTop: moderateScale(5),
        color: TEXT_COLOR
    },
    bottomView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: moderateScale(20),
        marginTop: moderateScale(15),
    },
    editBtn: {
        width: '40%',
        height: verticalScale(30),
        borderWidth: 1,
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    },
    deleteBtn: {
        width: '40%',
        height: verticalScale(30),
        borderWidth: 1,
        borderColor: 'red',
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center',
    },
    btnTitle: {
        color: TEXT_COLOR,
    },
    emptyView: {
        height: '100%',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    loaderView: {
        width: '90%',
        height: verticalScale(150),
        alignSelf: 'center',
        marginTop: moderateScale(40)
    },
    loaderTitle: {
        width: '70%',
        height: verticalScale(20),
        borderRadius: moderateScale(10),
        marginTop: moderateScale(10)
    },
    loaderBottomView: {
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: moderateScale(10)
    },
    loaderBtn: {
        width: '45%',
        height: verticalScale(30),
        borderRadius: moderateScale(10),
        justifyContent: 'center',
        alignItems: 'center'
    }
})