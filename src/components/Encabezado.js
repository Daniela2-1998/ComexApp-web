import React from 'react';

import styled from 'styled-components';



function Encabezado({ pasarElRol }) {

  const rol = pasarElRol;

  return (
    <EncabezadoEspacio>
      <Contenedor>
        <figure className='logo'></figure>
        <Titulo>Sistema de gestión comercial</Titulo >
      </Contenedor>
    </EncabezadoEspacio>
  )
}


const EncabezadoEspacio = styled.div`
  background-image: -webkit-linear-gradient(144deg,#323232, #58585a 30%,#8b8b8b);
`;


const Contenedor = styled.div`
  height: 70px;
  width: 70%;
  margin-left: 5%;
  padding-bottom: 0.7%;
  display: flex;
  justify-content: space-around;


  @media (max-width: 900px) {
    margin-left: 15%;
  }

  @media (max-width: 760px) {
    width: 90%;
    margin-left: 2%;
  }

  @media (max-width: 570px) {
    width: 100%;
    height: 150px;
    margin-left: 0%;
    flex-direction: column;
  }
`;


const Titulo = styled.h2`
  color: #1A1594 !important;
  margin-top: 1%;


  @media (max-width: 900px) {
    font-size: x-large;
    margin-top: 3%;
  }

  @media (max-width: 760px) {
    font-size: x-large;
  }
  
  @media (max-width: 570px) {
    margin-top: 0%;
    margin-bottom: 5%;
    font-size: x-large;
  }

`;




export default Encabezado;
