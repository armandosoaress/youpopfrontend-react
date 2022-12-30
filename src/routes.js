import React from 'react'
import { BrowserRouter, Redirect, Switch, Route } from 'react-router-dom'
import Login from './page/Login/Login';
import Dashboard from './page/Dashboard/Dashboard';
import Dashboardcoordenador from './page/Dashboard-coordenador/Dashboard';
import Dashboardrecrutador from './page/Dashboard-recrutador/Dashboard';
import Dashboardsupervisor from './page/Dashboard-supervisor/Dashboard';
import Dashboardmotoboy from './page/Dashboard-motoboy/Dashboard';
import Dashboardeditar from './page/Dashboard-editar/Dashboard';
import Dashboardpagamento from './page/Pagamento/Dashboard';

import isAuthenticated from './auth';



const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route
        {...rest}
        render={props =>
            isAuthenticated() ? (
                <Component {...props} />
            ) : (
                <Redirect to={{ pathname: "/", state: { from: props.location } }} />
            )
        }
    />

);


const Routes = () => (
    <BrowserRouter>
        <Switch>
            <PrivateRoute exact path="/dashboard" name="Dashboard" component={Dashboard} />
            <PrivateRoute exact path="/dashboard/editar" name="Dashboardeditar" component={Dashboardeditar} />
            <PrivateRoute exact path="/dashboardcoodenador" name="dashboardcoodenador" component={Dashboardcoordenador} />
            <PrivateRoute exact path="/dashboardrecrutador" name="dashboardrecretados" component={Dashboardrecrutador} />
            <PrivateRoute exact path="/dashboardsupervisor" name="dashboardsupervisor" component={Dashboardsupervisor} />
            <PrivateRoute exact path="/dashboardmotoboy" name="dashboardmotoboys" component={Dashboardmotoboy} />
            <PrivateRoute exact path="/dashboardpagamento" name="dashboardpagamento" component={Dashboardpagamento} />
            <Route exact path="/" name="Login" component={Login} />
        </Switch>
    </ BrowserRouter>
);


export default Routes;