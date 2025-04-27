import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import { deleteUser, updatePassword, updateProfileInfo } from '../api/crud';
import { sanitizeInput } from '../api/sanitizers';

import { useIdentityStore } from '../state/state';
import { handleResponseStatus } from '../components/formHelpers';
import { NotificationContainer } from '../components/notificationContainer';
import { responseHandler } from '../components/notifications';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const role = useIdentityStore((state) => state.role);

  const onSubmitUpdate = async (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitizeInput(value)]),
    );

    const response = await updateProfileInfo({
      data: {
        username: sanitizedData.username,
        password: sanitizedData.password,
        ...sanitizedData,
      },
    });

    responseHandler(response);
  };

  const onSubmitChangePass = async (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitizeInput(value)]),
    );

    const response = await updatePassword({
      data: {
        username: sanitizedData.username,
        oldPassword: sanitizedData.oldPassword,
        newPassword: sanitizedData.newPassword,
        role: role,
      },
    });

    responseHandler(response);
  };

  const onSubmitDelete = async (data) => {
    const sanitizedData = Object.fromEntries(
      Object.entries(data).map(([key, value]) => [key, sanitizeInput(value)]),
    );

    const response = await deleteUser({
      data: {
        username: sanitizedData.username,
        password: sanitizedData.password,
        role: role,
      },
    });

    responseHandler(response);
  };

  return (
    <>
      <div className="container-fluid p-5 mt-5">
        <NotificationContainer />
        <div className="chiryo_rounded mb-5">
          <motion.h1
            {...animationOptions3}
            className="display-3 fw-bolder mb-5"
          >
            Profile Information
          </motion.h1>
          <motion.div
            {...animationOptions3}
            className="chiryo_rounded chiryo_primary p-3 p-md-5"
          >
            <form
              className="form-floating"
              onSubmit={handleSubmit(onSubmitUpdate)}
            >
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold">
                  Username
                </label>
                <input
                  disabled={role === 'therapist' ? true : false}
                  type="text"
                  className="form-control"
                  id="username"
                  {...register('username', { required: true })}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
                {errors.username && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label fw-bold">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register('password', { required: true })}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
                {errors.password && <span>This field is required</span>}
                <small>
                  The fields above are required to update the information below
                </small>
              </div>
              <h3 className="my-3">Information to Update</h3>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register('email')}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label fw-bold">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  {...register('age')}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="race" className="form-label fw-bold">
                  Race
                </label>
                <select
                  className="form-control"
                  id="race"
                  {...register('race')}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                >
                  <option value="">Select Race</option>
                  <option value="asian">Asian</option>
                  <option value="black">Black</option>
                  <option value="white">White</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="background" className="form-label fw-bold">
                  Background
                </label>
                <select
                  className="form-control"
                  id="background"
                  {...register('background')}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                >
                  <option value="">Select Background</option>
                  <option value="asian">Asian</option>
                  <option value="black british">Black British</option>
                  <option value="white british">White British</option>
                  <option value="hispanic">Hispanic</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="religion" className="form-label fw-bold">
                  Religion
                </label>
                <select
                  className="form-control"
                  id="religion"
                  {...register('religion')}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                >
                  <option value="">Select Religion</option>
                  <option value="christianity">Christianity</option>
                  <option value="islam">Islam</option>
                  <option value="hinduism">Hinduism</option>
                  <option value="buddhism">Buddhism</option>
                  <option value="other">Other</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label fw-bold">
                  Location
                </label>
                <select
                  className="form-control"
                  id="location"
                  {...register('location')}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                >
                  <option value="">Select Location</option>
                  <option value="london">London</option>
                  <option value="manchester">Manchester</option>
                  <option value="birmingham">Birmingham</option>
                  <option value="leeds">Leeds</option>
                  <option value="glasgow">Glasgow</option>
                  <option value="liverpool">Liverpool</option>
                  <option value="edinburgh">Edinburgh</option>
                  <option value="bristol">Bristol</option>
                  <option value="sheffield">Sheffield</option>
                  <option value="newcastle">Newcastle</option>
                  <option value="nottingham">Nottingham</option>
                  <option value="cardiff">Cardiff</option>
                  <option value="leicester">Leicester</option>
                  <option value="brighton">Brighton</option>
                </select>
              </div>
              <input
                type="submit"
                value={'Update Profile'}
                className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
              />
            </form>
          </motion.div>

          <motion.h1
            {...animationOptions3}
            className="display-3 fw-bolder my-5"
          >
            Change Password
          </motion.h1>
          <motion.div
            {...animationOptions3}
            className="chiryo_rounded chiryo_primary p-3 p-md-5"
          >
            <form onSubmit={handleSubmit(onSubmitChangePass)}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label fw-bold">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  {...register('username', { required: true })}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
                {errors.username && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="oldPassword" className="form-label fw-bold">
                  Old Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="oldPassword"
                  {...register('oldPassword', { required: true })}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
                {errors.oldPassword && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label className="form-label fw-bold">New Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register('newPassword', {
                    required: 'Password is required',
                  })}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
                {errors.newPassword && (
                  <span>{errors.newPassword.message}</span>
                )}
              </div>
              <input
                type="submit"
                value={'Change Password'}
                className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
                style={{ width: 'fit-content' }}
              />
            </form>
          </motion.div>

          <motion.h1
            {...animationOptions3}
            className="display-3 fw-bolder my-5"
          >
            Delete My Account
          </motion.h1>
          <motion.div
            {...animationOptions3}
            className="chiryo_rounded chiryo_primary p-3 p-md-5"
          >
            <form onSubmit={handleSubmit(onSubmitDelete)}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label fw-bold">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register('email', { required: true })}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label className="fw-bold">Password</label>
                <input
                  type="password"
                  className="form-control"
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  onInput={(e) => {
                    handleResponseStatus(e);
                  }}
                />
                {errors.password && <span>{errors.password.message}</span>}
              </div>
              <input
                type="submit"
                value={'Delete My Account'}
                className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
                style={{ width: 'fit-content' }}
              />
            </form>
          </motion.div>
        </div>
      </div>
    </>
  );
};

export default Profile;
