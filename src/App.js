import React from 'react';
import { BrowserRouter } from 'react-router-dom';

import Auth from './containers/Auth/Auth';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Auth/>
      </div>
    </BrowserRouter>
  );
}

export default App;
