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
  handleRequest('delete', createURL({ baseURL: DELETE_USER_URL, userId }));

const loadTableData = (userId, offset) => {
  let result = handleRequest(
    'post',
    createURL({ baseURL: GET_TABLE_URL, userId }),
    null,
    offset,
  );

  // return result
  // Placeholder Data
  return Array.from({ length: 5 }, () => {
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
      location: 'Virtual',
      locationLink: '',
      time: new Date(),
      diagnosis: 'Depression',
      markResolvedUser: false,
      markResolvedTherapist: false,
    };
  });
};

const removeRowFromTable = (userId, rowData) =>
  handleRequest(
    'post',
    createURL({ baseURL: REMOVE_ROW_URL, userId }),
    rowData,
  );

const clearTable = (userId) =>
  handleRequest('delete', createURL({ baseURL: REMOVE_ROW_URL, userId }));

const updateRowFromTable = (userId, rowData) =>
  handleRequest('put', createURL({ baseURL: UPDATE_ROW_URL, userId }), rowData);

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
