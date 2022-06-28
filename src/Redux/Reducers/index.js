import { combineReducers } from 'redux';

const INITIAL_STATE = {
  name: '',
  assertions: '',
  score: '',
  gravatarEmail: '',
};

const globalReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  default:
    return state;
  }
};

const rootReducer = combineReducers({ globalReducer });

export default rootReducer;
