import React from 'react'
import { Link } from 'react-router-dom'
import { heroeImagenes } from '../../helpers/heroeImagenes';

export const HeroeCard = ({
    id,
    superhero,
    publisher,
    alter_ego,
    first_appearance,
    characters
    }) => {
    return (
        <div className="col">
            <div className="card h-100">
                <div className='row no-gutters'>
                    <div className='col-md-4'>
                        <img
                            // src={`./assets/heroes/${id}.jpg`}
                            src={ heroeImagenes(`./${id}.jpg`).default }
                            className='card-img'
                            alt={superhero}  
                        />
                    </div>
                    <div className='col-md-8'>
                        <div className='card-body'>
                            <h5 className='card-title'>{superhero}</h5>
                            <p className='card-text'>{alter_ego}</p>
                            {
                                (alter_ego!== characters) &&
                                <p className='card-text'>{characters}</p>
                            }
                            <p className='card-text'>
                                <small className='text-muted'>
                                    {first_appearance}
                                </small>
                            </p>
                            <Link to={`./heroe/${id}`} >
                                Mas...
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
