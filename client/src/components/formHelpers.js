const handleResponseStatus = (e, errors = null) => {
  e.currentTarget.className =
    'form-control ' +
    (e.currentTarget.value === '' || errors ? 'is-invalid' : 'is-valid');
};

const extractDetailsFromClipboard = async () => {
  try {
    const clipboardText = await navigator.clipboard.readText();

    const details = clipboardText.split('\n').reduce((acc, line) => {
      const [key, value] = line.split(':').map((str) => str.trim());

      if (key && value) {
        acc[key.toLowerCase()] = value;
      }

      return acc;
    }, {});

    return details;
  } catch {
    return null;
  }
};

export { handleResponseStatus, extractDetailsFromClipboard };
