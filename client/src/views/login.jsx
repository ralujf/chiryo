import Form from '../components/form';

const Login = () => {
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
      <Form formTitle={'Login'} />
    </div>
  );
};

export default Login;
