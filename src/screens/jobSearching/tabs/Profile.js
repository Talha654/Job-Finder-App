import { Alert, FlatList, Image, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoLoginComponent from '../../../common/NoLoginComponent'
import { BG_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import firestore from '@react-native-firebase/firestore'
import { moderateScale, scale } from 'react-native-size-matters'
import Modal from 'react-native-modal'
import { ScrollView } from 'react-native-gesture-handler'

const Profile = () => {

    const isFocused = useIsFocused();
    const [isLogin, setISLogin] = useState(false);
    const [userData, setUserData] = useState(null);
    const [skillModal, setSkillModal] = useState(false);
    const [skill, setSkill] = useState('');
    const [skillsList, setSkillsList] = useState([]);
    const [experienceModal, setExperienceModal] = useState(false);
    const [company, setCompany] = useState('');
    const [startYear, setStartYear] = useState('');
    const [endYear, setEndYear] = useState('');
    const [profile, setProfile] = useState('');
    const [experienceList, setExperienceList] = useState([]);
    const [educationModal, setEducationModal] = useState(false);
    const [college, setCollege] = useState('');
    const [eduStartYear, setEduStartYear] = useState('');
    const [eduEndYear, setEduEndYear] = useState('');
    const [course, setCourse] = useState('');
    const [eduList, setEduList] = useState([]);

    useEffect(() => {
        getData();
        getProfileData();
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

    const getProfileData = async () => {
        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('usersData').doc(id).get().then(res => {
            console.log(res.data());
            setUserData(res.data());
        })
    };

    const addSkill = async () => {
        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('skills').add({
            skill: skill,
            userId: id
        }).then(() => {
            Alert.alert('Skill Added');
            setSkill('');
            getSkill();
        }).catch(err => {
            console.log(err)
        })
    };

    const addExperience = async () => {
        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('experience').add({
            company,
            startYear,
            endYear,
            profile,
            userId: id
        }).then(() => {
            Alert.alert('Experience Added');
            setCompany('');
            setStartYear('');
            setEndYear();
            setProfile('');
            getExperience();

        }).catch(err => {
            console.log(err)
        })
    };


    const addEducation = async () => {
        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('education').add({
            college,
            eduStartYear,
            eduEndYear,
            course,
            userId: id
        }).then(() => {
            Alert.alert('Education Added');
            setCollege('');
            setEduStartYear('');
            setEduEndYear();
            setCourse('');
            getEducation();

        }).catch(err => {
            console.log(err)
        })
    };

    useEffect(() => {
        getSkill();
        getExperience();
        getEducation();
    }, []);

    const getSkill = async () => {
        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('skills').where('userId', '==', id).get()
            .then((res) => {
                let temp = [];

                res.forEach(item => {
                    temp.push({ ...item.data(), skillId: item.id })
                });
                setSkillsList(temp);
                console.log(res.docs)
            }).catch(err => {
                console.log(err)
            })
    };

    const getExperience = async () => {
        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('experience').where('userId', '==', id).get()
            .then((res) => {
                let temp = [];

                res.forEach(item => {
                    temp.push({ ...item.data(), experienceId: item.id })
                });
                setExperienceList(temp);
                console.log(res.docs)
            }).catch(err => {
                console.log(err)
            })
    };

    const getEducation = async () => {
        const id = await AsyncStorage.getItem('USER_ID');

        firestore().collection('education').where('userId', '==', id).get()
            .then((res) => {
                let temp = [];

                res.forEach(item => {
                    temp.push({ ...item.data(), eduId: item.id })
                });
                setEduList(temp);
                console.log(res.docs)
            }).catch(err => {
                console.log(err)
            })
    };

    const deleteSkill = (id) => {
        firestore().collection('skills').doc(id).delete().then(res => {
            console.log('Skill deleted successfully');
            getSkill();
        })
    };

    const deleteExperience = (id) => {
        firestore().collection('experience').doc(id).delete().then(res => {
            console.log('Experience deleted successfully');
            getExperience();
        })
    };

    const deleteEducation = (id) => {
        firestore().collection('education').doc(id).delete().then(res => {
            console.log('Education deleted successfully');
            getEducation();
        })
    };
    return (
        <ScrollView style={styles.container}>

            {
                !isLogin &&
                <NoLoginComponent
                    heading={'Easy Manage For Profile/Portfolio'}
                    desc={'Manage to Professional Profile/Portfolio for attracting many jobs'}
                />
            }

            {
                isLogin &&
                <View style={styles.mainView}>
                    <TouchableOpacity style={{ marginLeft: 20, marginTop: 20 }}>
                        <Image source={require('../../../images/profile.png')} style={styles.profileImg} />
                    </TouchableOpacity>

                    <Text style={styles.name}>{userData ? userData.name : 'NA'}</Text>
                    <Text style={styles.email}>{userData ? userData.email : 'NA'}</Text>
                    <TouchableOpacity style={styles.editBtn}>
                        <Text style={{ color: '#000' }}>Edit Profile</Text>
                    </TouchableOpacity>

                    {/* Skills  */}

                    <View style={styles.headingView}>

                        <Text style={{
                            fontSize: moderateScale(25),
                            fontWeight: '600',
                            color: TEXT_COLOR
                        }}>
                            {'Skills'}
                        </Text>

                        <Text style={{
                            fontSize: moderateScale(30),
                            fontWeight: '600',
                            marginLeft: moderateScale(20),
                            color: TEXT_COLOR
                        }}
                            onPress={() => {
                                setSkillModal(true);
                            }}
                        >
                            {'+'}
                        </Text>
                    </View>
                    <View>
                        <FlatList
                            data={skillsList}
                            renderItem={({ item, index }) => {
                                return (
                                    <View style={styles.skillItem}>
                                        <Text style={styles.skillName}>{item.skill}</Text>

                                        <TouchableOpacity onPress={() => { deleteSkill(item.skillId) }}>
                                            <Image source={require('../../../images/close.png')} style={[styles.closeIcon, { marginTop: moderateScale(10) }]} />
                                        </TouchableOpacity>

                                    </View>
                                )
                            }}
                        />
                    </View>

                    {/* Experience  */}


                    <View style={[styles.headingView, { marginTop: 10 }]}>

                        <Text style={{
                            fontSize: moderateScale(25),
                            fontWeight: '600',
                            color: TEXT_COLOR
                        }}>
                            {'Experience'}
                        </Text>

                        <Text style={{
                            fontSize: moderateScale(30),
                            fontWeight: '600',
                            marginLeft: moderateScale(20),
                            color: TEXT_COLOR
                        }}
                            onPress={() => {
                                setExperienceModal(true);
                            }}
                        >
                            {'+'}
                        </Text>
                    </View>

                    <View>
                        <FlatList

                            style={{ height: 300 }}
                            data={experienceList}
                            renderItem={({ item, index }) => {
                                console.log('item=>>>>>>>>>>>>>>>>>>>>>>>>', item)
                                return (
                                    <View style={[styles.skillItem, { marginTop: moderateScale(10), height: moderateScale(79) }]}>
                                        <View>
                                            <Text style={[styles.skillName]}>{item.company}</Text>
                                            <Text style={styles.expYear}>{item.startYear + ' - ' + item.endYear}</Text>
                                            <Text style={[styles.skillName, { marginBottom: 20 }]}>{item.profile}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => { deleteExperience(item.experienceId) }}>
                                            <Image source={require('../../../images/close.png')} style={[styles.closeIcon]} />
                                        </TouchableOpacity>

                                    </View>
                                )
                            }}
                        />
                    </View>

                    {/* Education */}

                    <View style={[styles.headingView, { marginTop: 10 }]}>

                        <Text style={{
                            fontSize: moderateScale(25),
                            fontWeight: '600',
                            color: TEXT_COLOR
                        }}>
                            {'Education'}
                        </Text>

                        <Text style={{
                            fontSize: moderateScale(30),
                            fontWeight: '600',
                            marginLeft: moderateScale(20),
                            color: TEXT_COLOR
                        }}
                            onPress={() => {
                                setEducationModal(true);
                            }}
                        >
                            {'+'}
                        </Text>
                    </View>

                    <View>
                        <FlatList
                            contentContainerStyle={{ marginBottom: moderateScale(50) }}
                            data={eduList}
                            renderItem={({ item, index }) => {
                                console.log('item=>>>>>>>>>>>>>>>>>>>>>>>>', item)
                                return (
                                    <View style={[styles.skillItem, { marginTop: moderateScale(20), height: scale(80) }]}>
                                        <View>
                                            <Text style={styles.skillName}>{item.college}</Text>
                                            <Text style={styles.expYear}>{item.eduStartYear + ' - ' + item.eduEndYear}</Text>
                                            <Text style={styles.skillName}>{item.course}</Text>
                                        </View>

                                        <TouchableOpacity onPress={() => { deleteEducation(item.eduId) }}>
                                            <Image source={require('../../../images/close.png')} style={[styles.closeIcon]} />
                                        </TouchableOpacity>

                                    </View>
                                )
                            }}
                        />
                    </View>

                </View>
            }
            {/* Skill Modal */}

            <Modal isVisible={skillModal} backdropOpacity={.5} style={{ margin: 0 }} >
                <View style={styles.skillModal}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.title}>Add Skills</Text>
                        <TouchableOpacity onPress={() => { setSkillModal(false); }}>
                            <Image source={require('../../../images/close.png')} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Skill Name'
                        placeholderTextColor={'#9e9e9e'}
                        value={skill}
                        onChangeText={(txt) => setSkill(txt)}
                    />
                    <TouchableOpacity style={styles.btn}
                        onPress={() => {
                            setSkillModal(false);
                            if (skill != '') {
                                addSkill();
                            }
                        }}
                    >
                        <Text style={styles.btnText}>Submit Skill</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Experience Modal */}

            <Modal isVisible={experienceModal} backdropOpacity={.5} style={{ margin: 0 }} >
                <View style={styles.skillModal}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.title}>Add Experience</Text>
                        <TouchableOpacity onPress={() => { setExperienceModal(false); }}>
                            <Image source={require('../../../images/close.png')} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Company Name'
                        placeholderTextColor={'#9e9e9e'}
                        value={company}
                        onChangeText={(txt) => setCompany(txt)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Start Year'
                        placeholderTextColor={'#9e9e9e'}
                        value={startYear}
                        onChangeText={(txt) => setStartYear(txt)}
                        maxLength={4}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter End Year'
                        placeholderTextColor={'#9e9e9e'}
                        value={endYear}
                        onChangeText={(txt) => setEndYear(txt)}
                        maxLength={4}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Profile'
                        placeholderTextColor={'#9e9e9e'}
                        value={profile}
                        onChangeText={(txt) => setProfile(txt)}
                    />
                    <TouchableOpacity style={styles.btn}
                        onPress={() => {
                            setExperienceModal(false);
                            if (company != '' && startYear != '' && endYear != '' && profile != '') {
                                addExperience();
                            }
                        }}
                    >
                        <Text style={styles.btnText}>Submit Experience</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

            {/* Education Modal */}

            <Modal isVisible={educationModal} backdropOpacity={.5} style={{ margin: 0 }} >
                <View style={styles.skillModal}>
                    <View style={styles.modalHeader}>
                        <Text style={styles.title}>Add Education</Text>
                        <TouchableOpacity onPress={() => { setEducationModal(false); }}>
                            <Image source={require('../../../images/close.png')} style={styles.closeIcon} />
                        </TouchableOpacity>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder='Enter College Name'
                        placeholderTextColor={'#9e9e9e'}
                        value={college}
                        onChangeText={(txt) => setCollege(txt)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Start Year'
                        placeholderTextColor={'#9e9e9e'}
                        value={eduStartYear}
                        onChangeText={(txt) => setEduStartYear(txt)}
                        maxLength={4}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter End Year'
                        placeholderTextColor={'#9e9e9e'}
                        value={setEduEndYear}
                        onChangeText={(txt) => setEduEndYear(txt)}
                        maxLength={4}
                        keyboardType='numeric'
                    />
                    <TextInput
                        style={styles.input}
                        placeholder='Enter Course'
                        placeholderTextColor={'#9e9e9e'}
                        value={course}
                        onChangeText={(txt) => setCourse(txt)}
                    />
                    <TouchableOpacity style={styles.btn}
                        onPress={() => {
                            setEducationModal(false);
                            if (college != '' && eduStartYear != '' && eduEndYear != '' && course != '') {
                                addEducation();
                            }
                        }}
                    >
                        <Text style={styles.btnText}>Submit Education</Text>
                    </TouchableOpacity>
                </View>
            </Modal>

        </ScrollView >
    )
}

export default Profile

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR,
        marginBottom: moderateScale(90)
    },
    mainView: {
        flex: 1
    },
    profileImg: {
        height: 100,
        width: 100,
        borderRadius: 50
    },
    name: {
        color: '#000',
        fontSize: 30,
        fontWeight: '600',
        marginLeft: 20,
        marginTop: 10
    },
    email: {
        fontSize: 20,
        fontWeight: '500',
        color: TEXT_COLOR,
        marginLeft: 20,
    },
    editBtn: {
        width: 200,
        height: 50,
        borderWidth: .4,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginTop: 20,
        marginLeft: 20
    },
    headingView: {
        width: '90%',
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: moderateScale(30),
        alignSelf: 'center'
    },
    skillModal: {
        width: '100%',
        backgroundColor: BG_COLOR,
        position: 'absolute',
        bottom: 0,
        borderTopLeftRadius: moderateScale(20),
        borderTopRightRadius: moderateScale(20),
        paddingBottom: moderateScale(20)
    },
    title: {
        color: TEXT_COLOR,
        fontSize: moderateScale(18),
        fontWeight: '500'
    },
    closeIcon: {
        width: scale(24),
        height: scale(24),
    },
    modalHeader: {
        width: '90%',
        alignSelf: "center",
        marginTop: moderateScale(20),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    input: {
        width: '90%',
        height: scale(40),
        borderWidth: 1,
        alignSelf: 'center',
        marginTop: moderateScale(20),
        borderRadius: moderateScale(10),
        paddingLeft: moderateScale(15),
        color: TEXT_COLOR
    },
    btn: {
        width: '90%',
        height: scale(45),
        backgroundColor: TEXT_COLOR,
        alignSelf: 'center',
        borderRadius: moderateScale(10),
        marginTop: moderateScale(20),
        justifyContent: 'center',
        alignItems: 'center'
    },
    btnText: {
        fontSize: moderateScale(16),
        fontWeight: '500',
        color: BG_COLOR
    },
    skillItem: {
        width: '90%',
        height: scale(50),
        alignSelf: 'center',
        paddingLeft: moderateScale(20),
        flexDirection: 'row',
        justifyContent: 'space-between'

    },
    skillName: {
        fontSize: moderateScale(18),
        fontWeight: '500',
        color: TEXT_COLOR,
    },
    expYear: {
        fontSize: moderateScale(14),
        marginTop: moderateScale(10),
        color: TEXT_COLOR
    }
})