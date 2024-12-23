import Form from '../components/form';

const Login = () => {
  return (
    <div
      className="container-fluid main-container"
      style={{ width: '100%', minHeight: '80vh', margin: '15vh 5vw' }}
    >
      <Form formTitle={'Login'} />
    </div>
  );
};

export default Login;
