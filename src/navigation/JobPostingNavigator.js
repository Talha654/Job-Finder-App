import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import LoginForCompany from '../screens/jobposting/LoginForCompany';
import SignupForCompany from '../screens/jobposting/SignupForCompany';
import DashboardForCompany from '../screens/jobposting/DashboardForCompany';

const Stack = createStackNavigator();

const JobPostingNavigator = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name='LoginForCompany' component={LoginForCompany} />
            <Stack.Screen name='SignupForCompany' component={SignupForCompany} />
            <Stack.Screen name='DashboardForCompany' component={DashboardForCompany} />
        </Stack.Navigator>
    )
}

export default JobPostingNavigator

const styles = StyleSheet.create({})