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



function ComercioNacional() {

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
                    <title>Comercio nacional - {nombre}</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>

            <ContenedorGeneralInicio>

                <Encabezado pasarElRol={rol} />

                <MenuOpcionesInicio pasarElRol={rol} />


                <ContenedorOpciones>

                    <EspacioDeOpciones>

                        <CardOpcion1>
                            <CardOpcionTitulo>Vendedores</CardOpcionTitulo>
                            <figure className='imagen2 imagen-vendedores'></figure>
                            <CardBoton>Acceder</CardBoton>
                        </CardOpcion1>

                        <CardOpcion2>
                            <CardOpcionTitulo>Compradores</CardOpcionTitulo>
                            <figure className='imagen2 imagen-compradores'></figure>
                            <CardBoton>Acceder</CardBoton>
                        </CardOpcion2>

                        <CardOpcion3>
                            <CardOpcionTitulo>Proveedores</CardOpcionTitulo>
                            <figure className='imagen2 imagen-proveedores'></figure>
                            <CardBoton>Acceder</CardBoton>
                        </CardOpcion3>

                    </EspacioDeOpciones>

                </ContenedorOpciones>


                <ContenedorOpciones>

                    <EspacioDeOpciones>

                        <CardOpcion1>
                            <CardOpcionTitulo>Transporte</CardOpcionTitulo>
                            <figure className='imagen2 imagen-transporte'></figure>
                            <CardBoton>Acceder</CardBoton>
                        </CardOpcion1>

                        <CardOpcion2>
                            <CardOpcionTitulo>Suministros</CardOpcionTitulo>
                            <figure className='imagen2 imagen-suministros'></figure>
                            <CardBoton>Acceder</CardBoton>
                        </CardOpcion2>

                        <CardOpcion3>
                            <CardOpcionTitulo>Mercadería</CardOpcionTitulo>
                            <figure className='imagen2 imagen-mercaderia'></figure>
                            <CardBoton>Acceder</CardBoton>
                        </CardOpcion3>

                    </EspacioDeOpciones>

                </ContenedorOpciones>

                <BotonRegresar className='boton-a-inicio' onClick={regresarAMenu}>Inicio</BotonRegresar>
            </ContenedorGeneralInicio>
        </>
    )
}



export default ComercioNacional;
