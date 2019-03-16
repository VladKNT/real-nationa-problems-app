import React, { Component } from "react";
import { View, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import MapView, {LatLng, Marker} from "react-native-maps";
import _ from "lodash";

import { IReducerStates } from "../../../data/store/rootReducer";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { setSaveEventData } from "../../../data/store/event/eventActions";
import { ISaveEventParams, IEvent } from "../../../../constants/types/event";

import COLORS from "../../../../constants/colors";
import STRINGS from "../../../../constants/strings";
import styles from "./MapScreen.Styles";

interface IProps {
  navigation: any;
  saveEvent: LatLng;
  event: IEvent;
  setSaveEventDate(saveEvent: ISaveEventParams): void;
}

interface IState {
  coordinate: LatLng;
}

class MapScreen extends Component <IProps, IState> {
  constructor(props: IProps) {
    super(props);
    const showMode = props.navigation.getParam('showMode');
    const { longitude, latitude } = showMode ? props.event :  props.saveEvent;

    this.state = {
      coordinate: {
        longitude,
        latitude
      }
    }
  };

  static getDerivedStateFromProps(props: IProps) {
    const showMode = props.navigation.getParam('showMode');
    const { longitude, latitude } = showMode ? props.event :  props.saveEvent;

    return {
      coordinate: {
        longitude,
        latitude
      }
    }
  }

  isShowMode = () => {
    return this.props.navigation.getParam('showMode');
  };

  onSavePressed = () => {
    const { navigation, setSaveEventDate } = this.props;
    const { coordinate: { latitude, longitude } } = this.state;

    setSaveEventDate({ latitude, longitude });
    navigation.goBack();
  };

  componentDidMount() {
    const { navigation } = this.props;

    if (!this.isShowMode()) {
      navigation.setParams({
        onSavePressed: this.onSavePressed
      });
    }
  };

  static navigationOptions = ({ navigation }: any) => {
    if (navigation.getParam('showMode')) {
      return {
        headerTitle: STRINGS.PACE_ON_MAP
      }
    }

    return {
      headerTitle: STRINGS.ADD_PLACE,

      headerRight: (
        <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam("onSavePressed")}>
          <Icon name={"md-checkmark"} size={25} color={COLORS.HIGHLIGHT}/>
        </TouchableOpacity>
      )
    }
  };

  onMapPressed = (e: any) => {
    if (!this.isShowMode()) {
      const { longitude, latitude } = e.nativeEvent.coordinate;

      this.setState({ coordinate: { longitude, latitude }});
    }
  };

  renderMarker = () => {
    const { coordinate } = this.state;

    return (
      <Marker coordinate={coordinate} />
    )
  };

  render() {
    const { coordinate } = this.state;

    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 47.839045,
            longitude: 35.139614,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          ref={map => { this.map = map }}
          onPress={this.onMapPressed}
          style={styles.map}>
          {_.some(coordinate) && this.renderMarker()}
        </MapView>
      </View>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  const { event, saveEvent } = state.eventReducer;
  return {
    saveEvent,
    event
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSaveEventDate: (saveEvent: LatLng) => dispatch(setSaveEventData(saveEvent)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);
