import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import { useForm } from 'react-hook-form';
import applicationImage from '../assets/chiryohero-application.png';
import { sendApplication } from '../api/crud';

// TODO: Refactor to use same form
const Application = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => sendApplication(data);

  return (
    <>
      <div
        className="container-fluid"
        style={{ minHeight: '80vh', padding: '15vh 7.5vw' }}
      >
        <div className="justify-content-evenly chiryo_rounded mb-5">
          <div>
            <motion.h1
              {...animationOptions3}
              className="display-3 fw-bolder mb-5"
            >
              Requirements
            </motion.h1>
            <div className="row">
              <div className="col-md-6">
                <motion.div
                  {...animationOptions3}
                  className="mb-3 mb-md-0 h-100 flex-grow-1 max-w-50 chiryo_rounded chiryo_primary p-3 p-md-5"
                >
                  <h2>You must have...</h2>
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
                </motion.div>
              </div>
              <div className="col-md-6">
                <motion.img
                  {...animationOptions3}
                  src={applicationImage}
                  className="z-1"
                  alt="application image"
                  width={'100%'}
                />
              </div>
            </div>
          </div>

          <div className="chiryo_rounded" style={{ margin: '30vh 0vw' }}>
            <motion.h1
              {...animationOptions3}
              className="display-3 fw-bolder mb-5"
            >
              Application Form
            </motion.h1>
            <motion.div
              {...animationOptions3}
              className="mb-3 mb-md-0 chiryo_rounded chiryo_primary p-3 p-md-5"
            >
              <form
                encType="multipart/form-data"
                onSubmit={handleSubmit(onSubmit)}
              >
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
                  <label htmlFor="number" className="form-label">
                    Age
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="age"
                    min="12"
                    max="100"
                    {...register('age', { required: false })}
                  />
                  {errors.age && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="ethnicBackground" className="form-label">
                    Ethnic Background
                  </label>
                  <select
                    className="form-select"
                    id="ethnicBackground"
                    {...register('ethnicBackground', { required: true })}
                  >
                    <option value="">Select Ethnic Background</option>
                    <option value="asian">Asian</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="hispanic">Hispanic</option>
                    <option value="nativeAmerican">Native American</option>
                    <option value="pacificIslander">Pacific Islander</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.ethnicBackground && (
                    <span>This field is required</span>
                  )}
                </div>
                <div className="mb-3">
                  <label htmlFor="religion" className="form-label">
                    Religion
                  </label>
                  <select
                    className="form-select"
                    id="religion"
                    {...register('religion', { required: true })}
                  >
                    <option value="">Select Religion</option>
                    <option value="christianity">Christianity</option>
                    <option value="islam">Islam</option>
                    <option value="hinduism">Hinduism</option>
                    <option value="buddhism">Buddhism</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.religion && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="expertise" className="form-label">
                    Expertise
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="expertise"
                    {...register('expertise', { required: true })}
                  />
                  {errors.expertise && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="yoe" className="form-label">
                    Years of Experience
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="yoe"
                    {...register('yoe', { required: true })}
                  />
                  {errors.yoe && <span>This field is required</span>}
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
                    <option value="psychology">Psychology BSc (Hons)</option>
                    <option value="nursing">Nursing BSc (Hons)</option>
                    <option value="medicine">Medicine BSc (Hons)</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.credentials && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="postgraduateDegree" className="form-label">
                    Postgraduate Degree
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="postgraduateDegree"
                    {...register('postgraduateDegree', { required: true })}
                  />
                  {errors.postgraduateDegree && (
                    <span>This field is required</span>
                  )}
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
            </motion.div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Application;
