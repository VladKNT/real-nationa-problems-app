import React, { Component } from 'react';
import { View, ScrollView, Text, TouchableOpacity } from 'react-native';
import EventCard from '../../components/EventCard/EventCard';
import styles from './Styles';
import { IReducerStates } from '../../redux/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getEvents } from '../../redux/actions/ActionCreators';

interface Props {
  navigation: any,
  getEvents: () => void
}

interface State {

}

class FeedScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <EventCard />
        <EventCard />
        <EventCard />
      </ScrollView>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  return {

  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getEvents: () => dispatch(getEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
