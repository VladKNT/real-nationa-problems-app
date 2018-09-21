import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { routeCurrentUser } from '../../actions/ActionCreators'
import { Dispatch } from 'redux';
import {IReducerStates} from '../../reducers';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export interface Props {
    userProfile: any,
    routeCurrentUser: () => void
}

export interface State {
    country: string
}

class SplashScreen extends Component <Props, State> {
    constructor(props: Props) {
        super(props);

        this.state = {
            country: ''
        }
    }

    componentDidMount() {
        this.props.routeCurrentUser();
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Hello</Text>
            </View>
        );
    }
}

const mapStateToProps = (state: IReducerStates) => {
    return {
        userProfile: state.userProfileReducer.userProfile
    };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
    return {
        routeCurrentUser: () => dispatch(routeCurrentUser())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
