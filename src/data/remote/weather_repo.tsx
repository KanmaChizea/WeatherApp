import { Coordinates, Weather } from "../../business_logic/redux/weather/home_weather";
import config from "../../../config";

export const getWeatherInfo = async(cord: Coordinates)=> {      
   try{
      var requestOptions = {
         method: 'GET',
         redirect: 'follow'
       };
       const response = await fetch("https://api.openweathermap.org/data/2.5/weather?appid=" + config.WEATHER_API_KEY +"&lat="+cord.lat+"&lon="+cord.lon, requestOptions);
       const data = await response.json()
       return data;
   } catch(e){
      console.log(e);     
      throw e;
   }
        
         }  ;

export const getLocationName = async (cord:Coordinates)=> {

}
export const covertJsonResponseToWeather : (json:any)=> Weather = (json:any) => {
   return {
      timezone: json.name,
      temperature: (json.main.temp - 273.15).toFixed(1),
      wind: (json.wind.deg * 3.6).toFixed(0),
      humidity:json.main.humidity,
      visibility: (json.visibility /1000).toFixed(0),
      weather: json.weather[0].main,
      feelsLike: (json.main.feels_like - 273.15).toFixed(1),
      summary: json.weather[0].description,
      temperatureRange: ((json.main.temp_min - 273.15).toFixed(1)) + '° to '+ ((json.main.temp_max - 273.15).toFixed(1)) +'°'
   }
}