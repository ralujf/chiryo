import { toast } from 'react-toastify';

const CLOSE_TIME = 2000;

const createNotifMessage = (type) => {
  switch (type) {
    case 'Phone':
      return 'Phone number was copied!';
    case 'In-person':
      return 'Location was copied';
    case 'Virtual':
      return 'Meeting link was copied!';
    default:
      return 'Unknown type';
  }
};

const copyToClipBoard = async (value, type) => {
  let message = createNotifMessage(type);
  try {
    await navigator.clipboard.writeText(value);
    notifySuccess(message);
  } catch (err) {
    notifyError('Could not copy text: ' + err);
  }
};

const notifyError = (message) =>
  toast.error(
    'Oops - looks like something went wrong! ' + message ? message : '',
    {
      position: 'bottom-center',
      autoClose: CLOSE_TIME,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light',
      type: 'error',
    },
  );

const notifySuccess = (message) =>
  toast.success('Success! ' + message ? message : '', {
    position: 'bottom-center',
    autoClose: CLOSE_TIME,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
    theme: 'light',
    type: 'success',
  });

const responseHandler = ({
  res,
  setter = null,
  storeSetter = null,
  defaultVar,
  stateVar,
  redirect = null,
  silence = false,
}) => {
  console.log(res);

  try {
    if (parseInt(res.status) < 400) {
      if (!silence) {
        notifySuccess(res.message ? res.message : res.statusText);
      }

      if (setter && defaultVar) {
        setter(defaultVar);
      }

      if (storeSetter && stateVar && defaultVar) {
        storeSetter(stateVar);
      }

      if (redirect) {
        setTimeout(() => {
          redirect;
        }, 1000);
      }

      if (res.data && res.total) {
        return {
          data: res.data,
          total: res.total,
        };
      }

      if (res.data) {
        return res.data;
      }
    } else {
      if (!silence) {
        notifyError(res.message ? res.message : res.statusText);
      }
    }
  } catch (err) {
    if (!silence) {
      notifyError(err);
    }
  }
};

export { notifySuccess, notifyError, responseHandler, copyToClipBoard };
