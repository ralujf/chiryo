import Form from '../components/form';

const SignUp = () => {
  return (
    <div
      className="container-fluid main-container"
      style={{
        width: '100vw',
        height: '100vh',
        maxWidth: '100%',
        minHeight: '80vh',
        padding: '15vh 5vw',
      }}
    >
      <Form formTitle={'Sign Up'} />
    </div>
  );
};

export default SignUp;
