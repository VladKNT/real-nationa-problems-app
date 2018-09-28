import ACTION from './ActionTypes';

export const routeCurrentUser = () =>
{
    return {
        type: ACTION.ROUTE_CURRENT_USER
    }
};

export const createUserProfile = (data: any) => {
    return {
        type: ACTION.CREATE_USER_PROFILE,
        data
    }
};

export const loginUserProfile = (data: any) => {
    return {
        type: ACTION.LOGIN_USER_PROFILE,
        data
    }
};