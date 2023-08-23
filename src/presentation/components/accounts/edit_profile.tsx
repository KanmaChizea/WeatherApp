import { Dimensions, ScrollView, StyleSheet, Text, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import InputField from "../shared/input_field";
import { useAppDispatch, useAppSelector } from "../../../business_logic/redux/hooks";
import { UpdateUser, selectUser } from "../../../business_logic/redux/user/user";
import { useState } from "react";
import Colors from "../../styling/colors";
import TextStyles from "../../styling/textstyles";
import { FlatList } from "react-native-gesture-handler";
import DisplayAvatar from "./display_avatar";
import { updateUser } from "../../../business_logic/redux/user/thunk/update_user";

function EditProfile({closeModal}:{closeModal: () => void}):JSX.Element{
    const size =  (Dimensions.get('window').width - 136)/3;

    const dispatch = useAppDispatch();
    const user = useAppSelector(selectUser)
    const [name, useName] = useState<string>('');
    const [image, selectImage]  = useState<string>('');

    const avatars:{id:string, name:string}[] = [
        {id: '1', name: 'pig'},
        {id: '2', name: 'bee'},
        {id: '3', name: 'dog'},
        {id: '4', name: 'critter'},
        {id: '5', name: 'hippo'},
        {id: '6', name: 'frog'},
    ];

    const Item =({name}:{name:string})=> <TouchableOpacity onPress={()=>selectImage(name)}>
        <View style={[styles.avatar, image == name && styles.avatarSelected]}>
            <DisplayAvatar name={name} size={size}/>
        </View>
    </TouchableOpacity>

    return <View style={styles.centeredView}>
    <View style={styles.container}>
        <Text style={styles.label}>Select Avatar</Text>
        <FlatList
        data={avatars}
        renderItem={
            ({item}) => <Item name={item.name} />          
        }
        keyExtractor={item => item.id}
        numColumns={3}
        ItemSeparatorComponent={()=><View style={{padding: 8}}/>}
        />
        <View style={styles.spacing}/>
        <Text style={styles.label}>Name</Text>
        <InputField
        defaultValue={user?.name}
        placeholder="" 
        onChangeText={ (val)=>useName(val) }/>
        <TouchableOpacity
        activeOpacity={0.6} 
        onPress={()=>{
            const userUpdate : UpdateUser= {}
            if(name.length !== 0 &&  user?.name !== name){
                userUpdate.name = name;
            }
            if(image.length !== 0 && user?.image !== image){
                userUpdate.image = image;
            }
            dispatch(updateUser(userUpdate))
            closeModal()
        }}>

        <View style={styles.button}>
            <Text style={styles.buttonText}>Update</Text>
        </View>
        </TouchableOpacity>
    </View>
    </View>
       
}


const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        marginTop: 22,
      },
    container:{
        backgroundColor:'white',
        paddingHorizontal: 24,
        paddingVertical: 36,
        margin: 20,
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    button:{
        marginTop: 48,
        alignSelf: 'center',
        borderRadius:20,
        backgroundColor:Colors.primary,
        paddingVertical: 12,
        paddingHorizontal:36,
    },
    buttonText:{
        ...TextStyles.bodyLargeMedium,
        color:'white'
    },
    label:{
        ...TextStyles.bodySmall,
        marginBottom:4
    },
    avatar:{
        height: 90,
        width: (Dimensions.get('window').width - 136)/3 ,
        borderRadius:20,
        margin: 8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center' 
    },
    avatarSelected:{
        height: 90,
        width: (Dimensions.get('window').width - 136)/3,
        borderWidth:3,
        borderRadius:20,
        backgroundColor:'white',
        margin: 8,
        borderColor: Colors.primary,
        shadowColor: Colors.primary,
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 2,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center', 
    },
    spacing:{
        marginTop:24
    }
})
export default EditProfile;


