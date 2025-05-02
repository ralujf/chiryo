const storeToken = ({ key = null, value = null }) => {
  if (value && key) {
    sessionStorage.setItem(key, value);
  }
};

const fetchToken = (key) => {
  const value = sessionStorage.getItem(key);
  return value || null;
};

export { fetchToken, storeToken };
