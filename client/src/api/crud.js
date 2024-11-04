import axios from 'axios';
import {
  REGISTER_URL,
  DELETE_USER_URL,
  LOGIN_URL,
  LOAD_TABLE_URL,
  REMOVE_ROW_URL,
} from './config';
import { fetchJWT, storeJWT } from './auth';

// User Requests
const registerUser = async (userData) => {
  try {
    const response = await axios.post(REGISTER_URL, userData);
    console.log('User registered:', response.data);
    return response.data;
  } catch (error) {
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
};

const deleteUser = async (userId) => {
  try {
    const response = await axios.delete(DELETE_USER_URL + userId);
    console.log('User deleted:', response.data);
    return response.data;
  } catch (error) {
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
};

const loginUser = async (userData) => {
  try {
    const response = await axios.post(LOGIN_URL, userData);
    storeJWT(response.headers['authorization']);
    return response.data;
  } catch (error) {
    console.error('There was an error:', error.message);
    throw error;
  }
};

// Dashboard Requests
const loadTableData = async (userId, offset) => {
  try {
    const response = await axios.post(LOAD_TABLE_URL + '/' + userId, offset, {
      headers: {
        Authorization: fetchJWT(),
      },
    });
    console.log(response);
    // Placeholder
    return Array.from({ length: 5 }, () => {
      Array(5).fill(null);
    });
  } catch (error) {
    console.error('There was an error:', error.message);
  }
};

const removeRowFromTable = async (userId, dataId) => {
  try {
    const response = await axios.post(REMOVE_ROW_URL + '/' + userId + dataId, {
      headers: {
        Authorization: fetchJWT(),
      },
    });
    console.log(response);
  } catch (error) {
    console.error('There was an error:', error.message);
  }
};

// Match Requests
// TODO: Figure out how to implement GAIS to match therapists
const matchUser = (userData) => {
  // Placeholder
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
  matchUser,
};
