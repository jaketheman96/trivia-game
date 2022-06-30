import { combineReducers } from 'redux';
import md5 from 'crypto-js/md5';
import { ADD_USER_INFOS, GET_ASSERTIONS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  assertionsUser: [],
};

const globalReducer = (state = INITIAL_STATE, action) => {
  const { type, userInfos } = action;
  switch (type) {
  case ADD_USER_INFOS:
    return {
      ...state,
      name: userInfos.nameInput,
      gravatarEmail: md5(userInfos.email).toString(),
    };
  case GET_ASSERTIONS:
    return {
      ...state,
      assertionsUser: action.payload,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ globalReducer });

export default rootReducer;
