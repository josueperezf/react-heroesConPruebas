import React from 'react'
import { HeroeList } from '../heroes/HeroeList'

export const DcScreen = () => {
    const publisher = 'DC Comics';
    return (
        <div>
            <h1>Dc Screen</h1>
            <hr/>
            <HeroeList publisher={publisher} />
        </div>
    )
}
