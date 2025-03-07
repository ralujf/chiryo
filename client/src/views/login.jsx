import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import { loginUser } from '../api/crud';
import Form from '../components/form';

const Login = () => {
  return (
    <div className="chiryo_login_background vh-100">
      <motion.div
        {...animationOptions3}
        className="container-fluid w-100 min-vh-75"
        style={{
          padding: '15vh 0vw',
          margin: '0vh 5vw',
        }}
      >
        <Form
          formTitle={'Login'}
          submissionMethod={loginUser}
          submissionText="Login"
        />
      </motion.div>
    </div>
  );
};

export default Login;
