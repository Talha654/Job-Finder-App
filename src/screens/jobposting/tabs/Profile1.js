import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { moderateScale, moderateVerticalScale, scale } from 'react-native-size-matters'
import { BG_COLOR, LOGO_COLOR, TEXT_COLOR } from '../../../utils/Colors'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ProfileOptionItem from '../../../common/ProfileOptionItem'
import { useIsFocused, useNavigation } from '@react-navigation/native'

const Profile1 = ({ onJobsClick }) => {

  const navigation = useNavigation();
  const isFoucsed = useIsFocused();

  const [name, setName] = useState('');
  const [jobs, setJobs] = useState('');
  const [profileImg, setProfileImg] = useState('')

  useEffect(() => {
    getData();
  }, [isFoucsed]);

  const getData = async () => {
    let name = await AsyncStorage.getItem('NAME');
    let jobs = await AsyncStorage.getItem('JOBS');
    let img = await AsyncStorage.getItem('PROFILE_IMAGE');
    setName(name);
    setJobs(jobs);
    if (img != null) {
      setProfileImg(img);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>FindMyJob</Text>

      <TouchableOpacity>
        {
          profileImg != '' ?
            (<Image
              source={{ uri: profileImg }}
              style={styles.profileImg}
            />)
            : (
              <Image
                source={require('../../../images/profile.png')}
                style={styles.profileImg}
              />
            )
        }
      </TouchableOpacity>
      <Text style={styles.name}>{name}</Text>
      <Text style={styles.changeProfilePic} onPress={() => {
        navigation.navigate('UpdateProfileForCompany')
      }} >Update Profile</Text>
      <Text style={styles.changeProfilePic}
        onPress={() => {
          navigation.navigate('ChangeProfilePicForCompany');
        }}
      >Change Profile Picture</Text>

      <View style={styles.optionArea}>

        <ProfileOptionItem
          icon={require('../../../images/jobs.png')}
          title={'My Jobs (' + jobs + ')'}
          onClick={() => {
            onJobsClick();
          }}
        />
        <ProfileOptionItem
          icon={require('../../../images/contact.png')}
          title={'Contact Us'}
          onClick={() => {

          }}
        />
        <ProfileOptionItem
          icon={require('../../../images/theme.png')}
          title={'Theme'}
          onClick={() => {

          }}
        />
        <ProfileOptionItem
          icon={require('../../../images/logout.png')}
          title={'Logout'}
          onClick={() => {

          }}
        />
      </View>

    </View>
  )
}

export default Profile1

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
  profileImg: {
    width: scale(100),
    height: (110),
    borderRadius: moderateScale(50),
    alignSelf: 'center',
    marginTop: moderateScale(20)
  },
  changeProfilePic: {
    textDecorationLine: 'underline',
    color: TEXT_COLOR,
    alignSelf: 'center',
    marginTop: moderateScale(10),
    fontSize: moderateScale(16)
  },
  name: {
    fontSize: moderateScale(25),
    fontWeight: '600',
    alignSelf: 'center',
    marginTop: moderateScale(10),
    color: TEXT_COLOR
  },
  optionArea: {
    marginTop: moderateVerticalScale(70)
  }
})