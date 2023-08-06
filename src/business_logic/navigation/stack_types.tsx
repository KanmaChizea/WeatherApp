import { NativeStackNavigationProp } from "@react-navigation/native-stack";


export type RootStackParamList = {
  Welcome: undefined;
  WeatherApp: undefined;
};

export type WelcomeScreenNavigationProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'WeatherApp'>;
};
export type WeatherAppScreenNavigationProp = {
  navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'>;
};