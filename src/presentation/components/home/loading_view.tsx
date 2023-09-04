import React from 'react'
import { StyleSheet } from 'react-native'
import { ActivityIndicator, Text } from 'react-native'
import { SafeAreaView } from "react-native-safe-area-context"
import TextStyles from '../../styling/textstyles'

export const LoadingView =({loadingMessage}: {loadingMessage:string})=> {
   return <SafeAreaView style={styles.container}>
    <ActivityIndicator/>
    <Text style={styles.text}>{loadingMessage}</Text>
   </SafeAreaView>
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent:'center'
    }, 
    text:{
        paddingTop:8,
        ...TextStyles.bodySmallMedium
    }
});