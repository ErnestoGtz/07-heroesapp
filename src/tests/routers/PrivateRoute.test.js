import React from 'react'
import { mount } from 'enzyme';
import { PrivateRoute } from '../../routers/PrivateRoute';
import { MemoryRouter } from 'react-router-dom';
import '@testing-library/jest-dom';

const props = {
    location:{
        pathname:'/marvel'
    }
}


Storage.prototype.setItem = jest.fn();

describe('Pruebas en <PrivateRoute />', () => {
    test('debe de mostrar el componente si esta autenticado y guardar localStorage', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={true} 
                    component={() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        // console.log(wrapper.html());

        expect(wrapper.find('span').exists()).toBe(true);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel');
        
    });

    test('debe de bloquear el componente si no esta autenticado', () => {
        const wrapper = mount(
            <MemoryRouter>
                <PrivateRoute 
                    isAuthenticated={false} 
                    component={() => <span>Listo!</span>}
                    {...props}
                />
            </MemoryRouter>
        );
        // console.log(wrapper.html());

        expect(wrapper.find('span').exists()).toBe(false);
        expect(localStorage.setItem).toHaveBeenCalledWith('lastPath','/marvel');

    });
    
    
});
