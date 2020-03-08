import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import LayoutHandler from './layouts/layoutHandler';
import './styles/main.scss';

class  App extends React.Component {

  componentDidMount() {
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
