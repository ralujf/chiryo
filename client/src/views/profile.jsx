import { useForm } from 'react-hook-form';
import { updateProfileInfo } from '../api/crud';
import { ToastContainer, toast } from 'react-toastify';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmitUpdate = async (data) => {
    const response = await updateProfileInfo(data);
    console.log(response);
    notifyError(response);
  };

  const onSubmitChangePass = async (data) => {
    const response = await updateProfileInfo(data);
    console.log(response);
    notifyError(response);
  };

  const onSubmitDelete = async (data) => {
    const response = await updateProfileInfo(data);
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
    <>
      <div
        className="container-fluid"
        style={{ minHeight: '80vh', padding: '15vh 7.5vw' }}
      >
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
        <div className="chiryo_rounded mb-5">
          <h1 className="display-3 fw-bolder mb-5">Profile Information</h1>
          <div className="chiryo_rounded chiryo_primary p-3 p-md-5">
            <form onSubmit={handleSubmit(onSubmitUpdate)}>
              <div className="mb-3">
                <label htmlFor="username" className="form-label">
                  Username
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  {...register('username', { required: true })}
                />
                {errors.username && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  {...register('email', { required: true })}
                />
                {errors.email && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  {...register('password', { required: true })}
                />
                {errors.password && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="age" className="form-label">
                  Age
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="age"
                  {...register('age', { required: true })}
                />
                {errors.age && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label htmlFor="race" className="form-label">
                  Race
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="race"
                  {...register('race')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="background" className="form-label">
                  Background
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="background"
                  {...register('background')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="religion" className="form-label">
                  Religion
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="religion"
                  {...register('religion')}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="location" className="form-label">
                  Location
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  {...register('location')}
                />
              </div>
              <button
                type="submit"
                className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
              >
                Update Profile
              </button>
            </form>
          </div>

          <h1>Change Password</h1>
          <div className="chiryo_rounded chiryo_primary p-3 p-md-5">
            <form onSubmit={handleSubmit(onSubmitChangePass)}>
              <div className="mb-3">
                <label htmlFor="OldPassword" className="form-label">
                  Old Password
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="OldPassword"
                  {...register('OldPassword', { required: true })}
                />
                {errors.OldPassword && <span>This field is required</span>}
              </div>
              <div className="mb-3">
                <label className="fw-bold">Password</label>
                <input
                  type="password"
                  className="mb-3 w-50"
                  {...register('Password', {
                    required: 'Password is required',
                  })}
                />
                {errors.Password && <span>{errors.Password.message}</span>}
              </div>
              <input
                type="submit"
                value={'Change Password'}
                className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
                style={{ width: 'fit-content' }}
              />
            </form>
          </div>

          <h1>Delete My Account</h1>
          <div className="chiryo_rounded chiryo_primary p-3 p-md-5">
            <form onSubmit={handleSubmit(onSubmitDelete)}>
              <div className="mb-3">
                <label className="fw-bold">Password</label>
                <input
                  type="password"
                  className="mb-3 w-50"
                  {...register('Password', {
                    required: 'Password is required',
                  })}
                />
                {errors.Password && <span>{errors.Password.message}</span>}
              </div>
              <input
                type="submit"
                value={'Delete My Account'}
                className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
                style={{ width: 'fit-content' }}
              />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
