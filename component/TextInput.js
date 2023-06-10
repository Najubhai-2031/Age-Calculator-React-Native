import React from 'react';
import { StyleSheet, TextInput } from 'react-native';

const TextInputComponent = (props) => {
    const { placeholder, keyboardType, value, onChangeText, maxLength } = props
    return (
        <TextInput
            style={styles.input}
            placeholder={placeholder}
            keyboardType={keyboardType}
            value={value}
            onChangeText={onChangeText}
            maxLength={maxLength}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        width: "40%",
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginHorizontal: 5,
        paddingHorizontal: 10,
        borderRadius: 5
    },
});

export default TextInputComponent;
