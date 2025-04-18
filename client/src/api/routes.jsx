import PropTypes from 'prop-types';
import { Route, Redirect } from 'wouter';

function PrivateRoute({ component: Component, ...rest }) {
  const isAuthenticated = localStorage.getItem('jwtToken');
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
