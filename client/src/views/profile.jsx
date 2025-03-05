import { useForm } from 'react-hook-form';
import { updateProfileInfo } from '../api/crud';

const Profile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => updateProfileInfo(data);

  return (
    <>
      <div
        className="container-fluid"
        style={{ minHeight: '80vh', padding: '15vh 7.5vw' }}
      >
        <div className="chiryo_rounded mb-5">
          <h1 className="display-3 fw-bolder mb-5">Profile Information</h1>
          <div className="chiryo_rounded chiryo_primary p-3 p-md-5">
            <form onSubmit={handleSubmit(onSubmit)}>
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
        </div>
      </div>
    </>
  );
};

export default Profile;
