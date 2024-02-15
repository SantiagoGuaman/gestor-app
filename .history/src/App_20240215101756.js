import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GetDataCategories from './Categories/GetDataCategories';
import NavBar from './NavBar/NavBar';
import GetDataProviders from './Proveedores/GetDataProviders';
import HomePage from './HomePage/HomePage';

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/categories' element={<GetDataCategories />} />
        <Route exact path='/providers' element={<GetDataProviders />} />
        <Route exact path='/products' element={<GetDataProviders />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
