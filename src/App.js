import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import LayoutHandler from './layouts/layoutHandler';
import './styles/main.scss';
require('dotenv').config();

class  App extends React.Component {

  componentDidMount() {
    // TODO Check out mdn sdc to refactor this listener, quite expensive!!!
      window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
      window.removeEventListener('resize', this.resize);
  }

  resize = () => this.forceUpdate();


  render() {

    return (
        <Provider store={store}>
          <LayoutHandler />
        </Provider>
    );
  }
}

export default App;
