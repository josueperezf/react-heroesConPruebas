import React from 'react'
import { HeroeList } from '../heroes/HeroeList'

export const MarvelScreen = () => {
    const publisher = 'Marvel Comics';
    return (
        <div>
            <h1>MARVEL SCREEN</h1>
            <hr/>
            <HeroeList publisher={publisher} />
        </div>
    )
}
