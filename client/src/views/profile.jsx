import { useForm } from 'react-hook-form';
import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import {
  deleteUser,
  logoutUserRedirect,
  updatePassword,
  updateProfileInfo,
  viewUser,
} from '../api/crud';
import { sanitizeInput } from '../api/sanitizers';

import { useTokenValidation } from '../hooks/useTokenValidation';
import { useIdentityStore } from '../state/state';

import { handleResponseStatus } from '../components/formHelpers';
import { NotificationContainer } from '../components/notificationContainer';
import { responseHandler } from '../components/notifications';
import { useEffect, useState } from 'react';
import usePageInfo from '../hooks/usePageInfo';

const Profile = () => {
  const {
    register: registerUpdate,
    handleSubmit: handleSubmitUpdate,
    formState: { errors: errorsUpdate },
  } = useForm();

  const {
    register: registerChangePass,
    handleSubmit: handleSubmitChangePass,
    formState: { errors: errorsChangePass },
  } = useForm();

  const {
    register: registerDelete,
    handleSubmit: handleSubmitDelete,
    formState: { errors: errorsDelete },
  } = useForm();

  usePageInfo({
    title: 'Profile | Chiryō',
    metaDescription: 'Update your profile information for your Chiryō account',
  });
  const [userInfo, setUserInfo] = useState({});
  const { role, userId, adminId } = useIdentityStore((state) => state);
  const validated = useTokenValidation({ userId, adminId });

  useEffect(() => {
    const fetchUserInfo = async () => {
      const response = await viewUser({ data: { userId, role } });
      console.log(response);
      setUserInfo(response.data.userInfo);
    };

    fetchUserInfo();
  }, [role, userId]);

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

    responseHandler({ res: response });
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

    responseHandler({ res: response });
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

    responseHandler({ res: response });

    logoutUserRedirect();
  };

  return validated ? (
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

          <div className="d-flex flex-column flex-lg-row gap-5">
            <aside className="mw-sm-100 mw-md-50">
              <motion.div
                {...animationOptions3}
                style={{ position: 'sticky', top: '0' }}
              >
                <div className="text-start">
                  <p className="display-6">
                    <i className="bi bi-card-heading"></i> Personal Info
                  </p>
                  <br></br>
                  <p>
                    Personal info and options to manage it. You can edit
                    information given in the forms.
                  </p>
                </div>

                <div className="card mw-50 text-bg-light mb-3">
                  <div className="card-header">{userInfo.username}</div>
                  <div className="card-body">
                    <h5 className="card-title">Personal Info</h5>
                    <hr></hr>
                    <p className="card-text">Email: {userInfo.email}</p>
                    <hr></hr>
                    <p className="card-text">Age: {userInfo.age}</p>
                    <hr></hr>
                    <p className="card-text">Race: {userInfo.race}</p>
                    {userInfo.problem && (
                      <>
                        <hr></hr>
                        <p className="card-text" style={{ maxWidth: '100%' }}>
                          Problem: <br></br> {userInfo.problem}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </motion.div>
            </aside>

            <aside>
              <motion.div
                {...animationOptions3}
                className="chiryo_rounded chiryo_primary p-3 p-md-5"
              >
                <form
                  className="form-floating"
                  onSubmit={handleSubmitUpdate(onSubmitUpdate)}
                >
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-bold">
                      Username
                    </label>
                    <input
                      required
                      disabled={role === 'therapist' ? true : false}
                      type="text"
                      className="form-control"
                      id="username"
                      {...registerUpdate('username', { required: true })}
                      onInput={(e) => {
                        handleResponseStatus(e);
                      }}
                    />
                    {errorsUpdate.username && (
                      <span>This field is required</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="password" className="form-label fw-bold">
                      Password
                    </label>
                    <input
                      required
                      type="password"
                      className="form-control"
                      id="password"
                      {...registerUpdate('password', { required: true })}
                      onInput={(e) => {
                        handleResponseStatus(e);
                      }}
                    />
                    {errorsUpdate.password && (
                      <span>This field is required</span>
                    )}
                    <small>
                      The fields above are required to update the information
                      below
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
                      {...registerUpdate('email')}
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
                      {...registerUpdate('age')}
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
                      className="form-control form-select"
                      id="race"
                      {...registerUpdate('race')}
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
                      className="form-control form-select"
                      id="background"
                      {...registerUpdate('background')}
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
                      className="form-control form-select"
                      id="religion"
                      {...registerUpdate('religion')}
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
                      className="form-control form-select"
                      id="location"
                      {...registerUpdate('location')}
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
                <form onSubmit={handleSubmitChangePass(onSubmitChangePass)}>
                  <div className="mb-3">
                    <label htmlFor="username" className="form-label fw-bold">
                      Username
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="username"
                      {...registerChangePass('username', { required: true })}
                      onInput={(e) => {
                        handleResponseStatus(e);
                      }}
                    />
                    {errorsChangePass.username && (
                      <span>This field is required</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label htmlFor="oldPassword" className="form-label fw-bold">
                      Current Password
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      id="oldPassword"
                      {...registerChangePass('oldPassword', { required: true })}
                      onInput={(e) => {
                        handleResponseStatus(e);
                      }}
                    />
                    {errorsChangePass.oldPassword && (
                      <span>This field is required</span>
                    )}
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-bold">New Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...registerChangePass('newPassword', {
                        required: 'Password is required',
                      })}
                      onInput={(e) => {
                        handleResponseStatus(e);
                      }}
                    />
                    {errorsChangePass.newPassword && (
                      <span>{errorsChangePass.newPassword.message}</span>
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
                <form onSubmit={handleSubmitDelete(onSubmitDelete)}>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label fw-bold">
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      {...registerDelete('email', { required: true })}
                      onInput={(e) => {
                        handleResponseStatus(e);
                      }}
                    />
                    {errorsDelete.email && <span>This field is required</span>}
                  </div>
                  <div className="mb-3">
                    <label className="fw-bold">Password</label>
                    <input
                      type="password"
                      className="form-control"
                      {...registerDelete('password', {
                        required: 'Password is required',
                      })}
                      onInput={(e) => {
                        handleResponseStatus(e);
                      }}
                    />
                    {errorsDelete.password && (
                      <span>{errorsDelete.password.message}</span>
                    )}
                  </div>
                  <input
                    type="submit"
                    value={'Delete My Account'}
                    className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
                    style={{ width: 'fit-content' }}
                  />
                </form>
              </motion.div>
            </aside>
          </div>
        </div>
      </div>
    </>
  ) : (
    <div className="vh-100 vw-100"></div>
  );
};

export default Profile;
