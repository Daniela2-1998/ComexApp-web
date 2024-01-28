import React from 'react';

import styled from 'styled-components';
import '../css/Inicio.css';



function Encabezado({pasarElRol}) {

  const rol = pasarElRol;

  return (
    <EncabezadoEspacio>
      <Contenedor>
        <figure className='logo'></figure>
        <Titulo>Sistema de gestión comercial</Titulo >
        <NombreRol>Rol: {rol}</NombreRol>
      </Contenedor>
    </EncabezadoEspacio>
  )
}


const EncabezadoEspacio = styled.div`
  background-color: #BABABA;
`;


const Contenedor = styled.div`
  height: 70px;
  width: 100%;
  padding-bottom: 0.7%;
  display: flex;
  justify-content: space-around;
`;


const Titulo = styled.h2`
  color: #1A1594;
`;


const NombreRol = styled.h4`
  color: #1A1594;
  margin-left: 10%;
`;


export default Encabezado;
