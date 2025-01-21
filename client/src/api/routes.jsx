import { Route, Redirect } from 'wouter';

// @cbbfcd : wouter issues #223
function PrivateRoute(props, Component) {
  const renderChildren = () =>
    localStorage.getItem('jwtToken') ? (
      <Component {...props} />
    ) : (
      <Redirect to="/login" />
    );
  return <Route>{renderChildren}</Route>;
}

export { PrivateRoute };
