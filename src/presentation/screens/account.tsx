import React, { useEffect } from "react";
import { SafeAreaView, StyleSheet, Text, View } from "react-native";
import { WeatherAppScreenNavigationProp } from "../../business_logic/navigation/stack_types";
import { useAppDispatch, useAppSelector } from "../../business_logic/redux/hooks";
import { logoutUser } from "../../business_logic/redux/user/thunk/logout_user";
import Snackbar from "react-native-snackbar";
import { selectUser, selectUserError } from "../../business_logic/redux/user/user";
import TextStyles from "../styling/textstyles";
import { TouchableOpacity } from "react-native-gesture-handler";
import Colors from "../styling/colors";
import Svg, { Circle } from "react-native-svg";
import Icon from "react-native-vector-icons/MaterialIcons";

function AccountScreen({navigation} : WeatherAppScreenNavigationProp) : JSX.Element{

    const user = useAppSelector(selectUser);
    const userError = useAppSelector(selectUserError);
    const dispatch = useAppDispatch()
    
    useEffect(()=> {  
        if(userError !== undefined){
            Snackbar.show({
                text: userError.errorMessage,
                backgroundColor: Colors.red
            });
        } else if(user === undefined){
            navigation.navigate('Welcome');
        }
    }, [user,userError]);

    return <SafeAreaView style={styles.container}>
        <Text style={TextStyles.h3}>Account</Text>
            <View style={styles.body}>
        <Svg height='160' width='160'>
        <Circle cx='80' cy='80' r='75' fill='grey'/>
        </Svg>
            <Text style={styles.name}>{user?.name}</Text>
        <TouchableOpacity activeOpacity={0.6} onPress={()=>{}}>
            <View style={styles.editProfileButton}>
                <Icon name="edit" size={24} color={Colors.secondary}></Icon>
        <Text style={styles.editProfileButtonText}>Edit profile</Text>
            </View>
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.6} onPress={()=>dispatch(logoutUser())}>
            <View style={styles.logoutButton}>
                <Icon name="logout" size={24} color='white'></Icon>
        <Text style={styles.logoutButtonText}>Logout</Text>
            </View>
        </TouchableOpacity>
            </View>
    </SafeAreaView>
}

const styles = StyleSheet.create({
    container: {
        paddingHorizontal: 16,
        paddingTop: 24,
        
        
    },
    body:{
        alignItems: 'center',
        flexDirection:'column',
        paddingTop: 32,
    },
    logoutButton:{
        paddingVertical: 12,
        paddingHorizontal:36,
        borderRadius: 20,
        flexDirection: 'row',
        backgroundColor: Colors.red
    },
    editProfileButton:{
        marginBottom:24,
        paddingVertical: 12,
        paddingHorizontal:24,
        borderRadius: 20,
        borderColor: Colors.secondary,
        borderWidth: 1,
        flexDirection: 'row',
        justifyContent:'center'
        
    },
    logoutButtonText:{
        ...TextStyles.bodyLargeBold,
        color: 'white',
        paddingLeft: 12,
    },
    editProfileButtonText:{
        ...TextStyles.bodyLargeBold,
        color: Colors.secondary,
        paddingLeft: 12,
    },
    center:{
        paddingTop:32
    }, 
    name:{
        fontSize: 30,
        color:'#0A0A0A',
        paddingBottom: 48,

    }

});
export default AccountScreen