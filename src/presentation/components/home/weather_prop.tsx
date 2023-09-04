import { StyleSheet, Text, View } from "react-native"
import Icon from "react-native-vector-icons/Ionicons";

export const WeatherProperty = (props:{type:string,value:string,icon:string, color:string})=>{
    return <View style={styles.container}>
        <Icon name={props.icon} color={props.color} size={36}/>
        <Text style={{color:props.color, ...styles.value}}>{props.value}</Text>
        <Text style={{color:props.color}}>{props.type}</Text>
    </View>
}

const styles = StyleSheet.create({
    container:{
        width:90,
        flexDirection:'column',
        alignItems:'center'
    },
    value:{
        paddingBottom:8,
        paddingTop: 8,
        fontWeight:'bold',
        fontSize: 18
    }
});