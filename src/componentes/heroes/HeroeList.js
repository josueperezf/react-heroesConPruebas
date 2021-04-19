import React, { useMemo } from 'react'
import { getHeroesPorPublisher } from '../../selectores/getHeroesPorPublisher'
import { HeroeCard } from './HeroeCard';

export const HeroeList = ({publisher}) => {

    // puede ser 'DC Comics', 'Marvel Comics'
    // const heroes = getHeroesPorPublisher(publisher);
    // la siguiente linea es para que no cargue la data si el publisher contiene el mismo valor cuando alguien esta en esta ruta, va a otra y luego da atras
    const heroes = useMemo(() => getHeroesPorPublisher(publisher), [publisher]);

    return (
        <div className='row row-cols-1 row-cols-md-3 g-4 animate__animated animate__fadeIn'>
           {
               heroes.map((heroe) => (
                    <HeroeCard key={heroe.id} {...heroe} />
                   )
               )
           } 
        </div>
    )
}
