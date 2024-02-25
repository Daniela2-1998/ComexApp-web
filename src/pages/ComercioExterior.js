import React from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { ContenedorOpciones, EspacioDeOpciones, CardOpcion1, CardOpcion2, CardOpcion3, CardOpcionTitulo, CardBoton } from '../components/ElementosComercio';
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


    const aExportadores = () => {
        navigate(`/comercio-exterior/exportadores/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aImportadores = () => {
        navigate(`/comercio-exterior/importadores/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aDespachantes = () => {
        navigate(`/comercio-exterior/despachantes/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aTransportes = () => {
        navigate(`/comercio-exterior/logistica/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aMercaderias = () => {
        navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
    }

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
                            <figure className='imagen2 imagen-exportadores'></figure>
                            <CardBoton onClick={aExportadores}>Acceder</CardBoton>
                        </CardOpcion1>

                        <CardOpcion2>
                            <CardOpcionTitulo>Importadores</CardOpcionTitulo>
                            <figure className='imagen2 imagen-importadores'></figure>
                            <CardBoton onClick={aImportadores}>Acceder</CardBoton>
                        </CardOpcion2>

                        <CardOpcion3>
                            <CardOpcionTitulo>Despachantes</CardOpcionTitulo>
                            <figure className='imagen2 imagen-despachantes'></figure>
                            <CardBoton onClick={aDespachantes}>Acceder</CardBoton>
                        </CardOpcion3>

                    </EspacioDeOpciones>

                </ContenedorOpciones>


                <ContenedorOpciones>

                    <EspacioDeOpciones>

                        <CardOpcion1>
                            <CardOpcionTitulo>Transportes</CardOpcionTitulo>
                            <figure className='imagen2 imagen-logistica'></figure>
                            <CardBoton onClick={aTransportes}>Acceder</CardBoton>
                        </CardOpcion1>

                        <CardOpcion2>
                            <CardOpcionTitulo>Contenedores</CardOpcionTitulo>
                            <figure className='imagen2 imagen-contenedores'></figure>
                            <CardBoton>Acceder</CardBoton>
                        </CardOpcion2>

                        <CardOpcion3>
                            <CardOpcionTitulo>Mercadería</CardOpcionTitulo>
                            <figure className='imagen2 imagen-mercaderia'></figure>
                            <CardBoton onClick={aMercaderias}>Acceder</CardBoton>
                        </CardOpcion3>

                    </EspacioDeOpciones>

                </ContenedorOpciones>

                <BotonRegresar className='boton-a-inicio' onClick={regresarAMenu}>Inicio</BotonRegresar>
            </ContenedorGeneralInicio>
        </>
    )
}



export default ComercioExterior;
