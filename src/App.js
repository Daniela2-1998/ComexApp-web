import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './pages/Login';
import Inicio from './pages/Inicio';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/inicio/:usuario' element={<Inicio/>} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
