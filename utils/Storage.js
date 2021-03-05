import AsyncStorage from '@react-native-async-storage/async-storage';


const ITEM_DATA_KEY = "@item_data"


const storeItems = async (items, idCounter) => {
    try {
        const jsonData = JSON.stringify({ idCounter: idCounter, items: items });
        await AsyncStorage.setItem(ITEM_DATA_KEY, jsonData);
    } catch (e) {
        console.error("Error saving data to device storage");
    }
}

const retrieveItems = async () => {
    try {
        const jsonData = await AsyncStorage.getItem(ITEM_DATA_KEY);
        if (jsonData !== null) {
            return JSON.parse(jsonData);
        }
        return null;
    } catch (e) {
        console.error("Error retrieving data from device storage");
    }
}

export { storeItems, retrieveItems }
