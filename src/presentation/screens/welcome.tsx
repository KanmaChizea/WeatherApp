import React, { useEffect, useState } from "react";
import { Button, Dimensions, Keyboard, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { WelcomeScreenNavigationProp } from "../../business_logic/navigation/stack_types";
import { SafeAreaView } from "react-native-safe-area-context";
import FilledButton from "../components/shared/button";
import InputField from "../components/shared/input_field";
import TextStyles from "../styling/textstyles";
import { WelcomeImage } from "../../../assets";
import { useAppDispatch, useAppSelector } from "../../business_logic/redux/hooks";
import { selectUser, selectUserError, selectUserLoading } from "../../business_logic/redux/user/user";
import { loginUser } from "../../business_logic/redux/user/thunk/login_user";
import Snackbar from "react-native-snackbar";
import Colors from "../styling/colors";

function WelcomeScreen() : JSX.Element{

    const [name, useName] = useState<string>('');
    const isLoading = useAppSelector(selectUserLoading);
    const userError = useAppSelector(selectUserError);
    const [isActive, useIsActive] = useState<boolean>(false);
    const dispatch = useAppDispatch();

    useEffect(()=> {  
        if(userError !== undefined){
            Snackbar.show({
                text: userError.errorMessage,
                backgroundColor: Colors.red
            });
        } 
    }, [userError]);

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
                    isLoading = {isLoading}
                     onPress= {()  => {
                        if(isActive) {
                      dispatch(loginUser(name));                        
                        }
                    }
                        }
                       
                     />      
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