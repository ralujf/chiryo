import axios from 'axios';
import {
  REGISTER_URL,
  DELETE_USER_URL,
  LOGIN_URL,
  LOAD_TABLE_URL,
  REMOVE_ROW_URL,
  UPDATE_ROW_URL,
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

// User Requests
const registerUser = async (userData) => {
  try {
    const response = await axios.post(REGISTER_URL, userData);
    console.log('User registered:', response.data);
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

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(
      createURL({ baseURL: DELETE_USER_URL, userId: userId }),
    );
    console.log('User deleted:', response.data);
    return response.data;
  } catch (error) {
    errorLog(error);
  }
};

// Dashboard Requests
const loadTableData = async (userId, offset) => {
  try {
    const response = await axios.post(
      createURL({ baseURL: LOAD_TABLE_URL, userId: userId }),
      {
        headers: {
          Authorization: fetchJWT(),
        },
        params: {
          offset: offset,
        },
      },
    );
    console.log(response);
    // Placeholder
    return Array.from({ length: 5 }, () => {
      Array(5).fill(null);
    });
  } catch (error) {
    errorLog(error);
  }
};

const removeRowFromTable = async (userId, index) => {
  try {
    const response = await axios.post(
      { baseURL: REMOVE_ROW_URL, userId: userId },
      {
        headers: {
          Authorization: fetchJWT(),
        },
        params: {
          rowIndex: index,
        },
      },
    );
    console.log(response);
  } catch (error) {
    errorLog(error);
  }
};

const updateRowFromTable = async (userId, userData) => {
  try {
    const response = await axios.put(
      createURL({ baseURL: UPDATE_ROW_URL, userId: userId }),
      userData,
      {
        headers: {
          Authorization: fetchJWT(),
        },
      },
    );
    console.log(response);
  } catch (error) {
    errorLog(error);
  }
};

// Match Requests
// TODO: Figure out how to implement GAIS to match therapists
const matchUser = (userData) => {
  // Placeholder
  // eslint-disable-next-line no-unused-vars
  const { problem, age, race, id } = userData;

  return [
    { id: 1, therapist: 'temp', otherDetails: 'couple dets' },
    { id: 2, therapist: 'temp', otherDetails: 'couple dets' },
  ];
};

export {
  registerUser,
  deleteUser,
  loginUser,
  loadTableData,
  removeRowFromTable,
  updateRowFromTable,
  matchUser,
};
