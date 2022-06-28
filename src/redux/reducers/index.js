import { combineReducers } from 'redux';
import md5 from 'crypto-js/md5';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const globalReducer = (state = INITIAL_STATE, action) => {
  const { type, userInfos } = action;
  switch (type) {
  case 'ADD_USER_INFOS':
    return {
      ...state,
      name: userInfos.nameInput,
      gravatarEmail: md5(userInfos.email).toString(),
    };
  default:
    return state;
  }
};

const rootReducer = combineReducers({ globalReducer });

export default rootReducer;
