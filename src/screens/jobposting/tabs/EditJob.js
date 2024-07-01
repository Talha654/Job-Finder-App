import { FlatList, Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import { moderateScale, moderateVerticalScale, verticalScale } from 'react-native-size-matters'
import { useNavigation, useRoute } from '@react-navigation/native'
import CustomTextInput from '../../../common/CustomTextInput'
import CustomDropDown from '../../../common/CustomDropDown'
import CustomSolidBtn from '../../../common/CustomSolidBtn'
import { profiles } from '../../../utils/Profiles'
import firestore from '@react-native-firebase/firestore'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Loader from '../../../common/Loader'

const EditJob = () => {

    const route = useRoute();
    const navigation = useNavigation();

    const [jobTitle, setJobTitle] = useState(route.params.data.jobTitle);
    const [badJobTitle, setBadJobTitle] = useState('');

    const [jobDesc, setJobDesc] = useState(route.params.data.jobDesc);
    const [badJobDesc, setBadJobDesc] = useState('');

    const [experience, setExperience] = useState(route.params.data.experience);
    const [badExperience, setBadExperience] = useState('');

    const [salary, setSalary] = useState(route.params.data.salary);
    const [badSalary, setBadSalary] = useState('');

    const [company, setCompany] = useState(route.params.data.company);
    const [badCompany, setBadCompany] = useState('');
    const [openCategoryModal, setOpenCategoryModal] = useState(false);
    const [openSkillModal, setOpenSkillModal] = useState(false);

    const [selectedCategory, setSelectedCategory] = useState('Select Category');
    const [badSelectedCategory, setBadSelectedCategory] = useState('');

    const [selectedSkill, setSelectedSkill] = useState('Select Skill');
    const [badSelectedSkill, setBadSelectedSkill] = useState('');

    const [loading, setLoading] = useState(false);


    useEffect(() => {
        profiles.map((item, index) => {
            if (item.category == route.params.data.category) {
                setSelectedCategory(index);

                profiles[index].keywords.map((x, y) => {
                    if (x[0] == route.params.data.skill) {
                        setSelectedSkill(x[0]);
                    }
                })
            }
        })
    }, []);

    const updateJob = async () => {
        
        setLoading(true);

        let id = await AsyncStorage.getItem('USER_ID');
        let name = await AsyncStorage.getItem('NAME');

        firestore().collection('jobs').doc(route.params.data.id).update({
            postedBy: id,
            posterName: name,
            jobTitle,
            jobDesc,
            experience,
            salary,
            company,
            skill: selectedSkill,
            category: profiles[selectedCategory].category

        }).then(() => {
            setLoading(false);
            navigation.goBack();
        }).catch(err => {
            console.log(err);
        })
    };

    const validate = () => {
        let validJobTitle = true;
        let validJobDesc = true;
        let validCategory = true;
        let validSkill = true;
        let validExp = true;
        let validSalary = true;
        let validCompany = true;


        if (jobTitle == '') {
            validJobTitle = false;
            setBadJobTitle('Please Enter JobTitle');
        } else if (jobTitle != '') {
            validJobTitle = true;
            setBadJobTitle('');
        }

        if (jobDesc == '') {
            validJobDesc = false;
            setBadJobDesc('Please Enter Job Description');
        } else if (jobDesc != '' && jobDesc.length < 30) {
            validJobDesc = false;
            setBadJobDesc('Please Enter Job Description min 30 characters');
        } else if (jobDesc != '' && jobDesc.length >= 30) {
            validJobDesc = true;
            setBadJobDesc('');
        }

        if (selectedCategory == 'Select Category') {
            validCategory = false;
            setBadSelectedCategory('Please Select job Category');
        } else if (selectedCategory != 'Select Category') {
            validCategory = true;
            setBadSelectedCategory('');
        }

        if (selectedSkill == 'Select Skill') {
            validSkill = false;
            setBadSelectedSkill('Please Select Skill');
        } else if (selectedCategory != 'Select Skill') {
            validSkill = true;
            setBadSelectedSkill('');
        }

        let ExperienceRegex = /^\d+$/;

        if (experience == '') {
            validExp = false;
            setBadExperience('Please Enter Experience');
        } else if (experience != '' && experience.length > 2) {
            validExp = false;
            setBadExperience('Please Enter Valid Experience');
        } else if (experience != '' && experience.length < 3 && !experience.match(ExperienceRegex)) {
            validExp = false;
            setBadExperience('Please Enter Valid Experience');
        } else if (experience != '' && experience.length < 3 && experience.match(ExperienceRegex)) {
            validExp = true;
            setBadExperience('');
        }

        if (salary == '') {
            validSalary = false;
            setBadSalary('Please Enter Salary');
        } else if (salary != '' && !salary.match(ExperienceRegex)) {
            validSalary = false;
            setBadSalary('Please Enter Valid Salary');
        } else if (salary != '' && experience.match(ExperienceRegex)) {
            validSalary = true;
            setBadSalary('');
        }

        if (company == '') {
            validCompany = false;
            setBadCompany('Please Enter Company');
        } else if (salary != '') {
            validCompany = true;
            setBadCompany('');
        }

        return validJobTitle && validJobDesc && validCategory && validSkill && validExp && validSalary && validCompany;
    };

    return (
        <View style={{ flex: 1, backgroundColor: BG_COLOR }}>
            <View style={styles.header}>
                <TouchableOpacity
                    onPress={() => {
                        navigation.goBack();
                    }}
                >
                    <Image source={require('../../../images/back.png')} style={{ height: 20, width: 20 }} />
                </TouchableOpacity>
                <Text style={styles.headerTitle}>Edit Job</Text>
            </View>

            <CustomTextInput
                title={'Job Title'}
                placeholder={'ex. web dev'}
                value={jobTitle}
                onChangeText={setJobTitle}
                bad={badJobTitle != '' ? true : false}
            />
            {badJobTitle != '' && <Text style={styles.errorMsg}>{badJobTitle}</Text>}

            <CustomTextInput
                title={'Job Desccription'}
                placeholder={'ex. this is web development job'}
                value={jobDesc}
                onChangeText={setJobDesc}
                bad={badJobDesc != '' ? true : false}
            />
            {badJobDesc != '' && <Text style={styles.errorMsg}>{badJobDesc}</Text>}

            <CustomDropDown
                title={'Category'}
                placeholder={selectedCategory == 'Select Category' ? 'Select Category' : profiles[selectedCategory].category}
                value={jobDesc}
                onChangeText={setJobDesc}
                onClick={() => { setOpenCategoryModal(true) }}
                bad={badSelectedCategory != '' ? true : false}
            />
            {badSelectedCategory != '' && <Text style={styles.errorMsg}>{badSelectedCategory}</Text>}

            <CustomDropDown
                title={'Select Skills'}
                placeholder={selectedSkill}
                value={jobDesc}
                onChangeText={setJobDesc}
                onClick={() => { setOpenSkillModal(true) }}
                bad={badSelectedSkill != '' ? true : false}
            />
            {badSelectedSkill != '' && <Text style={styles.errorMsg}>{badSelectedSkill}</Text>}

            <CustomTextInput
                title={'Experience'}
                placeholder={'ex. 3+ years'}
                value={experience}
                onChangeText={setExperience}
                keyboardType={'number-pad'}
                bad={badExperience != '' ? true : false}
            />
            {badExperience != '' && <Text style={styles.errorMsg}>{badExperience}</Text>}

            <CustomTextInput
                title={'Salary'}
                placeholder={'ex. 80k'}
                value={salary}
                onChangeText={setSalary}
                keyboardType={'number-pad'}
                bad={badSalary != '' ? true : false}
            />
            {badSalary != '' && <Text style={styles.errorMsg}>{badSalary}</Text>}

            <CustomTextInput
                title={'Company'}
                placeholder={'ex. Dev Sinc'}
                value={company}
                onChangeText={setCompany}
                bad={badCompany != '' ? true : false}
            />
            {badCompany != '' && <Text style={styles.errorMsg}>{badCompany}</Text>}

            <CustomSolidBtn
                title={'Update Job'}
                marginBottom={30}
                onClick={() => {
                    if (validate()) {
                        updateJob();
                    }
                }}
            />

            <Modal visible={openCategoryModal} transparent style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,.3)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.listingView}>

                        <Text style={styles.title}>Select Category</Text>
                        <FlatList data={profiles} renderItem={({ item, index }) => {
                            return (
                                <TouchableOpacity style={styles.profileItem}
                                    onPress={() => {
                                        setOpenCategoryModal(false);
                                        setSelectedCategory(index)
                                    }}>
                                    <Text style={{ color: '#000' }}>{item.category}</Text>
                                </TouchableOpacity>
                            )
                        }} />
                    </View>
                </View>
            </Modal>


            <Modal visible={openSkillModal} transparent style={{ flex: 1 }}>
                <View style={{ backgroundColor: 'rgba(0,0,0,.3)', width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={styles.listingView}>

                        <Text style={styles.title}>Select Category</Text>

                        <FlatList
                            data={selectedCategory == 'Select Category' ? profiles[0].keywords : profiles[selectedCategory].keywords}
                            renderItem={({ item, index }) => {
                                return (
                                    <TouchableOpacity style={styles.profileItem}
                                        onPress={() => {
                                            // console.log('Skill items =>>>>>>>>>>>>>>>>>.', item)
                                            setOpenSkillModal(false);
                                            setSelectedSkill(item[0]);
                                        }}>
                                        <Text style={{ color: '#000' }}>{item[0]}</Text>
                                    </TouchableOpacity>
                                )
                            }} />
                    </View>
                </View>

            </Modal>

            <Loader visible={loading} />

        </View>
    )
}

export default EditJob

const styles = StyleSheet.create({
    header: {
        width: '100%',
        height: verticalScale(45),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: moderateScale(20)
    },
    headerTitle: {
        color: TEXT_COLOR,
        fontSize: moderateScale(20),
        marginLeft: moderateScale(20),
        fontWeight: '600'
    },
    listingView: {
        width: '90%',
        height: '80%',
        backgroundColor: BG_COLOR,
        borderRadius: moderateScale(10),
        // backgroundColor:'tomato'
    },
    profileItem: {
        width: '90%',
        height: verticalScale(40),
        justifyContent: 'center',
        paddingLeft: moderateScale(20),
        alignSelf: 'center',
        // backgroundColor: 'tomato',
        borderBottomWidth: .5
    },
    title: {
        color: TEXT_COLOR,
        fontSize: 20,
        fontWeight: '600',
        marginLeft: moderateScale(20),
        marginTop: moderateScale(20)
    },
    errorMsg: {
        marginLeft: moderateScale(25),
        marginTop: moderateVerticalScale(5),
        color: 'red'
    }
})