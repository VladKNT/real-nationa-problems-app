import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native-maps';
import _ from 'lodash';

import { IReducerStates } from '../../redux/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { setSaveEventData } from '../../redux/actions/ActionCreators';
import { ISaveEventParameters } from '../../constants/types';

import COLORS from '../../constants/colors';
import STRINGS from '../../constants/strings';
import styles from './Styles';

interface Props {
  navigation: any,
  saveEvent: ISaveEventParameters,
  setSaveEventDate: (saveEvent: ISaveEventParameters) => void
}

interface State {
  coordinate: {
    longitude?: number | null,
    latitude?: number | null
  }
}

class MapScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);
    const { longitude, latitude } = props.saveEvent;

    this.state = {
      coordinate: {
        longitude,
        latitude
      }
    }
  };

  static getDerivedStateFromProps(props: Props, state: State) {
    const { longitude, latitude  } = props.saveEvent;

    return {
      coordinate: {
        longitude,
        latitude
      }
    }
  }

  onSavePressed = () => {
    const { navigation, setSaveEventDate } = this.props;

    setSaveEventDate(this.state.coordinate);
    navigation.goBack();
  };

  componentDidMount() {
    const { navigation } = this.props;
    navigation.setParams({
      onSavePressed: this.onSavePressed
    });
  };

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: STRINGS.ADD_PLACE,

    headerRight: (
      <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam('onSavePressed')}>
        <Icon name={'md-checkmark'} size={25} color={COLORS.HIGHLIGHT}/>
      </TouchableOpacity>
    )
  });

  onMapPressed = (e: any) => {
    const { longitude, latitude } = e.nativeEvent.coordinate;

    this.setState({ coordinate: { longitude, latitude }});
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
  return {
    saveEvent: state.eventReducer.saveEvent
  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    setSaveEventDate: (saveEvent: ISaveEventParameters) => dispatch(setSaveEventData(saveEvent)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);