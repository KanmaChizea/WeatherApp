import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import { selectUser } from "../../business_logic/redux/user/user";

function HomeScreen() : JSX.Element{
    const name = useSelector(selectUser)
    return <SafeAreaView>
        <Text>Home</Text>
    </SafeAreaView>
}

export default HomeScreen