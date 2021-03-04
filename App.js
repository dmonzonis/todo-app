import React, { useState } from 'react';
import { StyleSheet, View, Button, FlatList } from 'react-native';
import ItemTextInput from "./components/ItemTextInput"
import ListItem from "./components/ListItem"

export default function App() {
    const [items, setItems] = useState([]);
    const [itemDoneStatuses, setItemDoneStatuses] = useState([]);  // true/false depending on whether it is done or not

    

    const addItemHandler = (inputText) => {
        const newKey = items.length + 1;
        setItems(items => [...items, { key: newKey.toString(), value: inputText }]);
        setItemDoneStatuses(items => [...itemDoneStatuses, false]);
    };

    const itemPressHandler = (idx) => {
        const itemDoneStatusesUpdated = itemDoneStatuses.slice();
        itemDoneStatusesUpdated[idx] = !itemDoneStatusesUpdated[idx];
        setItemDoneStatuses(itemDoneStatuses => itemDoneStatusesUpdated);
    };

    return (
        <View style={styles.root}>
            <ItemTextInput onAddItem={addItemHandler} />

            <FlatList data={items} renderItem={itemData => (
                <ListItem
                    idx={itemData.index}
                    itemText={itemData.item.value}
                    status={itemDoneStatuses[itemData.index]}
                    itemPressHandler={itemPressHandler} />
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
