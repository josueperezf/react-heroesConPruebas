import { mount } from "enzyme";
import { MemoryRouter, Route } from "react-router";
import { SearchScreen } from "../../../componentes/search/SearchScreen";

describe('Pruebas en <SearchScreen/>',()=>{

    // mostrar los valores por default
    test('debe de mostrarse correctamente con los valores por default', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search']}>
                <Route path='/search' component={()=><SearchScreen/> } />
            </MemoryRouter>
        );
        expect(wrapper).toMatchSnapshot();
        // tomo un elemento html que debio renderizarse lo hizo
        expect(wrapper.find('.alert-info').exists()).toBe(true);
    });

    // que lo que yo pase por url como parametro lo coloque en 
    test('debe de mostrar a batman, y el input con el valor del querystring', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman']}>
                <Route path='/search' component={()=><SearchScreen/> } />
            </MemoryRouter>
        );
        expect(wrapper.find('input').prop('value')).toBe('batman');
        expect(wrapper).toMatchSnapshot();
    });

    test('debe de mostrar un error si no se encuentra el heroe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman-xxx-x-x-para-q-no-encuentre']}>
                <Route path='/search' component={()=><SearchScreen/> } />
            </MemoryRouter>
        );
        //si no encuentra al heroe, debe mostrar un div con texto y una clase css llamada alert-danger, si esa clase esta es porque no encontro
        expect(wrapper.find('.alert-danger').exists()).toBe(true);
    });

    test('debe de llamar el push del history', () => {
        const history = {
            push:jest.fn()
        };
        const wrapper = mount(
            <MemoryRouter initialEntries={['/search?q=batman-xxx-x-x-para-q-no-encuentre']}>
                <Route path='/search' component={()=><SearchScreen history={history} /> } />
            </MemoryRouter>
        );
        wrapper.find('input').simulate('change',{
            target:{
                name:'buscar',
                value:'batman'
            }
        });
        // en la siguiente linea simulo el submit del formulario
        wrapper.find('form').prop('onSubmit')({
            preventDefault(){}
        });
        // verifico si el push fue llamado con el parametro batman
        expect( history.push ).toHaveBeenCalledWith(`?q=batman`);
    });
     
});