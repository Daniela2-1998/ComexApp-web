import React, { useState } from 'react';

import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import styled from 'styled-components';


// Import componentes
import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import TablaUsuarios from '../components/TablaUsuarios';
import BotonRegresar from '../components/BotonRegresar';



function Usuarios() {

  const { nombre } = useParams();
  const { rol } = useParams();
  const { usuario } = useParams();
  const { sesion } = useParams();

  const navigate = useNavigate();


  const regresarAMenu = () => {
    navigate(`/inicio/${usuario}/${sesion}`);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Usuarios - {nombre}</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>


      <ContenedorGeneralInicio>

        <Encabezado pasarElRol={rol} />

        <MenuOpcionesInicio pasarElRol={rol} />

        {rol === 'administrador' ?
          <ContenedorTabla>
            <TablaUsuarios pasarUsuario={usuario} pasarRol={rol} pasarNombre={nombre} pasarSesion={sesion} />
            <BotonRegresar onClick={regresarAMenu} className='boton-regreso' ><i class="fa-solid fa-arrow-left"></i>Volver a menú</BotonRegresar>
          </ContenedorTabla>
          :
          ''
        }



      </ContenedorGeneralInicio>
    </>
  )
}


const ContenedorTabla = styled.div`
  width: 80%;
  margin-top: 5%;
  margin-left: 10%;

`;


export default Usuarios;
