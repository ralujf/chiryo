import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import { Redirect } from 'wouter';

import { useIdentityStore } from '../state/state';
import {
  extractDetailsFromClipboard,
  handleResponseStatus,
} from './formHelpers';

import { storeToken } from '../api/auth';
import { sanitizeInput } from '../api/sanitizers';

import { notifyError, responseHandler } from './notifications';
import { NotificationContainer } from './notificationContainer';

const LoginForm = ({ formTitle, submissionMethod, submissionText }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  const setUser = useIdentityStore((state) => state.setUser);

  useEffect(() => {
    const prefillForm = async () => {
      const details = await extractDetailsFromClipboard();

      if (details) {
        setValue('username', details.username);
        setValue('password', details.password);
      }
    };

    prefillForm();
  }, [setValue]);

  const onSubmit = async (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitizeInput(value)]),
    );

    const response = await submissionMethod({ data: sanitizedData });

    try {
      const { token, userSubset } = await response.data;

      console.log(userSubset);

      responseHandler({
        res: response,
        setter: setUser,
        storeSetter: (value) => storeToken(value),
        defaultVar: userSubset,
        stateVar: { key: 'loginToken', value: token },
      });

      return <Redirect to="/dashboard" />;
    } catch (err) {
      notifyError('Incorrect password or username: ' + err);
    }
  };

  return (
    <div className="chiryo_rounded chiryo_primary w-50 p-5">
      <NotificationContainer />
      <h1 className="display-3 fw-bolder mb-5">{formTitle}</h1>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label className="fw-bold">Username</label>
          <input
            className="form-control"
            placeholder="Username"
            onInput={(e) => {
              handleResponseStatus(e, errors.username);
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
        </div>
        <div className="mb-3">
          <label className="fw-bold">Password</label>
          <input
            type="password"
            placeholder="•••••••••••"
            className="w-100 form-control"
            onInput={(e) => {
              handleResponseStatus(e, errors.password);
            }}
            {...register('password', { required: 'Password is required' })}
          />
          {errors.password && <span>{errors.password.message}</span>}
        </div>
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

LoginForm.propTypes = {
  formTitle: PropTypes.string.isRequired,
  submissionMethod: PropTypes.func,
  submissionText: PropTypes.string.isRequired,
};

export default LoginForm;
