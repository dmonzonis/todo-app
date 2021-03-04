import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, FlatList, Pressable } from 'react-native';

const ItemTextInput = (props) => {
    return (
        <View style={styles.itemTextInputArea}>
            <TextInput style={styles.itemTextInput}
                placeholder="Enter text here"
                onChangeText={props.changeTextHandler} />
        </View>
    );
}

const ListItem = (props) => {
    let textStyle = [styles.listItem];
    if (props.status) {
        textStyle.push(styles.listItemCrossed);
    }
    return (
        <Pressable onPress={() => props.itemPressHandler(props.idx)}>
            <Text style={textStyle}>{props.itemText}</Text>
        </Pressable>
    );
}

export default function App() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);
    const [itemDoneStatuses, setItemDoneStatuses] = useState([]);  // true/false depending on whether it is done or not

    const changeTextHandler = (text) => {
        setInputText(text);
    };

    const addItemHandler = () => {
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
            <View style={styles.inputArea}>
                <ItemTextInput changeTextHandler={changeTextHandler} />
                <Button title="ADD" onPress={addItemHandler} />
            </View>

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
    inputArea: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        alignContent: "center",
        marginBottom: 20,
    },
    itemTextInputArea: {
        width: "80%",
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
    },
    itemTextInput: {
        marginHorizontal: 10,
    },
    listItem: {
        paddingHorizontal: 15,
        marginVertical: 7,
        color: "black"
    },
    listItemCrossed: {
        textDecorationLine: "line-through",
        color: "grey",
    }
});
