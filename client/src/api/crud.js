import axios from 'axios';
import {
  UPDATE_PROFILE_URL,
  REGISTER_URL,
  DELETE_USER_URL,
  LOGIN_URL,
  GET_TABLE_URL,
  REMOVE_ROW_URL,
  UPDATE_ROW_URL,
  POST_SYMPTOMS_URL,
  APPLICATION_URL,
  GET_APPLICATIONS_URL,
  ACCEPT_APPLICATION_URL,
  REJECT_APPLICATION_URL,
  NEW_PASS_URL,
  LOGOUT_URL,
  REMOVE_ALL_URL,
  SCRAPE_URL,
  SET_LOGIN_URL,
} from './config';
import { fetchJWT, storeJWT } from './auth';
// eslint-disable-next-line no-unused-vars
import * as types from './typedefs';
// Proxy Data
import applicantData from '../api/applicants.json';
import dashboardData from '../api/dashboard.json';

function errorLog(error) {
  if (error.response) {
    console.error('Error response:', error.response.data);
    console.error('Error status:', error.response.status);
    console.error('Error headers:', error.response.headers);
  } else if (error.request) {
    console.error('Error request:', error.request);
  } else {
    console.error('Error message:', error.message);
  }
  console.error('Error config:', error.config);
  if (error.response?.statusText) {
    return error.response.statusText;
  }
  return error.response;
}

function createURL({ baseURL = '', userId = null, resourceId = null } = {}) {
  let url = baseURL;
  if (userId) {
    url += `/${userId}`;
  }
  if (resourceId) {
    url += `/${resourceId}`;
  }
  return url;
}

const handleRequest = async (method, url, data = null, params = null) => {
  const requestConfig = {
    method: method,
    url: url,
    data: data,
    params: params,
    headers: {
      Authorization: fetchJWT(),
    },
  };

  console.log('Request Config:', requestConfig);
  console.log(requestConfig.data);

  try {
    const response = await axios(requestConfig);
    if (response.headers['authorization']) {
      storeJWT(response.headers['authorization']);
    }
    console.log(response);
    return response.data;
  } catch (error) {
    const statusMessage = errorLog(error);
    return statusMessage;
  }
};
/**
 *
 * @param {object} userData - { data: { username, password }}
 * @returns - status message
 * @description - login information
 */
const loginUser = async (userData) =>
  handleRequest('post', LOGIN_URL, userData);

const logoutUserRedirect = () => {
  const message = handleRequest('post', LOGOUT_URL);
  localStorage.removeItem('jwtToken');
  window.location.href = '/';
  return message;
};

/**
 *
 * @param {object} userData - { data: { username, email, password, firstLogin, ...etc }}
 * @returns - status message
 * @description - take in user data appended on data object, return
 */
const registerUser = (userData) =>
  handleRequest('post', REGISTER_URL, userData);

/**
 *
 * @param {object} userData - { data: { username, password, role }}
 * @returns -
 * @description - enable user to delete account
 */
const deleteUser = (userData) =>
  handleRequest('delete', createURL({ baseURL: DELETE_USER_URL }), userData);

/**
 *
 * @param {Object} userData - { data: { userId, firstLogin, role }}
 * @returns
 */
const setFirstLogin = (userData) =>
  handleRequest('patch', SET_LOGIN_URL, userData);

/**
 *
 * @param {object} profileData = { data: { username, password, ...fields to update }}
 * @returns - status message
 * @description - update the user field
 */
const updateProfileInfo = (profileData) =>
  handleRequest('patch', UPDATE_PROFILE_URL, profileData);

/**
 *
 * @param {object} profileData = { data: { username, oldPassword, newPassword, role }}
 * @returns - status message
 * @description - update the user field
 */
const updatePassword = (profileData) =>
  handleRequest('patch', NEW_PASS_URL, profileData);

