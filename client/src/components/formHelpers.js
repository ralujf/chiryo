const handleResponseStatus = (e, errors = null) => {
  e.currentTarget.className =
    'form-control ' +
    (e.currentTarget.value === '' || errors ? 'is-invalid' : 'is-valid');
};

export { handleResponseStatus };
