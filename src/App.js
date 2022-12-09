import React from 'react';
import logo from './logo.svg';
import { ShopList } from './features/shopList/ShopList';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <ShopList />
      </header>
    </div>
  );
}

export default App;
