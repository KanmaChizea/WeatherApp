import React from "react";
import { Button, SafeAreaView, Text, View } from "react-native";
import { WeatherAppScreenNavigationProp } from "../../business_logic/navigation/stack_types";

function AccountScreen({navigation} : WeatherAppScreenNavigationProp) : JSX.Element{
    return <SafeAreaView>
        <Text>Account</Text>
        <Button title="Logout" onPress={()=>{navigation.navigate('Welcome')}}/>
    </SafeAreaView>
}

export default AccountScreen