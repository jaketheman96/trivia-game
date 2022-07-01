import { combineReducers } from 'redux';
import md5 from 'crypto-js/md5';
import { ADD_USER_INFOS, GET_ASSERTIONS, RECORD_TIMER, SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: [],
  score: 0,
  gravatarEmail: '',
  timer: [],
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
      assertions: action.payload,
    };
  case SCORE:
    return {
      ...state,
      score: action.score,
    };
  case RECORD_TIMER:
    return {
      ...state,
      timer: [...state.timer, action.timer],
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ globalReducer });

export default rootReducer;
