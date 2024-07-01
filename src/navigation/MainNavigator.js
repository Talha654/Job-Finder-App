import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native';
import JobPostingNavigator from './JobPostingNavigator';
import JobSearchingNavigator from './JobSearchingNavigator';
import SelectUser from '../screens/onboarding/SelectUser';
import Splash from '../screens/onboarding/Splash';
import DashboardForCompany from '../screens/jobposting/DashboardForCompany';
import AddJob from '../screens/jobposting/tabs/AddJob';
import EditJob from '../screens/jobposting/tabs/EditJob';
import UpdateProfileForCompany from '../screens/jobposting/UpdateProfileForCompany';
import ChangeProfilePicForCompany from '../screens/jobposting/ChangeProfilePicForCompany';


const Stack = createStackNavigator();

const MainNavigator = () => {

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                <Stack.Screen name='Splash' component={Splash} />
                <Stack.Screen name='DashboardForCompany' component={DashboardForCompany} />
                <Stack.Screen name='SelectUser' component={SelectUser} />
                <Stack.Screen name='AddJob' component={AddJob} />
                <Stack.Screen name='EditJob' component={EditJob} />
                <Stack.Screen name='UpdateProfileForCompany' component={UpdateProfileForCompany} />
                <Stack.Screen name='ChangeProfilePicForCompany' component={ChangeProfilePicForCompany} />
                <Stack.Screen name='JobPostingNavigator' component={JobPostingNavigator} />
                <Stack.Screen name='JobSearchingNavigator' component={JobSearchingNavigator} />

            </Stack.Navigator>
        </NavigationContainer>
    )
}

export default MainNavigator

const styles = StyleSheet.create({})