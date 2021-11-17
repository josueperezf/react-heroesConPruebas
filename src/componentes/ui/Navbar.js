import React, { useContext } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { AuthContext } from '../../auth/AuthContext';
import { types } from '../../types/types';

export const Navbar = () => {
    // los use context nos permite obtener informacion que esta en context 
    const {user='',dispatch} = useContext(AuthContext);
    // como navbar no esta en las opciones del router, no contamos con el history como parametro, para solucionar ello podemos
    // desde el DashboardRouter, pasarle como parametro la funcion history a nuestro navbar, y con ello navegar, pero no es la mejor opcion
    // la mejor opcion es usar el hook useHistory() que nos trae toda esta informacion sin estar pasando parametros a las funciones o componentes
    const navegate = useNavigate();

    const handleLogout = ()=>{
        // console.log('logout');
        dispatch({
            type:types.logout
        });
        navegate('/login');
    }

    return (
        <nav className="navbar navbar-expand-sm navbar-dark bg-dark">
            
            <Link 
                className="navbar-brand" 
                to="/"
            >
                Asociaciones
            </Link>

            <div className="navbar-collapse">
                <div className="navbar-nav">

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active' : ''}` }
                        to="/marvel"
                    >
                        Marvel
                    </NavLink>

                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active' : ''}` }
                        to="/dc"
                    >
                        DC
                    </NavLink>
                    <NavLink 
                        className={ ({isActive}) => `nav-item nav-link ${ isActive ? 'active' : ''}` }
                        to="/search"
                    >
                        Buscar
                    </NavLink>
                </div>
            </div>

            <div className="navbar-collapse collapse order-3 dual-collapse2">
                <ul className="navbar-nav ms-auto">
                    <span className='nav-item nav-link text-info'>
                        {
                            (user !== '') && user.name

                        }
                    </span>
                    <button 
                        className="nav-item nav-link btn"
                        onClick={handleLogout}
                    >
                        Logout
                    </button>
                </ul>
            </div>
        </nav>
    )
}