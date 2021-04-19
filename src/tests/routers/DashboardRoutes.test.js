import { mount } from "enzyme";
import { MemoryRouter } from "react-router";
import { AuthContext } from "../../auth/AuthContext";
import { DashboardRoutes } from "../../routers/DashboardRoutes";

describe('Pruebas en el <DashboardRoutes/>',()=>{

    test('debe mostrarse correctamente', () => {
        const contextValue = {
            dispatch:jest.fn(),
            user:{
                logged:true,
                name:'josue'
            }
        }
        /**
         * MemoryRouter sirve para hacer pruebas del router con ciertas rutas
         * shallow no funciona con MemoryRouter, ya que tiene varios niveles de etiqueta, por ello se usa mount
         */
        const wrapper = mount(
                            <MemoryRouter>
                                <AuthContext.Provider value={contextValue}>
                                    <DashboardRoutes/>);
                                </AuthContext.Provider>
                            </MemoryRouter>
                            );
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('josue');
    });

});