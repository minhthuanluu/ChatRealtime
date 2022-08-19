import AsyncStorage from "@react-native-async-storage/async-storage";

export const storageData = async (payload) => {
    const { id, value } = payload;
    try {
        await AsyncStorage.setItem(
            id,
            JSON.stringify(value)
        );
    } catch (error) { console.log('luu tru loi') }
}

export const retriveData = async (payload) => {
    try {
        var value = await AsyncStorage.getItem(payload);
        if (value != null) {
            return JSON.parse(value);
        }
    } catch (error) {
        console.log('lay du lieu luu tru loi')
    }
}