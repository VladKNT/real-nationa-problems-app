import React, { Component } from 'react';
import { View, ScrollView, FlatList, Text, TouchableOpacity } from 'react-native';
import EventCard from '../../components/EventCard/EventCard';
import styles from './Styles';
import { IReducerStates } from '../../redux/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getEvents } from '../../redux/actions/ActionCreators';
import { IEvent } from '../../redux/reducers/eventReducer';

interface Props {
  navigation: any,
  getEvents: () => void,
  events: IEvent[]
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

  renderEvent = ({ item: event }: { item: IEvent }) => {
    return <EventCard event={event}/>
  };

  render() {
    const { events } = this.props;

    return (
      <View style={styles.container}>
        <FlatList data={events} renderItem={this.renderEvent}/>
      </View>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  const { events, loading, error } = state.eventReducer;
  return {
    events,
    loading,
    error
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getEvents: () => dispatch(getEvents())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
