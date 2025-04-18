import { toast } from 'react-toastify';

const CLOSE_TIME = 2000;

const createMessage = (type) => {
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
  let message = createMessage(type);
  console.log(type);
  try {
    await navigator.clipboard.writeText(value);
    notifySuccess(message);
  } catch (err) {
    notifyError();
    console.error('Could not copy text: ', err);
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

export { notifySuccess, notifyError, copyToClipBoard };
