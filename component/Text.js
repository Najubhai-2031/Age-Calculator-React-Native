import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

const TextComponent = (props) => {
    const { name, ageResult, info, title } = props
    if (name == 'extraInfo') {
        return (
            <View style={styles.extraResultText}>
                <Text style={styles.extraTextResult}>{title}</Text>
                <Text style={styles.extraTextResult}>{ageResult ? '00' : info}</Text>
            </View>
        );
    } else if (name == 'result') {
        return (
            <View style={styles.displayResult}>
                <Text style={styles.resultTextHeading}>{title}</Text>
                <Text style={styles.resultText}>{ageResult ? '00' : info}</Text>
            </View>
        )
    } else if (name == 'Heading') {
        return (
            <Text style={styles.dates}>{title}</Text>
        )
    }
    else if (name == 'button') {
        return (
            <Text style={title == 'Clear' ? styles.clearButtonText : styles.calculateButtonText}>{title}</Text>
        )
    }else{
        return (
            <Text style={styles.error}>{info}</Text>
        )
    }
};

const styles = StyleSheet.create({
    extraTextResult: {
        fontSize: 16
    },
    extraResultText: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    displayResult: {
        margin: 16,
        top: 15,
        right: 10
    },
    resultText: {
        padding: 6,
        fontSize: 26
    },
    resultTextHeading: {
        fontSize: 18,
        color: '#1B6DC1'
    },
    dates: {
        fontSize: 20
    },
    calculateButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center'
    },
    clearButtonText: {
        color: 'black',
        fontWeight: 'bold',
        fontSize: 20,
        textAlign: 'center',
        justifyContent: 'center'
    },
    error: {
        color: 'red',
        fontSize: 16,
        marginTop: 10
      },
});

export default TextComponent;
