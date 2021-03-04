import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import ItemTextInput from "./components/ItemTextInput"
import ListItem from "./components/ListItem"

export default function App() {
    const [items, setItems] = useState([]);
    const [idCounter, setIdCounter] = useState(0);

    const addNewItem = (inputText) => {
        setItems(items => [...items, { key: idCounter.toString(), value: inputText, done: false }]);
        setIdCounter(idCounter + 1);
    };

    const toggleItemStatus = (id) => {
        const itemsUpdated = items.slice();
        itemsUpdated[id].done = !itemsUpdated[id].done;
        setItems(items => itemsUpdated);
    };

    const removeItem = (id) => {
        setItems(items => items.filter(item => item.key !== id));
    };

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
});
