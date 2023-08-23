import { TouchableOpacity, View } from "react-native";
import { BeeAvatar, CritterAvatar, DogAvatar, FrogAvatar, HippoAvatar, PigAvatar } from "../../../../assets";

const DisplayAvatar =({name, size, x}:{name:string, size:number, x?:number})=> {
    switch(name){
        case 'pig':
            return <PigAvatar height={size} width={size} x={x} y={x}/>
        case 'bee':
            return <BeeAvatar height={size -20} width={size}  x={x} y={x}/>
        case 'critter':
            return <CritterAvatar height={size-20} width={size}  x={x} y={x}/>
        case 'hippo':
            return <HippoAvatar height={size -20} width={size}  x={x} y={x}/>
        case 'dog':
            return <DogAvatar height={size-10} width={size}  x={x} y={x}/>
        case 'frog':
            return <FrogAvatar height={size} width={size}  x={x} y={x}/>
        default:
            return <View/>

    }
}

export default DisplayAvatar