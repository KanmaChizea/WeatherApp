import React, { useState } from "react";
import { Dimensions, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { WelcomeScreenNavigationProp } from "../../business_logic/navigation/stack_types";
import { SafeAreaView } from "react-native-safe-area-context";
import FilledButton from "../components/shared/button";
import InputField from "../components/shared/input_field";
import TextStyles from "../styling/textstyles";
import { WelcomeImage } from "../../../assets";
import * as UserInfo from "../../data/local storage/user";
import Snackbar from "react-native-snackbar";
import Colors from "../styling/colors";

function WelcomeScreen({navigation}: WelcomeScreenNavigationProp) : JSX.Element{
    const [name, useName] = useState<string>('');
    const [isLoading, useIsLoading] = useState<boolean>(false);
    const [isActive, useIsActive] = useState<boolean>(false);
    return <SafeAreaView style= {{flex: 1}}>
        <TouchableWithoutFeedback 
        style= {{flex: 1}}
            onPress={ () => Keyboard.dismiss() } 
            accessible={false}>
                <View style={styles.container}>
                <View>
                <View style={{alignItems: 'center', marginBottom: 24}}>
                <WelcomeImage height={Dimensions.get('window').height * 0.3}/>
                </View>
                <Text style={TextStyles.h1}>{'Welcome to Your \nWeather App'}</Text>
                <View style={ {paddingTop: 42} }/>
                <Text style={TextStyles.bodyLarge}>What's your name?</Text>
                <View style={ {paddingTop: 12} }/>
                <InputField 
                    value={name} 
                    placeholder="" 
                    onChangeText={ (val)=>{
                        useName(val)
                        if(val.length > 0 && !isActive ){
                            useIsActive(true)
                        } else if(val.length == 0){
                            useIsActive(false)
                        }
                        
                        } }/>
                </View>
                <FilledButton
                    label="Login"
                    isActive={isActive}
                    isLoading ={isLoading}
                     onPress= { async ()  => {
                        if(isActive){
                            useIsLoading(true)
                           var result = await UserInfo.storeUsername(name)
                           useIsLoading(false)
                           if(result){
                            navigation.navigate('WeatherApp')
                           } else {
                            Snackbar.show({
                                text: 'Could not save user name. Please try again',
                                backgroundColor: Colors.red
                            })
                           }
                        }
                    }
                         }/>      
                </View>
        </TouchableWithoutFeedback>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal :16,
        paddingTop: 24,
        paddingBottom: 50,
        flexDirection: 'column',
        justifyContent:'space-between',
        flex:1
     
    }

})

export default WelcomeScreen