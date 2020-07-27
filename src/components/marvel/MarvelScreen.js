import React from 'react';
import { HeroList } from '../heroes/HeroList';



export const MarvelScreen = () => {
    
    const publisher = 'Marvel Comics';
    
    
    return (
        <div>
            <h1>MarvelScreen</h1>
            <hr />
            <HeroList publisher={publisher} />
        </div>
    )
}
