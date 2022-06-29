export const ADD_USER_INFOS = 'ADD_USER_INFOS';
export const GET_ASSERTIONS = 'GET_ASSERTIONS';

export const addUserInfos = (userInfos) => ({
  type: ADD_USER_INFOS,
  userInfos,
});

export const getAssertions = (answers) => ({
  type: GET_ASSERTIONS,
  payload: answers,
});
