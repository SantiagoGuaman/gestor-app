import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GetDataCategories from './Categories/GetDataCategories';
import NavBar from './NavBar/NavBar';
import GetDataProviders from './Proveedores/GetDataProviders';
import HomePage from './HomePage/HomePage';

function App() {
  return (
    <div className="container">
    <BrowserRouter>
      <NavBar>
        <Routes>
          <Route exact path="/" element={<HomePage/>}></Route>
          <Route exact path="/categories" element={<GetDataCategories/>}></Route>
          <Route exact path="/providers" element={<GetDataProviders/>}></Route>
        </Routes>
      </NavBar>
    </BrowserRouter>
  </div>
  );
}

export default App;
