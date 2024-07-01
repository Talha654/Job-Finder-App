import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'
import { moderateScale, scale, verticalScale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import CustomSolidBtn from '../../common/CustomSolidBtn';
import CustomBorderBtn from '../../common/CustomBorderBtn';
import storage from '@react-native-firebase/storage';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loader from '../../common/Loader';

const ChangeProfilePicForCompany = () => {

    const navigation = useNavigation();
    const [imageData, setImageData] = useState(null);
    const [loading, setLoading] = useState(false);

    const openGallery = async () => {
        const res = await launchImageLibrary({ mediaType: 'photo' });
        if (!res.didCancel) {
            setImageData(res);
        }
    };

    const openCamera = async () => {
        const res = await launchCamera({ mediaType: 'photo' });

        if (!res.didCancel) {
            setImageData(res);
        }
    };

    const uploadPic = async () => {

        setLoading(true);
        const reference = storage().ref(imageData.assets[0].fileName);

        const pathToFile = imageData.assets[0].uri;

        await reference.putFile(pathToFile);

        const url = await storage().ref(imageData.assets[0].fileName).getDownloadURL();

        const id = await AsyncStorage.getItem('USER_ID');

        firestore()
            .collection('job_posters')
            .doc(id)
            .update({
                profileImage: url
            })
            .then(async () => {
                await AsyncStorage.setItem('PROFILE_IMAGE', url);
                setLoading(false);
                navigation.goBack();
            })
            .catch(err => {
                setLoading(false);
                console.log(err);
            });

    };

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.header}
                onPress={() => {
                    navigation.goBack();
                }}
            >
                <Image source={require('../../images/back.png')} style={{ height: 20, width: 20 }} />
            </TouchableOpacity>
            {
                imageData == null ? (<Image
                    source={require('../../images/profile.png')}
                    style={styles.profileImg}
                />) : (<Image
                    source={{ uri: imageData.assets[0].uri }}
                    style={styles.profileImg}
                />)
            }

            <CustomBorderBtn
                title={'Choose Image From Gallery'}
                onClick={() => {
                    openGallery();
                }}
            />

            {
                imageData != null &&
                <CustomSolidBtn
                    title={'Upload Profile Pic'}
                    onClick={() => {
                        uploadPic();
                    }}
                />
            }
            <Loader visible={loading} />
        </View>
    );
};

export default ChangeProfilePicForCompany

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
    header: {
        width: '100%',
        height: verticalScale(45),
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: moderateScale(15)
    },
    profileImg: {
        width: scale(150),
        height: scale(150),
        alignSelf: 'center',
        borderRadius: moderateScale(150),
        marginTop: moderateScale(50)
    },
    pick: {
        padding: moderateScale(10),
        color: TEXT_COLOR,
        borderWidth: 1,
        width: '60%',
        alignSelf: 'center',
        textAlign: 'center',
        borderRadius: moderateScale(10),
        marginTop: moderateScale(50)
    }
});