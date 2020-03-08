import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DashboardIndex from '../../../screens/DashboardPages';

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
    
    const enzymeWrapper = shallow(<DashboardIndex />);

    return {
        enzymeWrapper
    }
}

describe('Screens', () => {
    describe('Dashboard Index', () => {
        xit('should match the snapshot', () => {
            const {enzymeWrapper} = setup()
            expect(enzymeWrapper.html()).toMatchSnapshot();
        })
    })
})