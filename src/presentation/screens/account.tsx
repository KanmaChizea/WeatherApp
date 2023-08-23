import React, { useEffect, useState } from "react";
import { Keyboard, Modal, SafeAreaView, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
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
import EditProfile from "../components/accounts/edit_profile";
import DisplayAvatar from "../components/accounts/display_avatar";

function AccountScreen({navigation} : WeatherAppScreenNavigationProp) : JSX.Element{

    const [modalVisible, setModalVisible] = useState(false);
    const user = useAppSelector(selectUser);
    const userError = useAppSelector(selectUserError);
    const dispatch = useAppDispatch()
    

    return <SafeAreaView style={styles.container}>
        <Modal 
        visible={modalVisible}
        animationType="fade"
        transparent={true}
        onRequestClose={() => setModalVisible(!modalVisible)}
        >
            <TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
            <View style={styles.modalOverlay} />
          </TouchableWithoutFeedback>
                <EditProfile closeModal={()=> {
                    setModalVisible(false);
                    Keyboard.dismiss();
                    }}/>
        </Modal>
            
        <Text style={TextStyles.h3}>Account</Text>
        <View style={styles.body}>
            <View style={styles.circle}>
                    <DisplayAvatar name={user?.image ?? ''} size={140} x={0}/>
                    
            </View>
            <Text style={styles.name}>{user?.name}</Text>
            <TouchableOpacity activeOpacity={0.6} onPress={()=>setModalVisible(true)}>
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

    },
    modalOverlay: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(0,0,0,0.5)'
      },
      circle:{
        height: 150,
        width: 150,
        borderRadius: 75,
        backgroundColor:'white',
        justifyContent:'center',
        alignItems:'center',
        marginBottom:8
      }

});
export default AccountScreen