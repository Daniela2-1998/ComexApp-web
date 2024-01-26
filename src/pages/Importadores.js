import React from 'react';
import { useParams } from 'react-router-dom';

function Importadores() {
 
    const {nombre} = useParams();

  return (
    <div>
      <h1>Importadores</h1>
      <h2>{nombre}</h2>
    </div>
  )
}

export default Importadores
