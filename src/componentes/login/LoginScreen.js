import React, { useContext } from 'react'
import { AuthContext } from '../../auth/AuthContext'
import { types } from '../../types/types';

export const LoginScreen = ({history}) => {
    // como se esta usando el plugin react-router-dom, el envia a cada componente que renderiza la siguiente informacion
    // {history: {…}, location: {…}, match: {…}, staticContext: undefined}
    // lo que nos permite saber en pagina estamos, nos ofrece ciertos metodos, entre otras cosas
    // history.push nos sirve para redireccionar pero si en el navegador presionamos el back nos lleva a la ruta anterior de
    // history.replace nos lleva a otra ruta, pero borra la anterior ruta del historial de navegacion, si tratamos de volver en el navegador no encontraremos la ruta anterior
    const {dispatch} = useContext(AuthContext);
    
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
        history.replace(ruta);
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
