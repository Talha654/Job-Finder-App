import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BG_COLOR, TEXT_COLOR } from '../../utils/Colors'

const DrawerScreen = () => {
    return (
        <View style={{ flex: 1 }}>
            <Text style={{ color: TEXT_COLOR }}>DrawerScreen</Text>
        </View>
    )
}

export default DrawerScreen

const styles = StyleSheet.create({})