import { heroes } from "../data/heroes";

export const getHeroesPorPublisher = (publisher)=>{

    const publisherValidos  = ['DC Comics', 'Marvel Comics'];
    if (!publisherValidos.includes(publisher)) {
        throw new Error(`Publisher ${publisher} no es valido`);
    }
    return heroes.filter((heroe)=>heroe.publisher === publisher);
}