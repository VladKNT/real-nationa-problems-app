import React, { Component } from "react";
import { View, FlatList } from "react-native";

import { Dispatch } from "redux";
import { connect } from "react-redux";
import { IReducerStates } from "../../../data/store/rootReducer";

import EventCardComponent from "../../components/EventCard/EventCard.Component";
import EventResolver from "../../../../api/graphql/relsolvers/event";
import { getEvents, subscribedEvent } from "../../../data/store/event/eventActions";
import { IEvent } from "../../../../constants/types/event";
import { IUser } from "../../../../constants/types/user";
import styles from "./FeedScreen.Styles";

interface IProps {
  navigation: any;
  events: IEvent[];
  user: IUser;
  getEvents(): void;
  subscribedEvent(event: IEvent): void;
}

interface IState {

}

class FeedScreen extends Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.subscriprionToEvents = null;
  }

  componentDidMount() {
    this.subscriprionToEvents = EventResolver.eventCreated(this.subscribedEvent);
    this.props.getEvents();
  }

  componentWillUnmount(): void {
    if (this.subscriprionToEvents) {
      this.subscriprionToEvents.unsubscribe();
    }
  }

  subscribedEvent = (event: IEvent) => {
    const {
      subscribedEvent,
      user: {
        id: userId
      }
    } = this.props;
    const {
      creator: {
        id: creatorId
      }
    } = event;

    if (userId != creatorId) {
      subscribedEvent(event);
    }
  };

  onCardPressed = (id: string) => {
    this.props.navigation.navigate("EventScreen", { id });
  };

  renderEvent = ({ item: event }: { item: IEvent }) => {
    return <EventCardComponent event={event} onPress={this.onCardPressed} />
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
  const { user } = state.userProfileReducer;
  return {
    events,
    loading,
    error,

    user
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getEvents: () => dispatch(getEvents()),
    subscribedEvent: (event: IEvent) => dispatch(subscribedEvent(event))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FeedScreen);
