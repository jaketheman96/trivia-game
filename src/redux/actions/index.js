export const ADD_USER_INFOS = 'ADD_USER_INFOS';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';
export const COUNT_ASSERTIONS = 'COUNT_ASSERTIONS';
export const SCORE = 'SCORE';
export const RESET_GAME = 'RESET_GAME';

export const addUserInfos = (userInfos) => ({
  type: ADD_USER_INFOS,
  userInfos,
});

export const getAssertions = (answers) => ({
  type: GET_ASSERTIONS,
  payload: answers,
});

export const updateScore = (score) => ({
  type: SCORE,
  score,
});

export const countAssertions = (count) => ({
  type: COUNT_ASSERTIONS,
  count,
});

export const resetGame = () => ({ type: RESET_GAME });
