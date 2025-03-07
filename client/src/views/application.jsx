import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import { useForm } from 'react-hook-form';
import { ToastContainer, toast } from 'react-toastify';
import applicationImage from '../assets/chiryohero-application.png';
import { sendApplication } from '../api/crud';

const Application = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const pdfFile = data.pdfInformation[0];
    const pdfBlob = new Blob([pdfFile], { type: pdfFile.type });
    const formData = { ...data, pdfInformation: pdfBlob.bytes };

    const response = await sendApplication({ data: formData });
    if (response === 'Application Submitted') {
      notify(response);
    } else {
      notifyError(response);
    }
  };

  const notify = (message) =>
    toast.success('Success! ' + message, {
      position: 'bottom-center',
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: 'light',
    });

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
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    required
                    type="password"
                    className="form-control"
                    id="password"
                    {...register('password', { required: false })}
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
                    min="12"
                    max="100"
                    {...register('age', { required: false })}
                  />
                  {errors.age && <span>This field is required</span>}
                </div>

                <div className="mb-3">
                  <label htmlFor="background" className="form-label">
                    Ethnic Background
                  </label>
                  <select
                    className="form-select"
                    id="background"
                    {...register('background', { required: true })}
                  >
                    <option value="">Select Ethnic Background</option>
                    <option value="asian">Asian</option>
                    <option value="black british">Black British</option>
                    <option value="black african">Black African</option>
                    <option value="white british">White British</option>
                    <option value="hispanic">Hispanic</option>
                    <option value="nativeAmerican">Native American</option>
                    <option value="pacificIslander">Pacific Islander</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.background && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="race" className="form-label">
                    Race
                  </label>
                  <select
                    className="form-select"
                    id="race"
                    {...register('race', { required: true })}
                  >
                    <option value="">Select Race</option>
                    <option value="asian">Asian</option>
                    <option value="black">Black</option>
                    <option value="white">White</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.race && <span>This field is required</span>}
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
                  <label htmlFor="pdfInformation" className="form-label">
                    Upload Resume
                  </label>
                  <input
                    type="file"
                    className="form-control"
                    id="pdfInformation"
                    {...register('pdfInformation', { required: true })}
                  />
                  {errors.pdfInformation && <span>This field is required</span>}
                </div>
                <div className="mb-3">
                  <label htmlFor="location" className="form-label">
                    Location
                  </label>
                  <select
                    className="form-select"
                    id="location"
                    {...register('location', { required: true })}
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
                  {errors.location && <span>This field is required</span>}
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
