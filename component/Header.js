import React from 'react';
import { View, Text, StyleSheet, Button, Image } from 'react-native';

const HeaderComponent = () => {
  return (
    <View style={styles.headerContainer}>
      <View>
        <Text style={styles.menuIcon}></Text>
        <Text style={styles.menuIcon}></Text>
        <Text style={styles.menuIcon}></Text>
      </View>
      <Text style={styles.headerText}>Age Calculator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#1B6DC1',
    alignItems: 'center',
    width: '100%',
    padding: 10,
  },
  headerText: {
    color: 'white',
    fontSize: 25,
    fontWeight: 'bold',
    lineHeight: 50,
    margin: 5,
    marginLeft: 10
  },
  menuIcon: {
    width: 30,
    height: 4,
    backgroundColor: '#fff',
    margin: 3,
  },
});

export default HeaderComponent;
