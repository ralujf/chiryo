import PropTypes from 'prop-types';
import { Route, Redirect } from 'wouter';
import { fetchJWT } from './auth';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = fetchJWT();
  return (
    <Route
      {...rest}
      component={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
}
PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};

export { PrivateRoute };
