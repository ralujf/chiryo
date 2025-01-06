import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';

const Form = ({ formTitle, method }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => method(data);

  return (
    <div className="chiryo_rounded chiryo_primary w-50 p-5">
      <h1 className="display-3 fw-bolder mb-5">{formTitle}</h1>
      <form className="d-flex flex-column" onSubmit={handleSubmit(onSubmit)}>
        <input
          className="mb-3 w-50"
          placeholder="email@example.com"
          {...register('Email', {
            required: true,
            maxLength: 20,
            pattern: /^[@]/g,
          })}
        />
        <input
          className="mb-3 w-50"
          {...register('Password', { required: true })}
        />
        {errors.email && errors.password && <span>Password is required</span>}
        <button
          type="submit"
          className="btn chiryo_rounded chiryo_primary_action chiryo_shadow"
          style={{ width: 'fit-content' }}
        >
          Login
        </button>
      </form>
    </div>
  );
};

Form.propTypes = {
  formTitle: PropTypes.string.isRequired,
  method: PropTypes.func,
};

export default Form;
