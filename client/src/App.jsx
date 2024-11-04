import './styles/main.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap-icons/font/bootstrap-icons.css';
import { Switch, Route } from 'wouter';

import Navbar from './components/navbar';
import Footer from './components/footer';

import Main from './views/main';
import Application from './views/application';
import Dashboard from './views/dashboard';
import Questionnaire from './views/questionnaire';
import Login from './views/login';

function App() {
  return (
    <div style={{ width: '100%' }}>
      <Navbar />
      <Switch>
        <Route path="/" component={Main} />
        <Route path="/become-a-therapist" component={Application} />
        <Route
          path="/dashboard"
          component={() => <Dashboard tableHeaders="header" />}
        />
        <Route path="/questionnaire" component={Questionnaire} />
        <Route path="/login" component={Login} />
        <Route>404: No Page Here Boss</Route>
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
