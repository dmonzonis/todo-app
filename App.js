import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, View, Button, ScrollView } from 'react-native';

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
    return (
        <Text style={styles.listItem}>{props.itemText}</Text>
    );
}

export default function App() {
    const [inputText, setInputText] = useState("");
    const [items, setItems] = useState([]);

    const changeTextHandler = (text) => {
        setInputText(text);
    };

    const addItemHandler = () => {
        setItems(items => [...items, inputText]);
    };

    return (
        <View style={styles.root}>
            <View style={styles.inputArea}>
                <ItemTextInput changeTextHandler={changeTextHandler} />
                <Button title="ADD" onPress={addItemHandler} />
            </View>

            <ScrollView>
                {items.map((item, idx) => <ListItem key={idx} itemText={item} />)}
            </ScrollView>
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
    }
});
