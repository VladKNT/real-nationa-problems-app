import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import MapView from 'react-native-maps';

import { IReducerStates } from '../../redux/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import COLORS from '../../constants/colors';
import STRINGS from '../../constants/strings';
import styles from './Styles';

interface Props {
  navigation: any,
}

interface State {

}

class MapScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);
  }

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: STRINGS.ADD_PLACE,

    headerRight: (
      <TouchableOpacity style={styles.headerRight}>
        <Icon name={'md-checkmark'} size={25} color={COLORS.HIGHLIGHT}/>
      </TouchableOpacity>
    )
  });
  render() {
    return (
      <View style={styles.container}>
        <MapView
          initialRegion={{
            latitude: 47.839045,
            longitude: 35.139614,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
          style={styles.map}/>
      </View>
    )
  }
}

const mapStateToProps = (state: IReducerStates) => {
  return {

  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {

  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MapScreen);