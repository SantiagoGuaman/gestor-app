import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import GetDataCategories from './Categories/GetDataCategories';
import NavBar from './NavBar/NavBar';
import GetDataProviders from './Proveedores/GetDataProviders';
import HomePage from './HomePage/HomePage';

function App() {
  return (
    <div>
    <BrowserRouter>
    <NavBar/>
    <Routes>
      <Route exact path='/' element={<GetDataCategories}
    </Routes>
    </BrowserRouter>
   </div>
  );
}

export default App;
