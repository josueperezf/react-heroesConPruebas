import { mount, shallow } from "enzyme";
import { AuthContext } from "../../../auth/AuthContext";
import { LoginScreen } from "../../../componentes/login/LoginScreen";
import { types } from "../../../types/types";

describe('Pruebas en <LoginScreen*>',()=>{
    const history = {
        replace:jest.fn(),
    };
    const contextValue = {
        dispatch:jest.fn(),
    }
    const wrapper = mount(
                        <AuthContext.Provider value={contextValue}>
                            <LoginScreen history={history} />
                        </AuthContext.Provider>
                        );
    test('debe de mostrarse correctamente', () => {
        expect(wrapper).toMatchSnapshot();;
    });

    test('debe de realizar el dispatch y la navegacion', () => {
        // simulo el click
        const buttonClick = wrapper.find('button').prop('onClick');
        buttonClick();
        // prueblo si fue llamado con esos parametros
        expect(contextValue.dispatch).toHaveBeenCalled({
            type:types.login,
            payload: {
                name:'josue'
            }
        });
        // verifico  que si no hay nada en el localStorage me lleve a la ruta raiz
        expect(history.replace).toHaveBeenCalledWith('/');
        // le agrego valor al localstorage
        localStorage.setItem('ultimaRuta','/dc');
        // simulo el click y veo si llama a la ruta que almacene en el storage
        buttonClick();
        expect(history.replace).toHaveBeenCalledWith('/dc');
    });
    
    
});