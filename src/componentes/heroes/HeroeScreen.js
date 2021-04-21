import React, { useMemo } from 'react'
import { Redirect, useParams } from "react-router-dom";
import { getHeroePorId } from '../../selectores/getHeroePorId';
import { heroeImagenes } from '../../helpers/heroeImagenes';
// el router nos envia parametros, entre ellos el match alli estan los parametros url
//export const HeroeScreen = ({match}) => {
// la siguiente linea obtiene el parametro usando match que el router envia a cada subcomponente
// const heroeId  = match.params['heroeId'];

export const HeroeScreen = ({history}) => {
    // la siguiente linea obtiene el parametro usando el hook 
    const {heroeId} = useParams();
    //const heroe = getHeroePorId(heroeId);
    // la siguiente linea es para que no cargue la data si el publisher contiene el mismo valor cuando alguien esta en esta ruta, va a otra y luego da atras
    const heroe = useMemo(() => getHeroePorId(heroeId), [heroeId]);
    // sino tiene un heroe, se debe salir
    if(!heroe ) {
        return <Redirect to="/" />
    }
    const {id,superhero,publisher,alter_ego,first_appearance,characters} = heroe;
    
    const handleReturn = ()=>{
        // si la persona tiene historial de navegacion, va al historial anterior
        // si no tiene historial lo manda a la raiz
        if (history.length <= 2) {
            history.push('/');
        }
        history.goBack();
    }
    return (
        <div className='row no-gutters'>
            <div className='col-4 col-md-4'>
                <img
                    //src={`../assets/heroes/${id}.jpg`} asi es de forma estatica
                    // src={ heroeImagenes(`./dc-superman.jpg`).default }
                    src={ heroeImagenes(`./${id}.jpg`).default }
                    alt={superhero}
                    className='img-thumbnail animate__animated animate__fadeInLeft'
                />
            </div>
            <div className='col-8 col-md-8'>
                <h3>{superhero}</h3>
                <ul className='list-group list-group-flush'>
                    <li className='list-group-item'><b>Alter eog:</b>{alter_ego}</li>
                    <li className='list-group-item'><b>Publisher:</b>{publisher}</li>
                    <li className='list-group-item'><b>First appearance:</b>{first_appearance}</li>
                </ul>

                <h5>Characters</h5>
                <p> {characters} </p>

                <button
                    className='btn btn-outline-info'
                    onClick={handleReturn}
                >
                    Return
                </button>
            </div>
        </div>
    )
}
