import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'

const Logout = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ color: TEXT_COLOR }}>Logout</Text>
        </View>
    )
}

export default Logout

const styles = StyleSheet.create({})