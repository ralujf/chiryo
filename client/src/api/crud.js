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
} from './config';
import { fetchJWT, storeJWT } from './auth';
// eslint-disable-next-line no-unused-vars
import * as types from './typedefs';

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
  return error.response.statusText;
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
  console.log(data);

  try {
    const response = await axios(requestConfig);
    console.log(response);
    return response.data;
  } catch (error) {
    const statusMessage = errorLog(error);
    return statusMessage;
  }
};

const loginUser = async (userData) => {
  const requestConfig = {
    url: LOGIN_URL,
    data: userData,
  };

  console.log(requestConfig);

  try {
    const response = await axios.post(requestConfig);
    storeJWT(response.headers['authorization']);
    console.log(response.data);
    return response.data;
  } catch (error) {
    const statusMessage = errorLog(error);
    return statusMessage;
  }
};

const logoutUserRedirect = () => {
  localStorage.removeItem('jwtToken');
  window.location.href = '/';
};

const registerUser = (userData) =>
  handleRequest('post', REGISTER_URL, userData);

const deleteUser = (userId) =>
  handleRequest(
    'delete',
    createURL({ baseURL: DELETE_USER_URL, userId: userId }),
  );

/**
 *
 * @param {types.Applicant} profileData
 * @returns
 * @description - Update details of any user
 */
const updateProfileInfo = (profileData) =>
  handleRequest('patch', UPDATE_PROFILE_URL, profileData);

const updatePassword = () => {};

/**
 *
 * @param {*} userId
 * @param {*} offset
 * @returns {types.TableRow[]}
 * @description - Load the paginated view for the users (therapist or client) dashboard
 */
const loadTableData = (userId, offset) => {
  const result = handleRequest(
    'post',
    createURL({ baseURL: GET_TABLE_URL, userId: userId }),
    null,
    { offset },
  );

  console.log(result);
  return result;
  // const exampleArr = Array.from({ length: 12 }, () => ({
  //   user: {
  //     _id: 'sLS9S*(£a3L',
  //     username: 'Username',
  //     email: 'ralphdaveysss@gmail.com',
  //   },
  //   therapist: {
  //     _id: 'ie*234£39)23!',
  //     username: 'SteveWatts',
  //     firstName: 'Steve',
  //     lastName: 'Watts',
  //     email: 'stevewatts@gmail.com',
  //     expertise: 'Couples',
  //   },
  //   location: 'Phone',
  //   locationLink: '07480144234',
  //   time: new Date(),
  //   diagnosis: 'Depression',
  //   markResolvedUser: false,
  //   markResolvedTherapist: false,
  // }));

  // return {
  //   tableData: exampleArr.slice(offset * 10),
  //   total: exampleArr.length % 10,
  // };
};

/**
 *
 * @param {string} userId
 * @param {Object} rowData
 * @returns
 * @description - finds and dereferences a specific row from a specific users view, does not delete data
 */
const removeRowFromTable = (userId, rowData) =>
  handleRequest(
    'put',
    createURL({ baseURL: REMOVE_ROW_URL, userId: userId }),
    rowData,
  );

/**
 *
 * @param {string} userId
 * @returns void
 * @description - Removes the users reference to be able to retrieve data
 */
const clearTable = (userId) =>
  handleRequest('put', createURL({ baseURL: REMOVE_ROW_URL, userId: userId }));

/**
 *
 * @param {string} userId
 * @param {Object} rowData
 * @returns void
 * @description - Update a specific item of a specific record by overwriting with new row data
 */
const updateRowFromTable = (userId, rowData) =>
  handleRequest(
    'put',
    createURL({ baseURL: UPDATE_ROW_URL, userId: userId }),
    rowData,
  );

/**
 *
 * @param {Object} userData
 * @returns {types.Therapist[]}
 * @description - Return the therapists that the user has matched with in ranked order of perceived compatibility
 */
const getTherapists = async (userData) => {
  const { id } = userData;
  if (!id) return null;

  return handleRequest(
    'get',
    createURL({ baseURL: POST_SYMPTOMS_URL, userId: id }),
  );
};

/**
 *
 * @param {types.Applicant} applicationData
 * @returns
 * @description - Post an applicants details to the database to be ported into a HR system and reviewed
 */
const sendApplication = (applicationData) =>
  handleRequest('post', APPLICATION_URL, applicationData);

// ADMIN ONLY
const fetchApplicants = () => {};
const rejectApplicant = () => {};
const acceptApplicant = () => {};

export {
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
};
