import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

export interface Props {
    name: string,
    age?: number
}

export interface State {
    country: string
}

export default class App extends Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            country: ''
        }
    }



    render() {
        return (
            <View style={styles.container}>
                <Text>Open up App.js to start working on your app!</Text>
                <Text>Changes you make will automatically reload.</Text>
                <Text>Shake your phone to open the developer menu.</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
