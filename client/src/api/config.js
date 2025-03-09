const API_URL = import.meta.env.PROD
  ? import.meta.env.VITE_API_URL + '/api'
  : 'http://localhost:3000/api';

const REGISTER_URL = `${API_URL}/register`;
const LOGIN_URL = `${API_URL}/login`;
const LOGOUT_URL = `${API_URL}/logout`;
const UPDATE_PROFILE_URL = `${API_URL}/update-profile`;
const NEW_PASS_URL = `${API_URL}/update-password`;
const DELETE_USER_URL = `${API_URL}/delete-user-account`;
const SET_LOGIN_URL = `${API_URL}/set-first-login`;

const POST_SYMPTOMS_URL = `${API_URL}/matching/find-matches`;

const GET_TABLE_URL = `${API_URL}/dashboard/load-user-dashboard`;
const REMOVE_ALL_URL = `${API_URL}/dashboard/delete-table`;
const REMOVE_ROW_URL = `${API_URL}/dashboard/delete-row`;
const UPDATE_ROW_URL = `${API_URL}/dashboard/add-field`;

const APPLICATION_URL = `${API_URL}/apply`;
const REJECT_APPLICATION_URL = `${API_URL}/admin/reject-applicant`;
const ACCEPT_APPLICATION_URL = `${API_URL}/admin/approve-applicant`;
const GET_APPLICATIONS_URL = `${API_URL}/admin/view-all-applicants`;

const SCRAPE_URL = `${API_URL}/admin/search-for-therapist`;

export {
  API_URL,
  SCRAPE_URL,
  UPDATE_PROFILE_URL,
  NEW_PASS_URL,
  REGISTER_URL,
  DELETE_USER_URL,
  SET_LOGIN_URL,
  LOGIN_URL,
  LOGOUT_URL,
  GET_TABLE_URL,
  POST_SYMPTOMS_URL,
  REMOVE_ROW_URL,
  UPDATE_ROW_URL,
  REMOVE_ALL_URL,
  APPLICATION_URL,
  REJECT_APPLICATION_URL,
  ACCEPT_APPLICATION_URL,
  GET_APPLICATIONS_URL,
};
