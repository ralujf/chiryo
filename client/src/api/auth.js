const storeJWT = (response) => {
  const token = response.headers.get('Authorization');
  if (token) {
    localStorage.setItem('jwtToken', token.replace('Bearer ', ''));
  }
};

const fetchJWT = () => {
  const token = localStorage.getItem('jwtToken');
  if (token) {
    return `Bearer ${token}`;
  }
  return null;
};

const checkIsNewUser = () => {};

export { fetchJWT, storeJWT, checkIsNewUser };
