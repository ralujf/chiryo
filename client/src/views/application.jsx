import { useForm } from 'react-hook-form';

// TODO: Refactor to use same form
const Application = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <div
      className="container-fluid main-container"
      style={{ width: '50%', minHeight: '80vh', margin: '15vh 5vw' }}
    >
      <div className="justify-content-center chiryo_rounded mb-5">
        <h1 className="display-3 fw-bolder mb-5">Requirements</h1>
        <div className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5">
          <h2 className="">You must have...</h2>
          <ul>
            <li>Testimonials from previous clients</li>
            <li>
              Degree in field of Psychology, Nursing or other Mental
              Health/Social Work Studies
            </li>
            <li>Strong & demonstrable communication skills</li>
            <li>Professional Accreditation (BACP, NCS, UKCP)</li>
            <li>Good Vibes ☀️</li>
          </ul>
        </div>
      </div>

      <div className="chiryo_rounded">
        <h1 className="display-3 fw-bolder mb-5">Application Form</h1>
        <div className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5">
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-3">
              <label htmlFor="firstName" className="form-label">
                First Name
              </label>
              <input
                type="text"
                className="form-control"
                id="firstName"
                {...register('firstName', { required: true })}
              />
              {errors.firstName && <span>This field is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="lastName" className="form-label">
                Last Name
              </label>
              <input
                type="text"
                className="form-control"
                id="lastName"
                {...register('lastName', { required: true })}
              />
              {errors.lastName && <span>This field is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email Address
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
              <label htmlFor="credentials" className="form-label">
                Credentials
              </label>
              <select
                className="form-select"
                id="credentials"
                {...register('credentials', { required: true })}
              >
                <option value="">Select your credentials</option>
                <option value="credential1">Credential 1</option>
                <option value="credential2">Credential 2</option>
                <option value="credential3">Credential 3</option>
              </select>
              {errors.credentials && <span>This field is required</span>}
            </div>
            <div className="mb-3">
              <label htmlFor="resume" className="form-label">
                Upload Resume
              </label>
              <input
                type="file"
                className="form-control"
                id="resume"
                {...register('resume', { required: true })}
              />
              {errors.resume && <span>This field is required</span>}
            </div>
            <button
              type="submit"
              className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Application;
