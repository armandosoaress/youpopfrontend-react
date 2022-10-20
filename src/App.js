import './App.css';
// import Grid from './componentes/login/Login';
import{ BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import Login from './page/Login/Login';



function App() {
  return (
    <>
    <Router>

      {/* <ul>
        <li><Link to='/'>INICIO</Link></li>
        <li><Link to='/login'>INICIO</Link></li>
      </ul> */}
      <Switch>
      <Route path="/login" name="Login" component={Login} />
      </Switch>
    </Router>
   </>
  );
}
export default App;
  