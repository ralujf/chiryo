const storeJWT = (token) => {
  if (token) {
    console.log('STORING TOKEN');
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

export { fetchJWT, storeJWT };
