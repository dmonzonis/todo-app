import React, { useState } from 'react';
import { StyleSheet, View, Text, FlatList } from 'react-native';

import ItemTextInput from "./components/ItemTextInput"
import ListItem from "./components/ListItem"

import { storeItems, retrieveItems } from "./utils/Storage"

export default function App() {
    const [items, setItems] = useState([]);
    const [idCounter, setIdCounter] = useState(0);
    const [ready, setReady] = useState(false);

    const addNewItem = (inputText) => {
        setItems(items => [...items, { key: idCounter.toString(), value: inputText, done: false }]);
        setIdCounter(idCounter + 1);
        storeItems(items, idCounter);
    }

    const toggleItemStatus = (id) => {
        const itemsUpdated = items.slice();
        itemsUpdated[id].done = !itemsUpdated[id].done;
        setItems(items => itemsUpdated);
        storeItems(items, idCounter);
    }

    const removeItem = (id) => {
        setItems(items => items.filter(item => item.key !== id));
        storeItems(items, idCounter);
    }

    if (!ready) {
        retrieveItems().then((loadedData) => {
            setIdCounter(loadedData.idCounter);
            setItems(loadedData.items);
            setReady(true);
        });
        return (
            <View style={styles.loadingRoot}>
                <Text style={styles.loadingText}>Loading...</Text>
            </View>
        );
    }

    return (
        <View style={styles.root}>
            <ItemTextInput onAddItem={addNewItem} />

            <FlatList data={items} renderItem={itemData => (
                <ListItem
                    id={itemData.item.key}
                    itemText={itemData.item.value}
                    status={itemData.item.done}
                    onItemPress={toggleItemStatus}
                    onItemLongPress={removeItem} />
            )} />
        </View>
    );
}

const styles = StyleSheet.create({
    root: {
        paddingTop: 60,
        paddingHorizontal: 20,
    },
    loadingRoot: {
        flex: 1,
        justifyContent: "center",
    },
    loadingText: {
        alignSelf: "center",
    }
});
