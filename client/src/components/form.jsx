import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import PropTypes from 'prop-types';

const Form = ({ formTitle, method, submissionText }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const response = await method(data);
    console.log(response);
    notifyError(response);
  };

  const notifyError = (error) =>
    toast.error('Oops - looks like something went wrong! ' + error, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
      theme: 'light',
      type: 'error',
    });

  return (
    <div className="chiryo_rounded chiryo_primary w-50 p-5">
      <ToastContainer
        position="bottom-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable={false}
        pauseOnHover
        theme="light"
      />
      <h1 className="display-3 fw-bolder mb-5">{formTitle}</h1>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <label className="fw-bold">Username</label>
        <input
          className="mb-3 w-50"
          placeholder="Username"
          {...register('Username', {
            required: 'Username is required',
            maxLength: {
              value: 50,
              message: 'Username cannot exceed 50 characters',
            },
            pattern: {
              value: /^[a-zA-Z0-9]+$/,
              message: 'Username cannot contain special characters',
            },
          })}
        />
        {errors.Username && <span>{errors.Username.message}</span>}
        <label className="fw-bold">Password</label>
        <input
          type="password"
          className="mb-3 w-50"
          {...register('Password', { required: 'Password is required' })}
        />
        {errors.Password && <span>{errors.Password.message}</span>}
        <input
          type="submit"
          value={submissionText}
          className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
          style={{ width: 'fit-content' }}
        />
      </form>
    </div>
  );
};

Form.propTypes = {
  formTitle: PropTypes.string.isRequired,
  method: PropTypes.func,
  submissionText: PropTypes.string.isRequired,
};

export default Form;
