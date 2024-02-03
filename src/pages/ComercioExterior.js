import React from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import styled from 'styled-components';
import '../css/Comercio.css';

import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import BotonRegresar from '../components/BotonRegresar';



function ComercioExterior() {

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
                    <title>Comercio exterior - {nombre}</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>

            <ContenedorGeneralInicio>

                <Encabezado pasarElRol={rol} />

                <MenuOpcionesInicio pasarElRol={rol} />


                <ContenedorOpciones>

                    <EspacioDeOpciones>

                        <CardOpcion1>
                            <CardOpcionTitulo>Exportadores</CardOpcionTitulo>
                            <figure className='imagen imagen-exportadores'></figure>
                            <button className='boton'>Acceder</button>
                        </CardOpcion1>

                        <CardOpcion2>
                            <CardOpcionTitulo>Importadores</CardOpcionTitulo>
                            <figure className='imagen imagen-importadores'></figure>
                        </CardOpcion2>

                        <CardOpcion3>
                            <CardOpcionTitulo>Despachantes</CardOpcionTitulo>
                            <figure className='imagen imagen-despachantes'></figure>
                        </CardOpcion3>

                    </EspacioDeOpciones>

                </ContenedorOpciones>


                <ContenedorOpciones>

                    <EspacioDeOpciones>

                        <CardOpcion1>
                            <CardOpcionTitulo>Transportes</CardOpcionTitulo>
                            <figure className='imagen imagen-logistica'></figure>
                        </CardOpcion1>

                        <CardOpcion2>
                            <CardOpcionTitulo>Contenedores</CardOpcionTitulo>
                            <figure className='imagen imagen-contenedores'></figure>
                        </CardOpcion2>

                        <CardOpcion3>
                            <CardOpcionTitulo>Mercadería</CardOpcionTitulo>
                            <figure className='imagen imagen-mercaderia'></figure>
                        </CardOpcion3>

                    </EspacioDeOpciones>

                </ContenedorOpciones>

            </ContenedorGeneralInicio>
        </>
    )
}


const ContenedorOpciones = styled.div`
  width: 100%;
  height: 650px;
  margin-top: 5%;
`;


const EspacioDeOpciones = styled.div`
  width: 100%;
  height: 400px;
  background: -webkit-linear-gradient(144deg,#1A1594, #1A1594 30%,#257cb6);
`;


const CardOpcion1 = styled.div`
  width: 25%;
  height: 400px;
  margin-top: 10%;
  margin-left: 7%;
  padding: 2%;
  border: 2px solid #fff;
  border-radius: 20px;
  position: absolute;
  background-color: #242424;
`;

const CardOpcion2 = styled.div`
  width: 25%;
  height: 400px;
  margin-top: 10%;
  margin-left: 37%;
  padding: 2%;
  border: 2px solid #fff;
  border-radius: 20px;
  position: absolute;
  background-color: #242424;
`;


const CardOpcion3 = styled.div`
  width: 25%;
  height: 400px;
  margin-top: 10%;
  margin-left: 67%;
  padding: 2%;
  border: 2px solid #fff;
  border-radius: 20px;
  position: absolute;
  background-color: #242424;
`;



const CardOpcionTitulo = styled.h3`
  font-size: 2rem;
  color: #fff;
  text-align: center;
`;

export default ComercioExterior
