import React, { useContext } from 'react'
import {
    BrowserRouter as Router,
    Switch,
  } from "react-router-dom";
import { AuthContext } from '../auth/AuthContext';
import { LoginScreen } from '../componentes/login/LoginScreen';
// import { MarvelScreen } from '../componentes/marvel/MarvelScreen';
import { DashboardRoutes } from './DashboardRoutes';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
// import { Navbar } from '../componentes/ui/Navbar';
export const AppRouter = () => {
    const {user} = useContext(AuthContext);
    return (
        <Router>
            <div>
                {/*<Navbar/>*/}
                <Switch>
                    <PublicRoute
                        exact path="/login"
                        component={LoginScreen}
                        isAuthenticated={user.logged}
                    />
                    {/* como el componente que se cargara al ir a la raiz es un router, que tiene mas rutas, entonces no se debe colocar la para propiedad exact */}
                    {/**
                     * PrivateRoute es un router creado por fernando, el cual lo que hace es que solo permite acceso a los usuarios autenticados,
                     * si no lo estan lo redirecciona al login
                     */}
                    <PrivateRoute
                        path="/"
                        component={DashboardRoutes}
                        isAuthenticated={user.logged}
                    />
                </Switch>
            </div>
        </Router>
    )
}