/**
 *
 * @param {object} userData - { data: { userId, role }}
 * @param {string} offset
 * @returns {types.TableRow[]}
 * @description - Load the paginated view for the users (therapist or client) dashboard
 */
const loadTableData = (userData, offset) => {
  const result = handleRequest(
    'post',
    createURL({ baseURL: GET_TABLE_URL }),
    userData,
    { offset },
  );

  console.log(result);
  // return result;

  return {
    tableData: dashboardData.slice(offset * 10),
    total: Math.ceil(dashboardData.length / 10),
  };
};

/**
 *
 * @param {Object} userData - { data: { userId, therapistId }}
 * @returns - void
 * @description - finds and dereferences a specific row from a specific users view, does not delete data
 */
const removeRowFromTable = (userData) =>
  handleRequest('put', createURL({ baseURL: REMOVE_ROW_URL }), userData);

/**
 *
 * @param {Object} userData - { data: { role, userId }}
 * @returns - void
 * @description - Removes the users reference to be able to retrieve data
 */
const clearTable = (userData) =>
  handleRequest('put', createURL({ baseURL: REMOVE_ALL_URL }), userData);

/**
 *
 * @param {Object} dashboardData - { data: { userId, therapistId, rowData: { ...data} }}}
 * @returns - void
 * @description - Update a specific item of a specific record by overwriting with new row data
 */
const updateRowFromTable = (dashboardData) =>
  handleRequest('put', createURL({ baseURL: UPDATE_ROW_URL }), dashboardData);

/**
 *
 * @param {Object} userData - { data: { user, username }}
 * @returns {types.Therapist[]}
 * @description - Return the therapists that the user has matched with in ranked order of perceived compatibility
 */
const getTherapists = async (userData) => {
  return handleRequest(
    'get',
    createURL({ baseURL: POST_SYMPTOMS_URL }),
    userData,
  );
};

/**
 *
 * @param {types.Applicant} applicationData - { data: { ...applicationData }}
 * @returns
 * @description - Post an applicants details to the database to be ported into a HR system and reviewed
 */
const sendApplication = (applicationData) =>
  handleRequest('post', APPLICATION_URL, applicationData);

/**
 *
 * @param {Object} adminData - { data: { adminId }}
 * @param {string} offset
 * @returns {Promise<Array>} - A promise that resolves to an array of data
 * @description - Fetches a list of applicants from the database for review
 */
const fetchApplicants = (adminData, offset) => {
  let data = handleRequest(
    'get',
    createURL({ baseURL: GET_APPLICATIONS_URL, resourceId: offset }),
    adminData,
  );
  console.log(data);
  // return data

  return {
    tableData: applicantData.slice(offset * 10),
    total: Math.ceil(applicantData.length / 10),
  };
};

/**
 *
 * @param {types.Applicant} adminData - { data: { ...application, adminId }}
 * @param {string} offset
 * @returns
 * @description - Approve therapist into the account
 */
const acceptApplicant = (adminData) =>
  handleRequest('post', ACCEPT_APPLICATION_URL, adminData);

/**
 *
 * @param {types.Applicant} adminData - { data: { applicantEmail, adminId }}
 * @param {string} offset
 * @returns
 * @description - Reject therapist into the account
 */
const rejectApplicant = (adminData) =>
  handleRequest('delete', REJECT_APPLICATION_URL, adminData);

/**
 *
 * @param {Object} adminData - { data: { adminId }}
 * @returns
 */
const searchForTherapists = (adminData) =>
  handleRequest('get', SCRAPE_URL, adminData);

export {
  searchForTherapists,
  registerUser,
  deleteUser,
  loginUser,
  logoutUserRedirect,
  updatePassword,
  loadTableData,
  removeRowFromTable,
  clearTable,
  updateRowFromTable,
  getTherapists,
  sendApplication,
  updateProfileInfo,
  fetchApplicants,
  rejectApplicant,
  acceptApplicant,
  setFirstLogin,
};
