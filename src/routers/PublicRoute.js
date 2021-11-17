import { useContext } from 'react';

import { Navigate } from 'react-router-dom';
import { AuthContext } from '../auth/AuthContext';

export const PublicRoute = ({ children }) => {

    const { user } = useContext(AuthContext )
    

    return user.logged
        ? <Navigate to="/" />
        : children
}


// import React from 'react';
// import { Navigate, Route } from 'react-router-dom';
// import PropTypes from 'prop-types';

// export const PublicRoute = ({
//     isAuthenticated,
//     component:Component,
//     ...rest
// }) => {
//     return (
//         <Route
//             {...rest}
//             component={ (props)=>(
//                 (!isAuthenticated)
//                     ? (<Component {...props} />)
//                     : (<Navigate to='/' />)
//             )}
//         />
//     )
// }

// PublicRoute.propTypes = {
//     isAuthenticated:PropTypes.bool.isRequired,
//     component:PropTypes.func.isRequired
// }