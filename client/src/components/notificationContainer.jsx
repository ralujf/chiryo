import { ToastContainer } from 'react-toastify';

const NotificationContainer = () => {
  const CLOSE_TIME = 2000;

  return (
    <ToastContainer
      position="bottom-center"
      autoClose={CLOSE_TIME}
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover
      theme="light"
    />
  );
};

export { NotificationContainer };
