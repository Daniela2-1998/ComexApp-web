import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import pages.
import Login from './pages/Login';
import Inicio from './pages/Inicio';
import ComercioExterior from './pages/ComercioExterior';
import Exportadores from './pages/Exportadores';
import Importadores from './pages/Importadores';
import Despachantes from './pages/Despachantes';
import RegistrarParticipanteComex from './pages/RegistrarParticipanteComex';
import MercaderiasInt from './pages/MercaderiasInt';
import ListadoMercaderiasInt from './pages/ListadoMercaderiasInt';
import ComercioNacional from './pages/ComercioNacional';
import RegistrarMercaderia from './pages/RegistrarMercaderia';
import EditarMercaderia from './pages/EditarMercaderia';
import RegistrarCategoria from './pages/RegistrarCategoria';
import EditarCategoria from './pages/EditarCategoria';
import RegistrarProveedor from './pages/RegistrarProveedor';
import EditarProveedor from './pages/EditarProveedor';
import CategoriasYProveedores from './pages/CategoriasYProveedores';
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

            <Route path='/comercio-exterior/exportadores/:nombre/:usuario/:rol/:sesion' element={<Exportadores />} />
            <Route path='/comercio-exterior/importadores/:nombre/:usuario/:rol/:sesion' element={<Importadores />} />
            <Route path='/comercio-exterior/despachantes/:nombre/:usuario/:rol/:sesion' element={<Despachantes />} />
            <Route path='/comercio-exterior/registrar/:nombre/:usuario/:rol/:sesion' element={<RegistrarParticipanteComex />} />
            <Route path='/comercio-exterior/mercaderias/:nombre/:usuario/:rol/:sesion' element={<MercaderiasInt />} />
            <Route path='/comercio-exterior/listado-mercaderias/:nombre/:usuario/:rol/:sesion' element={<ListadoMercaderiasInt />} />
            <Route path='/comercio-exterior/registrar-mercaderias/:nombre/:usuario/:rol/:sesion' element={<RegistrarMercaderia />} />
            <Route path='/comercio-exterior/editar-mercaderia/:nombre/:usuario/:rol/:sesion/:id' element={<EditarMercaderia />} />


            <Route path='/categoria-producto/:nombre/:usuario/:rol/:sesion' element={<RegistrarCategoria />} />
            <Route path='/editar-categoria/:nombre/:usuario/:rol/:sesion/:id' element={<EditarCategoria />} />
            <Route path='/proveedor-producto/:nombre/:usuario/:rol/:sesion' element={<RegistrarProveedor />} />
            <Route path='/editar-proveedor/:nombre/:usuario/:rol/:sesion/:id' element={<EditarProveedor />} />
            <Route path='/listado-proveedores-y-categorias/:nombre/:usuario/:rol/:sesion' element={<CategoriasYProveedores />} />

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
