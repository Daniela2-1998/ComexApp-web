import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Usuarios from './pages/Usuarios';
import RegistrarUsuario from './pages/RegistrarUsuario';
import EditarUsuario from './pages/EditarUsuario';



function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />

            <Route path='/inicio/:usuario/:sesion' element={<Inicio />} />

            <Route path='/usuarios/:nombre/:usuario/:rol/:sesion' element={<Usuarios />} />
            <Route path='/registrar-usuario/:usuario/:nombre/:rol/:sesion' element={<RegistrarUsuario />} />
            <Route path='/editar-usuario/:usuario/:nombre/:rol/:sesion/:id' element={<EditarUsuario />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
