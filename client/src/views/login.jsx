import { motion } from 'motion/react';
import { animationOptions3 } from '../styles/animations';

import { useIdentityStore } from '../state/state';
import { useTokenValidation } from '../hooks/useTokenValidation';
import { loginUser } from '../api/crud';

import LoginForm from '../components/loginForm';
import { Redirect } from 'wouter';
import usePageInfo from '../hooks/usePageInfo';

const Login = () => {
  usePageInfo({
    title: 'Login | Chiryō',
    metaDescription: 'Login into your Chiryo account to access therapist',
  });
  const { userId, adminId } = useIdentityStore((state) => state);
  const validated = useTokenValidation({ userId, adminId });

  return validated ? (
    <div className="vh-100">
      <Redirect to="/dashboard" />
    </div>
  ) : (
    <div className="chiryo_login_background vh-100">
      <motion.div
        {...animationOptions3}
        className="container-fluid w-100 min-vh-75"
        style={{
          padding: '15vh 0vw',
          margin: '0vh 5vw',
        }}
      >
        <LoginForm
          formTitle={'Login'}
          submissionMethod={loginUser}
          submissionText="Login"
        />
      </motion.div>
    </div>
  );
};

export default Login;
