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

  @media (max-width: 570px) {
    width: 100%;
    height: 150px;
    margin-left: 0%;
    flex-direction: column;
  }
`;


const Titulo = styled.h2`
  color: #1A1594;

  @media (max-width: 760px) {
    font-size: large;
  }
  
  @media (max-width: 570px) {
    margin-top: 0%;
    margin-bottom: -2%;
    font-size: x-large;
  }

`;


const NombreRol = styled.h4`
  color: #1A1594;
  margin-left: 10%;

    
  @media (max-width: 650px) {
    font-size: medium;
  }

  @media (max-width: 570px) {
    margin-left: 0%;
    margin-top: 2%;
  }

`;


export default Encabezado;
