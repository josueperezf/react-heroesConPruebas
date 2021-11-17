import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { HeroeScreen } from "../../../componentes/heroes/HeroeScreen";

describe('Pruebas en <HeroeScreen/>',()=>{
    const history = {
        length:10,
        push:jest.fn(),
        goBack:jest.fn(),
    }
    // MemoryRouter se usa sobre todo para que si el  componente que tenemos dentro, usa link o cosas asi, funcionen
    // initialEntries es un objeto que llevara la url y los parametros que queramos enviarles
    
    test('debe mostrar el componente redirect si no hay argumentos en el url', () => {
        const wrapper =  mount(
                            <MemoryRouter initialEntries={['/heroe']}>
                                <HeroeScreen history={history} />
                            </MemoryRouter>
                            );
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });

    test('debe de mostrar un heroe si el parametro url existe y se encuentra', () => {
        // <Route> es para crear una ruta ficticio
        // <Route path='/heore/:heroeId'> es para simular que esta entrando a ese router
        const wrapper =  mount(
            <MemoryRouter initialEntries={['/heroe/marvel-thor']}>
                <Route path='/heroe/:heroeId' component={HeroeScreen} />
            </MemoryRouter>
            );
        expect(wrapper.find('.row').exists()).toBe(true);
    });

    test('debe de regresar a la pantalla anterior con PUSH', () => {
        // el push se llama solo si history.length es menor a 2
        const history = {
            length:1,
            push:jest.fn(),
            goBack:jest.fn(),
        };
        // <Route> es para crear una ruta ficticio
        // <Route path='/heore/:heroeId'> es para simular que esta entrando a ese router
        const wrapper =  mount(
            <MemoryRouter initialEntries={['/heroe/marvel-thor']}>
                <Route
                    path='/heroe/:heroeId'
                    component={()=><HeroeScreen  history={history}/> }
                />
            </MemoryRouter>
            );
        // simulo click, si estuvieran varios botones podria usar at(1) , at(2)
        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledWith('/');
        // expect(history.goBack).not.toHaveBeenCalled();
    });

    // goBack es por que si en el historial de navegacion tiene mas te dos, usa una forma te ir a tras, sino usa otra
    test('debe de regresar a la pantalla anterior con goBack', () => {
        // <Route> es para crear una ruta ficticio
        // <Route path='/heore/:heroeId'> es para simular que esta entrando a ese router
        const wrapper =  mount(
            <MemoryRouter initialEntries={['/heroe/marvel-thor']}>
                <Route
                    path='/heroe/:heroeId'
                    component={()=><HeroeScreen  history={history}/> }
                />
            </MemoryRouter>
            );
        // simulo click
        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledTimes(0);
        expect(history.goBack).toHaveBeenCalled();
    });

    test('debe de llamar a Redirect sin el heroe pasado por url no existe', () => {
        // <Route> es para crear una ruta ficticio
        // <Route path='/heore/:heroeId'> es para simular que esta entrando a ese router
        const wrapper =  mount(
            <MemoryRouter initialEntries={['/heroe/marvel-thor-texto-adicional-para-que-no-encuentre-al-heroe']}>
                <Route
                    path='/heroe/:heroeId'
                    component={()=><HeroeScreen  history={history}/> }
                />
            </MemoryRouter>
            );
        // NO ESTOY DEACUERDO CON LA PRUEBA, NOTO QUE NO PREGUNTO SI EL COMPONENTE REDIRECT ESTA Y QUE LA HIZO POR SALIR DEL PASAO
        expect(wrapper.text()).toBe('');
    })
    
});