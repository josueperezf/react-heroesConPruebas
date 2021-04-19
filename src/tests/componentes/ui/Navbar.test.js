import { mount } from "enzyme";
import { MemoryRouter, Router } from "react-router";
import { AuthContext } from "../../../auth/AuthContext";
import { Navbar } from "../../../componentes/ui/Navbar";
import { types } from '../../../types/types';

describe('Pruebas en <Navbar/>', ()=>{

    // historyMock se crea para hacer pruebas en el hook useHistory(), simulara como si el router le enviara el history
    //historyMock seria como el objeto hitory que recibe cada componente que se llama con el router, para emularlo bien, le agregamos las funciones que el contiene asi no las usemos
    const historyMock = {
        push:jest.fn(),
        replace:jest.fn(),
        location:{},
        listen:jest.fn(),
        createHref:jest.fn(),
    };

    const contextValue = {
        dispatch:jest.fn(),
        user:{
            logged:true,
            name:'josue'
        }
    }
    // es para probar lo del router
    const wrapper = mount(
                        <MemoryRouter>
                            <AuthContext.Provider value={contextValue}>
                                <Router history={historyMock}>
                                    <Navbar/>
                                </Router>
                            </AuthContext.Provider>
                        </MemoryRouter>
                         );
    // siempre que se hace un tipo de mock es recomendable limpiarlo
    afterEach(()=>{
        // esto es para 
        jest.clearAllMocks();
    });

    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('josue');
    });

    test('debe de llamar el logout y usar el history', () => {
        // es lo es lo mismo que lo descomentado, saca la propiedad click del boton y con los parentesis la ejecuta
        // wrapper.find('button').prop('onClick')();
        wrapper.find('button').simulate('click');
        expect(contextValue.dispatch).toHaveBeenCalledWith({ type: types.logout});
        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    })
    
    
});