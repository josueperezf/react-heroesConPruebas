import React, { useContext } from 'react'
import { useNavigate } from 'react-router';
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const LoginScreen = () => {
    const {dispatch} = useContext(AuthContext);
    const navigate = useNavigate();
    const handleLogin = ()=>{
        // la ultima ruta es para redireccionar al usuario a la ultima ruta en la que estuvo, si ese valor esta vacio, lo lleva a  la raiz
        const ruta = localStorage.getItem('ultimaRuta') || '/';
        dispatch({
            type:types.login,
            payload: {
                name:'josue'
            }
        });
        // history.push('/');
        navigate(ruta);
    }
    return (
        <div className='container mt-5'>
            <h1>Login</h1>
            <hr/>
            <button
                className='btn btn-primary'
                onClick={handleLogin}
            >
                Login
            </button>
        </div>
    )
}
