import React, { useState, useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

import styled from 'styled-components';

import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';

import ReactPlayer from 'react-player';
import video from '../videos/maritimo.mp4';


function Maritimo() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();

    const [medio, setMedio] = useState('marítimo');

    const navigate = useNavigate();

    
    const aRegistrarParticipante = () => {
      navigate(`/comercio-exterior/registrar/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aListado = () => {
      navigate(`/comercio-exterior/logistica-listado/${medio}/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aConsultarParticipante = () => {
      navigate(`/comercio-exterior/logistica-consulta/${medio}/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aRequisitosGenerales = () => {
      navigate(`/comercio-exterior/requisitos/${medio}/${nombre}/${usuario}/${rol}/${sesion}`);
    }


    const volverATransporte = () => {
        navigate(`/comercio-exterior/logistica/${nombre}/${usuario}/${rol}/${sesion}`);
    }




    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Logística internacional - {nombre}</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>

            <ContenedorGeneralInicio>
                <Encabezado pasarElRol={rol} />
                <MenuOpcionesInicio pasarElRol={rol} />

                <ContenedorContenido>

                    <ContenedorVideo>
                        <ReactPlayer
                            url={video}
                            muted
                            playing
                            loop
                            width="100%"
                            height="100%"
                        />
                    </ContenedorVideo>

                    <ContenedorOpciones>

                        <TituloOpciones>Opciones disponibles:</TituloOpciones>
                        <BotonTransporte onClick={aRegistrarParticipante}>Registrar</BotonTransporte>
                        <BotonTransporte onClick={aListado}>Ver información</BotonTransporte>
                        <BotonTransporte onClick={aConsultarParticipante}>Consultar</BotonTransporte>
                        <BotonTransporte onClick={aRequisitosGenerales}>Requisitos generales</BotonTransporte>
                        <BotonTransporte onClick={volverATransporte}>Volver a transporte</BotonTransporte>

                    </ContenedorOpciones>

                </ContenedorContenido>

            </ContenedorGeneralInicio>
        </>
    )
}


const ContenedorContenido = styled.div`
  width: 100%;
  height: 100%;
  display: flex;


  @media (max-width: 1200px){
    flex-direction: column;
  }
`;

const ContenedorVideo = styled.div`
  width: 68%;
  height: 100%;


  @media (max-width: 1200px){
    width: 100%;
  }
`;

const ContenedorOpciones = styled.div`
  width: 32%;
  height: 565px;
  background-image: -webkit-linear-gradient(66deg,#257cb6, #257cb6 5%,#1A1594);
  border-left: 2px solid #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;


  @media (max-width: 1200px){
    width: 100%;
  }
`;

const TituloOpciones = styled.h3`
  color: #fff;
`;

const BotonTransporte = styled.button`
  width: 70%;
  height: 50px;
  margin-left: 14%;
  border-radius: 20px;
  border: none;
  background-color: rgba(47, 47, 47, 0.804);
  color: #fff;

  &:hover{
    background-color: rgba(32, 32, 32, 0.985);
    font-weight: bolder;
  }
`;

export default Maritimo;
