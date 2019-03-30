import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import _ from 'lodash';
import moment from 'moment';

import { IReducerStates } from "../../../data/store/rootReducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getEvent, followEvent, subscribedFollowEvent } from "../../../data/store/event/eventActions";

import EventResolver from "../../../../api/graphql/relsolvers/event";

import UserAvatar from "../../components/UserAvatar/UserAvatar.Component";
import { HighlightButton } from "../../components/common";
import URLS from "../../../../constants/urls";
import { IEvent } from "../../../../constants/types/event";
import STRINGS from "../../../../constants/strings";
import COLORS from "../../../../constants/colors";
import styles from "./EventScreen.Styles";

interface IProps {
  navigation: any;
  event: IEvent;
  loading: boolean;
  error: string;
  userId: string;
  getEvent(id: string): void;
  followEvent(id: string): void;
  subscribedFollowEvent(event: IEvent): void;
}

interface IState {

}

class EventScreen extends Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);

    this.subscriprionToFollowEvent = null;
  };

  componentDidMount() {
    const { navigation, getEvent } = this.props;
    const id = navigation.getParam("id");
    this.subscriprionToFollowEvent = EventResolver.followEventSubscription(id, this.subscribedFollowEvent);

    getEvent(id);

    navigation.setParams({
      onShowMap: this.onShowMap
    });
  };

  componentWillUnmount(): void {
    if (this.subscriprionToEvents.unsubscribe) {
      this.subscriprionToEvents.unsubscribe();
    }
  }

  subscribedFollowEvent = (event: IEvent) => {
    const { subscribedFollowEvent } = this.props;

    subscribedFollowEvent(event);
  };

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: STRINGS.EVENT,

    headerRight: (
      <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam("onShowMap")}>
        <Icon name={"ios-map"} size={30} color={COLORS.TEXT}/>
      </TouchableOpacity>
    )
  });

  isFollowed = () => {
    const { event: { participants }, userId } = this.props;
    return _.find(participants, _.matchesProperty('id', userId));
  };

  followEvent = () => {
    const {
      followEvent,
      event: {
        id
      }
    } = this.props;
    followEvent(id);
  };

  onShowMap = () => {
    const { navigation } = this.props;

    navigation.navigate("MapScreen", { showMode: true });
  };

  onAvatarPressed = (id: string) => {
    const { navigation } = this.props;

    navigation.navigate("ProfileScreen", { id });
  };

  renderParticipants = () => {
    const { participants } = this.props.event;

    return _.map(participants, (participant) => {
      return (
        <TouchableOpacity
          key={participant.id}
          style={styles.participantAvatar}
          onPress={() => this.onAvatarPressed(participant.id)}>
          <UserAvatar
            size={70}
            uri={participant.userProfile.profilePhoto} />
        </TouchableOpacity>
      )
    })
  };

  renderDate = () => {
    const { dateStart } = this.props.event;
    const date =  moment(parseInt(dateStart)).format("MMMM Do, dddd");

    return (
      <Text style={styles.timeText}>
        {STRINGS.WHEN}: {date}
      </Text>
    )
  };

  renderTime = () => {
    const { dateStart, dateEnd } = this.props.event;
    const start = moment(parseInt(dateStart)).format("h:mm a") ;
    const end = moment(parseInt(dateEnd)).format("h:mm a");

    return (
      <Text style={styles.timeText}>
        {STRINGS.TIME}: {start} - {end}
      </Text>
    )
  };

  render() {
    const {
      loading,
      event: {
        name,
        description,
        photo,
      }
    } = this.props;

    if (loading) {
      return (
        <View>
          <Text>Loading...</Text>
        </View>
      )
    }

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.participantsContainer}>
          <ScrollView
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {this.renderParticipants()}
          </ScrollView>
        </View>

        <View style={styles.imageContainer}>
          <Image source={{ uri:  `${URLS.ROOT_URL}${photo}` }} style={styles.image}/>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.name}>
            {name}
          </Text>

          <Text style={styles.infoText}>
            {description}
          </Text>

          <View style={styles.timeContainer}>
            {this.renderDate()}
            {this.renderTime()}
          </View>

          <HighlightButton
            onPress={this.followEvent}
            style={styles.checkButton}
            textStyle={styles.checkButtonText}>
            {this.isFollowed() ? STRINGS.CHECK_OUT : STRINGS.CHECK_IN }
          </HighlightButton>
        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = (state: IReducerStates) => {
  const { event, loading, error } = state.eventReducer;
  const {
    user: {
      id: userId
    }
  } = state.userProfileReducer;

  return {
    event,
    loading,
    error,
    userId
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getEvent: (id: string) => dispatch(getEvent(id)),
    followEvent: (id: string) => dispatch(followEvent(id)),
    subscribedFollowEvent: (event: IEvent) => dispatch(subscribedFollowEvent(event))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
