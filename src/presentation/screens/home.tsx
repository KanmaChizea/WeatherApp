import React, { useEffect, useState } from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAppDispatch, useAppSelector } from "../../business_logic/redux/hooks";
import { homeWeatherErrorSelector, homeWeatherLoadingSelector, homeWeatherSelector } from "../../business_logic/redux/weather/home_weather";
import { getHomeWeather } from "../../business_logic/redux/weather/thunk/get_home_weather";
import { LoadingView } from "../components/home/loading_view";
import { ErrorView } from "../components/home/error_view";
import Geolocation from "@react-native-community/geolocation";
import { StyleSheet } from "react-native";
import Colors from "../styling/colors";
import Icon from "react-native-vector-icons/Ionicons";
import TextStyles from "../styling/textstyles";
import moment from "moment";
import { WeatherProperty } from "../components/home/weather_prop";
import { ShortFilledButton } from "../components/shared/button";
import { TouchableOpacity } from "react-native-gesture-handler";

function HomeScreen() : JSX.Element{
    const dispatch = useAppDispatch()
    const [textColor, setTextColor]= useState(Colors.foreground)
    const weather = useAppSelector(homeWeatherSelector)
    const isLoading = useAppSelector(homeWeatherLoadingSelector)
    const errorMessage = useAppSelector(homeWeatherErrorSelector)

    const getWeatherData = ()=>{
        
        Geolocation.requestAuthorization();
        Geolocation.getCurrentPosition(
        location  => {
            
           const coord = {
            lat: location.coords.latitude,
            lon: location.coords.longitude,
        }
        
        dispatch(getHomeWeather(coord));

        
    }
    );
    }

    const getBackgroudStyle =() => {
        if(weather?.weather == 'Sun'){
            return styles.containerSunny;
        }else if(weather?.weather == 'Rain'){
            return styles.containerRainy;
        } else if(weather?.weather == 'Clouds'){
            return styles.containerCloudy;
        }else{
            return styles.containerDefault;
        }
    }

    const getTodaysDate = ()=>{
        const date = new Date().getDate();
        const month = new Date().getMonth();
        const year = new Date().getFullYear();
        return moment(date+'/'+month+'/'+year, 'D/M/YYYY').format('dddd, D MMMM');
    }
    useEffect(() => {
        if(weather === null){
          getWeatherData()   
        }else{
               getWeatherTextColor() 
        }
    },[weather]);

   const getWeatherTextColor = ()=>{
    if(weather?.weather == 'Sun'){
      setTextColor(Colors.sunny);
    }else if(weather?.weather == 'Rain'){
        return setTextColor(Colors.rain);
    } else if(weather?.weather == 'Clouds'){
        return setTextColor(Colors.cloudy);
    }else{
        return setTextColor(Colors.background);
    }
   }



   {return isLoading ? <LoadingView loadingMessage='Fetching weather information'/>
     : typeof errorMessage === 'string' ? <ErrorView errorMessage={errorMessage} retryFunction={()=>getWeatherData()}/>
     : weather != null ? <SafeAreaView style={getBackgroudStyle()}>
        <View style={{alignItems:'center'}}> 
            <Text style={TextStyles.h1}>{weather?.timezone}</Text>
            <View style={styles.date}>
                <Text style={{...TextStyles.bodySmall,color:textColor}}>{getTodaysDate()}</Text>
            </View>
            <Text style={TextStyles.h4}>{weather?.weather}</Text>
            <Text style={styles.temperature}>{weather?.temperature + '°'}</Text>
            <View style={{alignSelf:'flex-start', paddingBottom: 24}}>
                <Text style={styles.summary}>Daily Summary</Text>
                <Text style={TextStyles.bodySmallMedium}>{'Now it seems like ' + weather?.feelsLike + '°, in fact ' + weather?.temperature+ '°'}</Text>
                <Text style={TextStyles.bodySmallMedium}>{weather!.summary.charAt(0).toUpperCase() + weather!.summary.slice(1)}</Text>
                <Text style={TextStyles.bodySmallMedium}>{'The temperature is felt in the range from '+weather?.temperatureRange }</Text>
            </View>
            <View style={styles.weatherProperties}>
                <WeatherProperty type="Wind" value={weather.wind + 'km/h'} icon="menu-outline"  color={textColor}/>
                <WeatherProperty type="Humidity" value={weather.humidity +'%'} color={textColor} icon="rose-outline"/>
                <WeatherProperty type="Visibility" value={weather.visibility + 'km'} color={textColor} icon="eye-outline"/>
            </View>
        </View>
        <ShortFilledButton label="Browse Locations" isActive={true} isLoading={false} onPress={()=>{}}/>
    </SafeAreaView> : <View/>} 
}

const styles = StyleSheet.create({
    containerSunny:{
        backgroundColor:Colors.sunny,
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingHorizontal:16,
        paddingVertical:24,
        justifyContent:'space-between'
    },
    containerCloudy:{
        backgroundColor: Colors.cloudy,
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingHorizontal:16,
        paddingVertical:24,
        justifyContent:'space-between'
    },
    containerRainy:{
        backgroundColor: Colors.rain,
        flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingHorizontal:16,
        paddingVertical:24,
        justifyContent:'space-between'
    }, 
    containerDefault:{
         flex:1,
        flexDirection:'column',
        alignItems:'center',
        paddingHorizontal:16,
        paddingVertical:24,
        justifyContent:'space-between'
    },
    date:{
        backgroundColor: Colors.foreground,
        paddingVertical:8,
        paddingHorizontal:16,
        borderRadius:30,
        marginBottom: 12,
        marginTop:20
    },
    temperature:{
        paddingBottom: 16,
        fontWeight:'900',
        fontSize:100,
        color: Colors.foreground,
    },
    summary:{
        paddingBottom:8,
        ...TextStyles.h4
    },
    weatherProperties:{
        flexDirection:'row',
        alignSelf:'stretch',
        justifyContent:'space-between',
        paddingHorizontal:16,
        paddingTop: 24,
        paddingBottom: 16,
        backgroundColor: Colors.foreground,
        marginTop:20,
        borderRadius: 16,
        marginBottom:42,
    }
});
export default HomeScreen