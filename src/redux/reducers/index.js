import { combineReducers } from 'redux';
import md5 from 'crypto-js/md5';
import { ADD_USER_INFOS,
  COUNT_ASSERTIONS, GET_ASSERTIONS, RECORD_TIMER, SCORE } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
  timer: [],
  assertionsUser: [],
};

const player = (state = INITIAL_STATE, action) => {
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
  case SCORE:
    return {
      ...state,
      score: state.score + action.score,
    };
  case RECORD_TIMER:
    return {
      ...state,
      timer: [...state.timer, action.timer],
    };
  case COUNT_ASSERTIONS:
    return {
      ...state,
      assertions: action.count,
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ player });

export default rootReducer;
