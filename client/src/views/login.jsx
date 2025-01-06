import Form from '../components/form';

const Login = () => {
  return (
    <div className="chiryo_login_background" style={{ height: '100vh' }}>
      <div
        className="container-fluid main-container"
        style={{
          width: '100%',
          minHeight: '80vh',
          padding: '15vh 0vw',
          margin: '0vh 5vw',
        }}
      >
        <Form formTitle={'Login'} />
      </div>
    </div>
  );
};

export default Login;
