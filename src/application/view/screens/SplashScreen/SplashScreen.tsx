import React, { Component } from "react";
import { Dispatch } from "redux";
import { connect } from "react-redux";
import { routeCurrentUser } from "../../../data/store/user/userActions";
import { IReducerStates } from "../../../data/store/rootReducer";

export interface IProps {
  routeCurrentUser(): void
}

class SplashScreen extends Component <IProps> {
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
