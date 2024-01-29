import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';



function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/inicio/:usuario/:sesion' element={<Inicio />} />
            <Route path='/usuarios/:nombre/:usuario/:rol/:sesion' element={<Usuarios />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
