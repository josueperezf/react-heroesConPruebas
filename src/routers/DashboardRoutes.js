import React from 'react'
import {
    Switch,
    Route,
    Redirect
  } from "react-router-dom";
import { DcScreen } from '../componentes/dc/DcScreen';
import { HeroeScreen } from '../componentes/heroes/HeroeScreen';
import { MarvelScreen } from '../componentes/marvel/MarvelScreen';
import { SearchScreen } from '../componentes/search/SearchScreen';
import { Navbar } from '../componentes/ui/Navbar'

export const DashboardRoutes = () => {
    return (
        <>
            <Navbar/>
            <div className='container mt-2'>
                <Switch>
                    <Route exact path="/marvel" component={MarvelScreen} />
                    <Route exact path="/heroe/:heroeId" component={HeroeScreen } />
                    <Route exact path="/dc" component={DcScreen} />
                    <Route exact path="/search" component={SearchScreen} />
                    <Redirect to='/marvel' />
                </Switch>
            </div>
        </>
    )
}
