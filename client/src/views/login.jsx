import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';
import Form from '../components/form';

const Login = () => {
  return (
    <div className="chiryo_login_background" style={{ height: '100vh' }}>
      <motion.div
        {...animationOptions3}
        className="container-fluid"
        style={{
          width: '100%',
          minHeight: '80vh',
          padding: '15vh 0vw',
          margin: '0vh 5vw',
        }}
      >
        <Form formTitle={'Login'} />
      </motion.div>
    </div>
  );
};

export default Login;
