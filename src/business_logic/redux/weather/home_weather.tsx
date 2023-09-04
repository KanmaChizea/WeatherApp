import { createSelector, createSlice } from "@reduxjs/toolkit"
import { getHomeWeather } from "./thunk/get_home_weather"
import { RootState } from "../store"

export interface Coordinates {
    lat:number,
    lon:number
}

export interface Weather{
    timezone:string,
    temperature: string,
    wind: string,
    humidity: string,
    visibility: string
    weather: string,
    feelsLike: string,
    temperatureRange: string,
    summary:string

}

export interface HomeWeatherState{
    weather: Weather|null,
    loading:boolean,
    error?:string
}

const initialState : HomeWeatherState ={
    weather:null,
    loading:false
}

export const homeWeatherSlice = createSlice({
    name:'home weather',
    initialState,
    reducers:{},
    extraReducers: (builder)=>{
        builder.addCase(getHomeWeather.fulfilled, (state, action)=> {
            state.loading = false;
            state.weather = action.payload.weather;
         

        });
        builder.addCase(getHomeWeather.pending, (state, action)=> {
            state.loading = true;
        });
        builder.addCase(getHomeWeather.rejected, (state, action)=> {
            state.loading = false;
            state.error = action.payload?.errorMessage;
        });
    }
})

export const homeWeatherSelector = (state : RootState)=>state.homeWeather.weather
export const homeWeatherLoadingSelector = (state : RootState)=>state.homeWeather.loading
export const homeWeatherErrorSelector = (state : RootState)=>state.homeWeather.error

export default homeWeatherSlice.reducer