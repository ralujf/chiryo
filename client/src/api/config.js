const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL + '/api'
  : 'http://localhost:3000/api';

const REGISTER_URL = '/register';
const LOGIN_URL = '/login';
const LOGOUT_URL = '/logout';
const UPDATE_PROFILE_URL = '/update';

const DELETE_USER_URL = '/delete-user';

const POST_SYMPTOMS_URL = '/find-matches';

const GET_TABLE_URL = '/load-user-dashboard';
const REMOVE_ROW_URL = '/delete-row';
const UPDATE_ROW_URL = '/update-field';

const APPLICATION_URL = '/therapist-application';

export {
  API_URL,
  UPDATE_PROFILE_URL,
  REGISTER_URL,
  DELETE_USER_URL,
  LOGIN_URL,
  LOGOUT_URL,
  GET_TABLE_URL,
  POST_SYMPTOMS_URL,
  REMOVE_ROW_URL,
  UPDATE_ROW_URL,
  APPLICATION_URL,
};
