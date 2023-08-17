import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUsername = async (name?:string, image?:string) => {
    try {
      const user = {name: name, image:image};
      await AsyncStorage.setItem('user', JSON.stringify(user));
      return true;
    } catch (e) {
      return false;
    }
  };
export const deleteUsername = async () => {
    try {
      await AsyncStorage.removeItem('user');
      return true;
    } catch (e) {
      return false;
    }
  };

export const getUsername = async (): Promise<{name?:string, image?:string} | null> => {
    try {
      const value = await AsyncStorage.getItem('user');
      if(value !== null){
        return JSON.parse(value);
      } else {
        return null
      }
    } catch (e) {
     return null;
    }
  };


