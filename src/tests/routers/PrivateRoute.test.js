import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { PrivateRoute } from "../../routers/PrivateRoute";

describe('Pruebas en el router <PrivateRoute/>', ()=>{
    const rest = {
        location: {
            pathname:'/marvel',
            search:''
        }
    }
    // al Storage nativo le agregamos el fn para poder obtener informacion si fue llamada o no
    Storage.prototype.setItem = jest.fn();
    test('debe de mostrar el componente si esta autenticado y guardar el localStorage', () => {
        /**
         * MemoryRouter sirve para hacer pruebas del router con ciertas rutas
         * shallow no funciona con MemoryRouter, ya que tiene varios niveles de etiqueta, por ello se usa mount
         */

        /**
         * con el rest, logramos que almacene en localStorage
         */
        const wrapper = mount(
                                <MemoryRouter>
                                    <PrivateRoute
                                        isAuthenticated={true}
                                        component={()=> <span>Prueba</span>}
                                        {...rest}
                                    />
                                </MemoryRouter>
                                );
        // console.log(wrapper.html());
        expect(wrapper.find('span').exists()).toBe(true);
        // probamos si el localStorage fue llamado  para hacer setItem a la variable ultimaRuta,con los siguiente parametros '/marvel'
        expect(localStorage.setItem).toHaveBeenCalledWith('ultimaRuta',rest.location.pathname+rest.location.search);
    });

    test('Debe de bloquear el componente si no esta autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute
                    isAuthenticated={false}
                    component={()=> <span>Prueba</span>}
                    {...rest}
                />
            </MemoryRouter>
            );
        // compruebo si bloqueo o mejor dicho no cargo mi componente si isAuthenticated = false
        expect(wrapper.find('span').exists()).toBe(false);
    });
    
});