import React, { useState } from "react";
import { Button, TextInput, StyleSheet, View } from 'react-native';

const ItemTextInput = (props) => {
    const [inputText, setInputText] = useState("");

    const changeTextHandler = (text) => {
        setInputText(text);
    };

    return (
        <View style={styles.inputArea}>
            <View style={styles.itemTextInputArea}>
                <TextInput style={styles.itemTextInput}
                    placeholder="Enter text here"
                    onChangeText={changeTextHandler} />
            </View>
            <Button title="ADD" onPress={() => props.onAddItem(inputText)} />
        </View>
    );
};

const styles = StyleSheet.create({
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
});

export default ItemTextInput;
