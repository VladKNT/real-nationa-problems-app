import React, { Component } from 'react';
import {View, Text, TouchableOpacity} from 'react-native';
import _ from 'lodash';

import { IReducerStates } from '../../redux/reducers';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { getEvent } from '../../redux/actions/ActionCreators';
import { ISaveEventParameters } from '../../constants/types';

import STRINGS from '../../constants/strings';
import styles from './Styles';

interface Props {
  navigation: any,
  getEvent: (id: string) => void
}

interface State {

}

class EventScreen extends Component <Props, State> {
  constructor(props: Props) {
    super(props);
  };

  componentDidMount() {
    const { navigation, getEvent } = this.props;
    const id = navigation.getParam('id');

    getEvent(id);

    // navigation.setParams({
    //   onSavePressed: this.onSavePressed
    // });
  };

  static navigationOptions = ({ navigation }: any) => ({
    headerTitle: STRINGS.ADD_PLACE,

    // headerRight: (
    //   <TouchableOpacity style={styles.headerRight} onPress={navigation.getParam('onSavePressed')}>
    //     <Icon name={'md-checkmark'} size={25} color={COLORS.HIGHLIGHT}/>
    //   </TouchableOpacity>
    // )
  });


  render() {
    return (
      <View style={styles.container}>
      </View>
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
