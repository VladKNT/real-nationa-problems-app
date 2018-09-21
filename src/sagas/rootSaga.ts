import { takeLatest } from "redux-saga/effects";
import ACTION from '../actions/ActionTypes';
import * as commonSaga from './commonSaga';


function* rootSaga() {
    yield takeLatest(ACTION.ROUTE_CURRENT_USER, commonSaga.routeCurrentUser);
}

export default rootSaga;
