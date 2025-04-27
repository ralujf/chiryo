import './app.css';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import { Switch, Route } from 'wouter';
import { PrivateRoute } from './api/privateRoutes';

import Navbar from './components/navbar';
import Footer from './components/footer';

import Main from './views/main';
import Application from './views/application';
import Dashboard from './views/dashboard';
import Questionnaire from './views/questionnaire';
import Login from './views/login';
import Profile from './views/profile';
import Admin from './views/admin';

import UserInfo from './views/userInfo';
import TherapistInfo from './views/therapistInfo';
import About from './views/about';
import ScrollToTop from './components/scrollToTop';

const NotFound = () => (
  <div className="d-flex justify-content-center align-items-center vw-100 vh-100">
    <h1>404: No Page Here Boss 👷</h1>
  </div>
);

function App() {
  return (
    <div className="min-vh-100 min-vw-100">
      <Navbar />
      <ScrollToTop />
      <Switch>
        <Route path="/" component={Main} />
        <Route path="/become-a-therapist" component={Application} />
        <Route path="/questionnaire" component={Questionnaire} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={About} />
        <Route path="/info" component={UserInfo} />
        <Route path="/become-a-therapist/info" component={TherapistInfo} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute path="/applicants" component={Admin} />
        <Route>{NotFound}</Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
