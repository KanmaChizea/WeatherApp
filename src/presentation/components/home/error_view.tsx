import React from 'react'
import { Text, StyleSheet } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context"
import TextStyles from '../../styling/textstyles';
import { ErrorImage } from '../../../../assets';
import { ShortFilledButton } from '../shared/button';

export const ErrorView =(props:{errorMessage:string, retryFunction: ()=>void})=> {
   return <SafeAreaView style={styles.container}>
    <ErrorImage height={100} width={100}/>
    <Text style={styles.text}>{props.errorMessage}</Text>
    <ShortFilledButton 
        isActive={true} 
        isLoading={false} 
        onPress={props.retryFunction} 
        label={'Try again'}/>
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
        ...TextStyles.bodySmallMedium,
        paddingBottom: 48
    }
});