import { heroes } from "../data/heroes";

export const getHeroePorId = (id)=>{

    return heroes.find((heroe)=>heroe.id === id);
}