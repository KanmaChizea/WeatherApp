import AsyncStorage from '@react-native-async-storage/async-storage';

export const storeUsername = async (name:string) => {
    try {
      await AsyncStorage.setItem('username', name);
      return true;
    } catch (e) {
      return false;
    }
  };
export const deleteUsername = async (name:string) => {
    try {
      await AsyncStorage.removeItem('username');
      return true;
    } catch (e) {
      return false;
    }
  };

export const getUsername = async (): Promise<string | null> => {
    try {
      const value = await AsyncStorage.getItem('username');
      return value;     
    } catch (e) {
     return null;
    }
  };


