import { useState, useEffect } from 'react';
import { fetchToken } from '../api/auth';
import { useLocation } from 'wouter';

const useTokenValidation = ({
  userId,
  adminId,
  storedToken = 'loginToken',
  redirect = true,
}) => {
  const [validated, setValidated] = useState(false);
  const [location, setLocation] = useLocation();

  console.log(location);

  useEffect(() => {
    const loadToken = () => {
      const token = fetchToken(storedToken);

      if (token && (userId || adminId)) {
        setValidated(true);
      } else {
        setValidated(false);
        if (redirect) {
          setLocation('/login');
        }
      }
    };

    loadToken();
  }, [userId, adminId, storedToken, redirect, setLocation]);

  return validated;
};

export { useTokenValidation };
