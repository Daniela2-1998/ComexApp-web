import React from 'react';

import styled from 'styled-components';
import '../css/Inicio.css';

import { Link } from 'react-router-dom';



function MenuOpcionesInicio({pasarElRol}) {

  const rol = pasarElRol;

  return (
    <MenuEspacio> 
      <Contenedor>
        <button className='boton-opcion' as={Link} to={`/comercio-exterior`}>Comercio exterior</button>
        <button className='boton-opcion' as={Link} to={`/comercio-local`}>Comercio local</button>
        <button className='boton-opcion' as={Link} to={`/operaciones`}>Operaciones</button>
        <button className='boton-opcion' as={Link} to={`/stock`}>Stock</button>
        { rol === 'administrador' ?
         <button className='boton-opcion' as={Link} to={`/usuarios`}>Usuarios</button>
         :
         ''
        }
      </Contenedor>
      <button className='boton-opcion' as={Link} to={`/`}>Cerrar sesión</button>
    </MenuEspacio>
  )
}


const MenuEspacio = styled.div`
  background-color: #1A1594;
  display: flex;
  justify-content: space-around;


  @media (max-width: 900px) {
    border-bottom: 2px solid #fff;
  }

  @media (max-width: 570px) {
    width: 100%;
    height: 350px;
    flex-direction: column;
  }
`;


const Contenedor = styled.div`
  height: 70px;
  width: 40%;
  margin-left: 10%;
  display: flex;
  justify-content: space-between;


  @media (max-width: 1120px) {
    width: 50%;
  }

  @media (max-width: 900px) {
    width: 60%;
  }

  @media (max-width: 760px) {
    width: 70%;
  }

  @media (max-width: 650px) {
    width: 80%;
    margin-left: 1%;
  }

  @media (max-width: 570px) {
    width: 100%;
    height: 300px;
    margin-left: 0%;
    flex-direction: column;
    justify-content: space-evenly;
  }

`;


export default MenuOpcionesInicio
