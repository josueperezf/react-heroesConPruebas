import { authReducer } from "../../auth/authReducer";
import { types } from "../../types/types";


describe('Pruebas en authReducer',()=>{
    
    test('debe de retornar el estado por default', () => {
        const stadoDefault = authReducer({logged:false}, {});
        expect({logged:false}).toEqual(stadoDefault);
    });
    
    test('debe de autenticar y colocar el name del usuario', () => {
        const action = {
            type: types.login,
            payload:{
                name:'josue'
            }
        };
        const stado = authReducer({logged:false}, action);
        expect(stado).toEqual({
            logged:true,
            name:'josue'
        });
    });

    test('debe de borrar el name del usuario y logged en false', () => {
        const action = {
            type: types.logout,
        };
        const stado = authReducer({logged:true, name:'josue'}, action);
        expect(stado).toEqual({logged:false});
    });
});