import { Routes, Route } from 'react-router-dom';
import { Navbar } from '../componentes/ui/Navbar';

import { MarvelScreen } from '../componentes/marvel/MarvelScreen';
import { HeroeScreen } from '../componentes/heroes/HeroeScreen';
import { DcScreen } from '../componentes/dc/DcScreen';
import { SearchScreen } from '../componentes/search/SearchScreen';

export const DashboardRoutes = () => {


    return (
        <>
            <Navbar />

            <div className="container mt-2">
                <Routes>
                    <Route path="/marvel" element={ <MarvelScreen /> } />
                    <Route path="/heroe/:heroeId" element={ <HeroeScreen /> } />
                    <Route path="/dc" element={ <DcScreen /> } />
                    <Route path="/search" element={ <SearchScreen /> } />
                    
                    <Route path="/" element={ <MarvelScreen /> } />

                </Routes>
            </div>


        </>
    )
}