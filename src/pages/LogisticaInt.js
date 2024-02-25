import React, { useState, useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

import { Titulo } from '../components/ElementosParticipantes';
import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import BotonRegresar from '../components/BotonRegresar';

import { ContenedorOpciones, EspacioDeOpciones, CardOpcion1, CardOpcion2, CardOpcion3, CardOpcionTitulo, CardBoton } from '../components/ElementosComercio';
import '../css/Comercio.css';
import '../css/Logistica.css';

function LogisticaInt() {

  const { usuario } = useParams();
  const { nombre } = useParams();
  const { rol } = useParams();
  const { sesion } = useParams();

  const navigate = useNavigate();

  const aMaritimo = () => {
    navigate(`/comercio-exterior/logistica/maritimo/${nombre}/${usuario}/${rol}/${sesion}`);
  }
  
  // Función volver atrás.
  const volverAComex = () => {
    navigate(`/comercio-exterior/${nombre}/${usuario}/${rol}/${sesion}`);
  }

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Comercio exterior - {nombre}</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>


      <ContenedorGeneralInicio>

        <Encabezado pasarElRol={rol} />

        <MenuOpcionesInicio pasarElRol={rol} />
        <Titulo>Logística internacional</Titulo>

        <ContenedorOpciones  className='tamaño-contenedor-opciones'>

          <EspacioDeOpciones>

            <CardOpcion1>
              <CardOpcionTitulo>Terrestre</CardOpcionTitulo>
              <figure className='imagen2 imagen-terrestre'></figure>
              <CardBoton>Acceder</CardBoton>
            </CardOpcion1>

            <CardOpcion2>
              <CardOpcionTitulo>Marítimo</CardOpcionTitulo>
              <figure className='imagen2 imagen-maritimo'></figure>
              <CardBoton onClick={aMaritimo}>Acceder</CardBoton>
            </CardOpcion2>

            <CardOpcion3>
              <CardOpcionTitulo>Aereo</CardOpcionTitulo>
              <figure className='imagen2 imagen-aereo'></figure>
              <CardBoton>Acceder</CardBoton>
            </CardOpcion3>

          </EspacioDeOpciones>

        </ContenedorOpciones>
        <BotonRegresar onClick={volverAComex} className='boton-logistica-regresar boton-regresar-participantes'>Volver a comercio exterior</BotonRegresar>

      </ContenedorGeneralInicio>


    </>
  )
}

export default LogisticaInt;
