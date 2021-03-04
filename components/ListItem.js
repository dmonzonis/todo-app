import React from "react";
import { Text, Pressable, StyleSheet } from 'react-native';


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
};

const styles = StyleSheet.create({
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

export default ListItem;
