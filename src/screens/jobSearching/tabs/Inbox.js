import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import NoLoginComponent from '../../../common/NoLoginComponent'
import { BG_COLOR } from '../../../utils/Colors'
import { useIsFocused } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const Inbox = () => {

    const isFocused = useIsFocused();
    const [isLogin, setISLogin] = useState(false);

    useEffect(() => {
        getData();
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

    return (
        <View style={styles.container}>

            {
                !isLogin &&
                <NoLoginComponent
                    heading={'You can chat with recruiter'}
                    desc={'Talk to any recruiter for getting a job recommendation '}
                />
            }

        </View>
    )
}

export default Inbox

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: BG_COLOR
    },
})