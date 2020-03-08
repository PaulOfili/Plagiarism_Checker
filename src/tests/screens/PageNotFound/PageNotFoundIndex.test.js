import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import PageNotFound from '../../../screens/PageNotFound';

Enzyme.configure({adapter: new Adapter() })

function setup() {
    
    const enzymeWrapper = shallow(<PageNotFound />);

    return {
        enzymeWrapper
    }
}

describe('Screens', () => {
    describe('Page Not Found Index', () => {
        it('should match the snapshot', () => {
            const {enzymeWrapper} = setup()
            expect(enzymeWrapper.html()).toMatchSnapshot();
        })
    })
})