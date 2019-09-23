import React from 'react';
import { Provider } from 'react-redux';

import ImageGrid from './components/ImageGrid';
import './App.css';
import configureStore from './store/index';

const store = configureStore();

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <ImageGrid />
      </Provider>
    </div>
  );
}

export default App;
