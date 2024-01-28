import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';



import Login from './pages/Login';
import Inicio from './pages/Inicio';
import Importadores from './pages/Importadores';

function App() {
  return (
    <>
      <div className='App'>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Login />} />
            <Route path='/inicio/:usuario' element={<Inicio />} />
            <Route path='/importadores/${nombre}' element={<Importadores />} />

          </Routes>
        </BrowserRouter>
      </div>
    </>
  );
}

export default App;
