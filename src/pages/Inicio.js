import React from 'react'
import { useParams } from 'react-router-dom'

function Inicio() {

  const {usuario} = useParams();

  return (
    <div>
      <h1>Inicio de {usuario}</h1>
    </div>
  )
}

export default Inicio
