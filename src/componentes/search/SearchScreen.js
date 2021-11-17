import React, { useMemo } from 'react';
import { useForm } from '../../hooks/useForm';
import { HeroeCard } from '../heroes/HeroeCard';
import queryString from 'query-string';
import { useNavigate, useLocation  } from 'react-router-dom';
import { getHeroePorName } from '../../selectores/getHeroePorName';

export const SearchScreen = () => {
    // para obtener los parametros url por get
    const location = useLocation()
    const navigate = useNavigate();
    // se usa el plugin query-string que sirve para convertir en objeto todos los parametros que envien por url
    // recibe el query string, ejemplo ?q=abc, resultado seria {q=abc}
    //{ q = '' } hace que si la variable no se la enviaron por url, entonces coloquele de valor comillas vacias para q no quede undefined
    const { q = '' } = queryString.parse(location.search);
    
    const [ formValues, handleInputChange] = useForm({
        buscar:q,
    });
    const {buscar} = formValues;

    // la siguiente linea hay que ponerla en un memo para evitar que cada vez que alguien escriba haga la busqueda,
    // ya que se programo para que busque solo con el boton submit
    // como la variable busqueda cambia de valor cada vez que alguien escribe en el iput, entonces realizar la busqueda, pero ello no es el requerimiento
    // const heroesFiltered = getHeroePorName(buscar);
    const heroesFiltered = useMemo(() => getHeroePorName(q), [q]);
    // no se para que uso el memo si con la siguiente linea hace lo mismo
    // const heroesFiltered = getHeroePorName(q);

    const handleSearch =(e)=> {
        e.preventDefault();
        navigate(`?q=${buscar}`);
    }
    return (
        <div>
            <h1>SearchScreen</h1>
            <hr/>
            <div className='row'>
                <div className='col-5'>
                    <h4>Search Form</h4>
                    <hr/>
                    <form onSubmit={handleSearch} >
                        <input
                            type='text'
                            placeholder='Buscar Heroe'
                            className='form-control'
                            name='buscar'
                            autoComplete="off"
                            autoCapitalize="true"
                            value={buscar}
                            onChange={ handleInputChange }
                        />
                        <button
                            type='submit'
                            className='btn m-1 w-100 btn-outline-primary'
                        >
                            Buscar
                        </button>
                    </form>
                </div>
                <div className='col-7'>
                    <h4>Resultados</h4>
                    <hr/>
                    {
                        (q === '') &&
                        <div className='alert alert-info'>
                            Busqueda de heroe
                        </div>
                    }

                    {
                        (q !== '' && heroesFiltered.length ===0) &&
                        <div className='alert alert-danger'>
                            Heroe no encontrado {q}
                        </div>
                    }

                    {
                        heroesFiltered.map(heroe =>(
                            <HeroeCard key={heroe.id} {...heroe} />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}
