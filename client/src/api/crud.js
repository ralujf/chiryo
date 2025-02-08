import axios from 'axios';
import {
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
  throw error;
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

const handleRequest =
  (method, url, data = null, params = null) =>
  async () => {
    try {
      const response = await axios({
        method,
        url,
        data,
        params,
        headers: {
          Authorization: fetchJWT(),
        },
      });
      return response.data;
    } catch (error) {
      errorLog(error);
    }
  };

const loginUser = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData);
    storeJWT(response.headers['authorization']);
    return response.data;
  } catch (error) {
    errorLog(error);
  }
};

const logoutUserRedirect = () => {
  localStorage.removeItem('jwtToken');
  window.location.href = '/';
};

const registerUser = (userData) => {
  const result = handleRequest(
    'post',
    createURL({ baseURL: REGISTER_URL }),
    userData,
  );
  return result;
};

const deleteUser = (userId) =>
  handleRequest(
    'delete',
    createURL({ baseURL: DELETE_USER_URL, userId: userId }),
  );

/**
 *
 * @param {*} userId
 * @param {*} offset
 * @returns {types.TableRow[]}
 * @description - Load the paginated view for the users (therapist or client) dashboard
 */
const loadTableData = (userId, offset) => {
  let result = handleRequest(
    'post',
    createURL({ baseURL: GET_TABLE_URL, userId: userId }),
    null,
    offset,
  );

  // return result
  let exampleArr = Array.from({ length: 12 }, () => {
    return {
      user: {
        _id: 'sLS9S*(£a3L',
        username: 'UnlawfulGod',
        email: 'ralphdaveysss@gmail.com',
      },
      therapist: {
        _id: 'ie*234£39)23!',
        firstName: 'Steve',
        lastName: 'Watts',
        email: 'stevewatts@gmail.com',
        expertise: 'Couples',
      },
      location: 'Phone',
      locationLink: '07480144234',
      time: new Date(),
      diagnosis: 'Depression',
      markResolvedUser: false,
      markResolvedTherapist: false,
    };
  });

  return {
    tableData: exampleArr.slice(offset * 10),
    total: exampleArr.length % 10,
  };
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
  handleRequest('put', createURL({ baseURL: REMOVE_ROW_URL, userId }));

/**
 *
 * @param {string} userId
 * @param {Object} rowData
 * @returns void
 * @description - Update a specific item of a specific record by overwriting with new row data
 */
const updateRowFromTable = (userId, rowData) =>
  handleRequest('put', createURL({ baseURL: UPDATE_ROW_URL, userId }), rowData);

/**
 *
 * @param {Object} userData
 * @returns {types.Therapist[]}
 * @description - Return the therapists that the user has matched with in ranked order of perceived compatibility
 */
const getTherapists = (userData) => {
  const { id } = userData;
  if (!id) return null;

  const response = handleRequest(
    'get',
    createURL({ baseURL: POST_SYMPTOMS_URL, userData }),
  );
  return response;
  // return [
  //   { id: 1, therapist: 'John Doe', otherDetails: 'Details' },
  //   { id: 2, therapist: 'Jane Smith', otherDetails: 'More Details' },
  // ];
};

/**
 *
 * @param {types.Applicant} applicationData
 * @returns
 * @description - Post an applicants details to the database to be ported into a HR system and reviewed
 */
const sendApplication = (applicationData) =>
  handleRequest(
    'post',
    createURL({ baseURL: APPLICATION_URL }),
    applicationData,
  );

export {
  registerUser,
  deleteUser,
  loginUser,
  logoutUserRedirect,
  loadTableData,
  removeRowFromTable,
  clearTable,
  updateRowFromTable,
  getTherapists,
  sendApplication,
};
