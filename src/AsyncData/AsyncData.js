import AsyncStorage from '@react-native-community/async-storage';

const isUserLoggedIn = "ISUSERLOGGEDIN";
const userToken = "USERTOKEN";
const deviceToken = "DEVICETOKEN";

setData = async (key, value) => {
    try {
        await AsyncStorage.setItem(key, value);
    } catch (error) {
        console.log(`Error to set ${key}`)
    }
}

getData = async (key) => {
    try {
        const value = await AsyncStorage.getItem(key);
        if (value !== null) {
            // We have data!!
            return value
        }
    } catch (error) {
        console.log(`Error to get ${key}`)
    }
    return null
}

export const _clearAsyncStorage = async () => {
    AsyncStorage.clear();
};

export const _setUserLoggedIn = async (value) => {
    await setData(isUserLoggedIn, JSON.stringify(value))
};

export const _getUserLoggedIn = async () => {
    const value =  await getData(isUserLoggedIn)
    if(value==null){
        return false
    }
    return JSON.parse(value)
};

export const _setUserToken = async (token) => {
    await setData(userToken, token)
};

export const _getUserToken = async () => {
    return await getData(userToken)
};

export const _setDeviceToken = async (token) => {
    await setData(deviceToken, token)
};

export const _getDeviceToken = async () => {
    return await getData(deviceToken)
};
