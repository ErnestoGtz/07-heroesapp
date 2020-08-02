import React from 'react';
import { mount } from 'enzyme';
import { HeroScreen } from '../../../components/heroes/HeroScreen';
import '@testing-library/jest-dom';
import { MemoryRouter, Route } from 'react-router-dom';



describe('Pruebas en <HeroScreen />', () => {
    
    const history = {
        length: 10,
        push:jest.fn(),
        goBack:jest.fn()
    }
    
    test('debe de mostrar el componente redirect si no hay argumentos en el URL', () => {
        //expect(wrapper).toMatchSnapshot();
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero']}>
                <HeroScreen history={history} />
            </MemoryRouter>
        );
        expect(wrapper.find('Redirect').exists()).toBe(true);
    });
    
    test('debe de mostrar un heroe si el parametro existe ', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-hulk']}>
                <Route path="/hero/:heroId" component={HeroScreen} />
            </MemoryRouter>
        );

        expect(wrapper.find('.row').exists()).toBe(true);
    });
    
    test('debe de regresar a la pantalla anterior con PUSH', () => {
        const history = {
            length: 1,
            push:jest.fn(),
            goBack:jest.fn()
        }

        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-hulk']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.push).toHaveBeenCalledWith('/');
        expect(history.goBack).not.toHaveBeenCalled();
    });

    test('debe de regresar a la pantalla anterior GOBACK', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-hulk']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );

        wrapper.find('button').prop('onClick')();
        expect(history.goBack).toHaveBeenCalled();
        expect(history.push).not.toHaveBeenCalledWith('/');
        
    });

    test('debe de llamar el redirect si el hero no existe', () => {
        const wrapper = mount(
            <MemoryRouter initialEntries={['/hero/marvel-hulk54564654']}>
                <Route 
                    path="/hero/:heroId" 
                    component={ () => <HeroScreen history={history} />} 
                />
            </MemoryRouter>
        );
        
        expect(wrapper.text()).toBe('');
       
    });
    
    


    

    
});
