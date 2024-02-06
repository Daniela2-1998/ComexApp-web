import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages.
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import ComercioExterior from './pages/ComercioExterior';
import MercaderiasInt from './pages/MercaderiasInt';
import ComercioNacional from './pages/ComercioNacional';
import RegistrarMercaderia from './pages/RegistrarMercaderia';
import RegistrarCategoria from './pages/RegistrarCategoria';
import RegistrarProveedor from './pages/RegistrarProveedor';
import EditarProveedor from './pages/EditarProveedor';
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

            <Route path='/comercio-exterior/:nombre/:usuario/:rol/:sesion' element={<ComercioExterior />} />
            <Route path='/comercio-exterior/mercaderias/:nombre/:usuario/:rol/:sesion' element={<MercaderiasInt />} />
            <Route path='/comercio-exterior/registrar-mercaderias/:nombre/:usuario/:rol/:sesion' element={<RegistrarMercaderia />} />
            <Route path='/categoria-producto/:nombre/:usuario/:rol/:sesion' element={<RegistrarCategoria />} />
            <Route path='/proveedor-producto/:nombre/:usuario/:rol/:sesion' element={<RegistrarProveedor />} />
            <Route path='/editar-proveedor/:nombre/:usuario/:rol/:sesion' element={<EditarProveedor />} />

            <Route path='/comercio-nacional/:nombre/:usuario/:rol/:sesion' element={<ComercioNacional />} />

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
