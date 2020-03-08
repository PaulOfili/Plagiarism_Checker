import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import LandingPageIndex from '../../../screens/LandingPage';

jest.mock('react-redux', () => ({
    useDispatch: ()=> {},
    useSelector: () => ({
        auth: { 
            isLoggedIn: false
        }
    })
}));

Enzyme.configure({adapter: new Adapter() })

function setup() {
    
    const enzymeWrapper = shallow(<LandingPageIndex />);

    return {
        enzymeWrapper
    }
}

describe('Screens', () => {
    describe('Landing Index', () => {
        xit('should match the snapshot', () => {
            const {enzymeWrapper} = setup()
            expect(enzymeWrapper.html()).toMatchSnapshot();
        })
    })
})