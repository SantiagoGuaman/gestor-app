import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GetDataCategories from './Categories/GetDataCategories';
import NavBar from './NavBar/NavBar';
import GetDataProviders from './Proveedores/GetDataProviders';
import HomePage from './HomePage/HomePage';

function App() {
  return (
    <div
    <NavBar></NavBar>
    <GetDataCategories></GetDataCategories>
  );
}

export default App;
