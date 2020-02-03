import React from 'react';
import logo from './logo.svg';
import {BrowserRouter} from 'react-router-dom';
import HomePage from './pages/homepage/homepage';
import './App.css';

function App() {
  return (
    <BrowserRouter>
    <HomePage />
    </BrowserRouter>
  );
}

export default App;
