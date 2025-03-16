import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import { useCredentialStore } from '../state/state';
import PropTypes from 'prop-types';

const Form = ({ formTitle, submissionMethod, submissionText }) => {
  const [userState, setUserState] = useState('');
  const [passState, setPassState] = useState('');
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const setUser = useCredentialStore((state) => state.setUser);

  const onSubmit = async (data) => {
    const response = await submissionMethod({ data: data });
    console.log(response);

    setUser(...response.userSubset);

    if (response.errors != null) {
      notifyError(response);
    }
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
          className={'mb-3 w-100 rounded form-control ' + userState}
          placeholder="Username"
          onInput={() => {
            if (!errors.username) {
              setUserState('is-valid');
            } else {
              setUserState('is-invalid');
            }
          }}
          {...register('username', {
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
        {errors.username && <span>{errors.username.message}</span>}
        <label className="d-inline fw-bold">Password</label>
        <input
          type="password"
          placeholder="•••••••••••"
          className={'mb-3 w-100 rounded form-control ' + passState}
          onInput={() => {
            if (!errors.password) {
              setPassState('is-valid');
            } else {
              setPassState('is-invalid');
            }
          }}
          {...register('password', { required: 'Password is required' })}
        />
        {errors.password && <span>{errors.password.message}</span>}
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
  submissionMethod: PropTypes.func,
  submissionText: PropTypes.string.isRequired,
};

export default Form;
