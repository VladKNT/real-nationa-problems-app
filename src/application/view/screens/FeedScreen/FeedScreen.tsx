import React, { Component } from "react";
import { View, FlatList } from "react-native";
import EventCard from "../../components/EventCard/EventCard";
import styles from "./Styles";
import { IReducerStates } from "../../../data/store/rootReducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getEvents } from "../../../data/store/event/eventActions";
import { IEvent } from "../../../../constants/types/event";

interface IProps {
  navigation: any;
  getEvents(): void;
  events: IEvent[];
}

interface IState {

}

class FeedScreen extends Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);
  }

  componentDidMount() {
    this.props.getEvents();
  }

  onCardPressed = (id: string) => {
    this.props.navigation.navigate("EventScreen", { id });
  };

  renderEvent = ({ item: event }: { item: IEvent }) => {
    return <EventCard event={event} onPress={this.onCardPressed} />
  };

  render() {
    const { events } = this.props;

    return (
      <View style={styles.container}>
        <FlatList
          data={events}
          renderItem={this.renderEvent}
          keyExtractor={ (item) => item.id }/>
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
