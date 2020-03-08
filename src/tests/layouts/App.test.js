import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from '../../App';

Enzyme.configure({adapter: new Adapter() })

function setup() {
    
    const enzymeWrapper = shallow(<App />);

    return {
        enzymeWrapper
    }
}

describe('Layout', () => {
    describe('App', () => {
        xit('should match the snapshot', () => {
            const {enzymeWrapper} = setup()
            expect(enzymeWrapper.html()).toMatchSnapshot();
        })
    })
})