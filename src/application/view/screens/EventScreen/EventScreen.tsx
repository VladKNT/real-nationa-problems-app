import React, { Component } from "react";
import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import _ from 'lodash';
import moment from 'moment';

import { IReducerStates } from "../../../data/store/rootReducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { getEvent } from "../../../data/store/event/eventActions";

import URLS from "../../../../constants/urls";
import { IEvent } from "../../../../constants/types/event";
import STRINGS from "../../../../constants/strings";
import styles from "./Styles";
import UserAvatar from "../../components/UserAvatar/UserAvatar";
import {HiglightButton} from "../../components/common";

interface IProps {
  navigation: any;
  event: IEvent;
  loading: boolean;
  error: string;
  getEvent(id: string): void;
}

interface IState {

}

class EventScreen extends Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);
  };

  componentDidMount() {
    const { navigation, getEvent } = this.props;
    const id = navigation.getParam("id");

    getEvent(id);

    // navigation.setParams({
    //   onSavePressed: this.onSavePressed
    // });
  };

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: STRINGS.EVENT,

    // headerRight: (
    //   <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam("onSavePressed")}>
    //     <Icon name={"md-checkmark"} size={25} color={COLORS.HIGHLIGHT}/>
    //   </TouchableOpacity>
    // )
  });

  onShowMap = () => {
    const { navigation } = this.props;

    navigation.navigate("MapScreen", { showMode: true });
  };

  renderParticipants = () => {
    const { participants } = this.props.event;

    return _.map(participants, (participant) => {
      return (
        <UserAvatar
          size={70}
          key={participant.id}
          style={styles.participantAvatar}
          uri={`${URLS.ROOT_URL}${participant.userProfile.profilePhoto}`}/>
      )
    })
  };

  renderDate = () => {
    const { dateStart } = this.props.event;
    const date =  moment(parseInt(dateStart)).format("MMMM Do, dddd");

    return (
      <Text style={styles.infoText}>
        {STRINGS.WHEN}: {date}
      </Text>
    )
  };

  renderTime = () => {
    const { dateStart, dateEnd } = this.props.event;
    const start = moment(parseInt(dateStart)).format("h:mm a") ;
    const end = moment(parseInt(dateEnd)).format("h:mm a");

    return (
      <Text style={styles.infoText}>
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
            {this.renderParticipants()}
            {this.renderParticipants()}
            {this.renderParticipants()}
            {this.renderParticipants()}
            {this.renderParticipants()}
            {this.renderParticipants()}
            {this.renderParticipants()}
            {this.renderParticipants()}
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

          {this.renderDate()}
          {this.renderTime()}

          <HiglightButton onPress={this.onShowMap} style={styles.mapButton}>
            { STRINGS.SHOW_ON_MAP }
          </HiglightButton>
        </View>
      </ScrollView>
    )
  }
}


const mapStateToProps = (state: IReducerStates) => {
  const { event, loading, error } = state.eventReducer;
  return {
    event,
    loading,
    error
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getEvent: (id: string) => dispatch(getEvent(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(EventScreen);
