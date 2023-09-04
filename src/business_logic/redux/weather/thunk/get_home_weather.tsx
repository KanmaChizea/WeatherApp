import { createAsyncThunk } from "@reduxjs/toolkit";
import { AppError } from "../../../interfaces/errors";
import { Coordinates, Weather } from "../home_weather";
import { covertJsonResponseToWeather, getWeatherInfo } from "../../../../data/remote/weather_repo";
import Geolocation from "@react-native-community/geolocation";

export const getHomeWeather = createAsyncThunk<{weather:Weather, place:string}, Coordinates,{rejectValue: AppError, rejectMeta: void, fulfillMeta: void}>(
    'weather/getWeather',
    async(coord, thunkApi)=>{
        try{
        const result = await getWeatherInfo(coord); 
           
        const weather = covertJsonResponseToWeather(result);
        return thunkApi.fulfillWithValue({weather: weather, place:''});

        }catch(e){
            console.log(e);
            
            return thunkApi.rejectWithValue(new AppError('Could not get current weather information'))
        }
    }
)