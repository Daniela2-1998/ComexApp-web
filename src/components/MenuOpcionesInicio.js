import React from 'react';

import styled from 'styled-components';
import '../css/Inicio.css';

import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { db } from '../firebase/FirebaseConfig';
import { getAuth, signOut } from 'firebase/auth';


function MenuOpcionesInicio({pasarElRol, pasarNombre, pasarSesion, pasarUsuario}) {

  const rol = pasarElRol;
  const nombre = pasarNombre;
  const sesion = pasarSesion;
  const usuario = pasarUsuario;

  const navigate = useNavigate();


  // Función ir a sección de comercio exterior.
  const irAComex = () => {
    navigate(`/comercio-exterior/${nombre}/${usuario}/${rol}/${sesion}`);
  }

   // Función ir a sección de comercio nacional.
   const irAComnac = () => {
    navigate(`/comercio-nacional/${nombre}/${usuario}/${rol}/${sesion}`);
  }

  // Función ir a sección de usuarios.
  const irAUsuaurios = () => {
    navigate(`/usuarios/${nombre}/${usuario}/${rol}/${sesion}`);
  }

  // Función cierre de sesión.
  const cerrarSesion = () => {
    const usuario = getAuth().signOut();
    if(!getAuth().currentUser){
      console.log("Éxito")
      console.log(getAuth().currentUser)
      navigate('/');
    } 
  }




  return (
    <MenuEspacio> 
      <Contenedor>
        <button className='boton-opcion' onClick={irAComex}>Comercio exterior</button>
        <button className='boton-opcion' onClick={irAComnac}>Comercio local</button>
        <button className='boton-opcion' as={Link} to={`/operaciones`}>Operaciones</button>
        <button className='boton-opcion' as={Link} to={`/stock`}>Stock</button>
        { rol === 'administrador' ?
         <button className='boton-opcion' onClick={irAUsuaurios}>Usuarios</button>
         :
         ''
        }
      </Contenedor>
      <button className='boton-opcion' onClick={cerrarSesion} >Cerrar sesión</button>
    </MenuEspacio>
  )
}


const MenuEspacio = styled.div`
  background-image: -webkit-linear-gradient(144deg,#1A1594, #1A1594 30%,#257cb6);
  display: flex;
  justify-content: space-around;
  border-bottom: 2px solid #fff;


  @media (max-width: 570px) {
    width: 100%;
    height: 450px;
    flex-direction: column;
  }
`;


const Contenedor = styled.div`
  height: 70px;
  width: 40%;
  margin-left: 10%;
  display: flex;
  justify-content: space-between;


  @media (max-width: 1050px) {
    width: 50%;
  }

  @media (max-width: 1120px) {
    width: 60%;
  }

  @media (max-width: 900px) {
    width: 80%;
  }

  @media (max-width: 760px) {
    width: 90%;
  }

  @media (max-width: 650px) {
    width: 100%;
    margin-left: 1%;
  }

  @media (max-width: 570px) {
    height: 300px;
    margin-left: 0%;
    flex-direction: column;
    justify-content: space-evenly;
  }

`;


export default MenuOpcionesInicio
