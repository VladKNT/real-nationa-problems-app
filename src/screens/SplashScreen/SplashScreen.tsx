import React, { Component } from 'react';
import { connect } from 'react-redux';
import { routeCurrentUser } from '../../redux/actions/ActionCreators'
import { Dispatch } from 'redux';
import {IReducerStates} from '../../redux/reducers';

export interface Props {
  routeCurrentUser: () => void
}

class SplashScreen extends Component <Props> {
  componentDidMount() {
    setTimeout(() => this.props.routeCurrentUser(), 3000);
  }

  render() {
    return null;
  }
}

const mapStateToProps = (state: IReducerStates) => {
  return {

  };
};


const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    routeCurrentUser: () => dispatch(routeCurrentUser())
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
