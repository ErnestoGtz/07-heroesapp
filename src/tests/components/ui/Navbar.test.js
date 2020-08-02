import React from 'react';
import { mount } from 'enzyme';
import { MemoryRouter, Router } from 'react-router-dom';
import '@testing-library/jest-dom';

import { AuthContext } from '../../../auth/AuthContext';
import { Navbar } from '../../../components/ui/Navbar';
import { types } from '../../../types/types';


describe('pruebas en el <Navbar />', () => {
    
    const historyMock = {
        push:jest.fn(),
        replace:jest.fn(),
        location:{},
        listen:jest.fn(),
        createHref:jest.fn()
    }
    
    const contextValue = {
        dispatch:jest.fn(),
        user:{
            logged:true,
            name:'Neto'
        }
    }
    
    const wrapper = mount(
        <AuthContext.Provider value={contextValue}>
            <MemoryRouter>
                <Router history={historyMock}>
                    <Navbar />
                </Router>
            </MemoryRouter>
            
        </AuthContext.Provider>
    );

    afterEach(()=>{
        jest.clearAllMocks();
    });
    
    test('debe mostrarse correctamente ', () => {
        expect(wrapper).toMatchSnapshot();
        expect(wrapper.find('.text-info').text().trim()).toBe('Neto');
    });

    test('debe de llamar el logout y usar el history', () => {
        wrapper.find('button').prop('onClick')();
        expect(contextValue.dispatch).toHaveBeenCalledWith({
            type:types.logout
        });

        //console.log(historyMock.replace);

        expect(historyMock.replace).toHaveBeenCalledWith('/login');
    });
    
    
});
