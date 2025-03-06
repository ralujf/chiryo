import './app.css';
import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Switch, Route } from 'wouter';
import { PrivateRoute } from './api/routes';

import Navbar from './components/navbar';
import Footer from './components/footer';

import Main from './views/main';
import Application from './views/application';
import Dashboard from './views/dashboard';
import Questionnaire from './views/questionnaire';
import Login from './views/login';
import Profile from './views/profile';

// Stateless pages
import userInfo from './views/userInfo';
import therapistInfo from './views/therapistInfo';
import about from './views/about';
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
        <PrivateRoute path="/dashboard" component={<Dashboard />} />
        <PrivateRoute path="/profile" component={<Profile />} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/questionnaire" component={Questionnaire} />
        <Route path="/login" component={Login} />
        <Route path="/about" component={about} />
        <Route path="/info" component={userInfo} />
        <Route path="/become-a-therapist/info" component={therapistInfo} />
        <Route>{NotFound}</Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
