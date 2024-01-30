import React, { useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';

// Imports componentes
import SelectRol from '../components/SelectRol';
import SelectArea from '../components/SelectArea';
import { collection } from 'firebase/firestore';

import '../css/Registros.css'
import {
    ContenedorFormulario, ContenedorTituloRegistro, ContenedorCamposRegistro,
    TituloCamposRegistro, CamposRegistro, EspacioSelectsRegistro
} from '../components/ElementosFormulario';

import BotonRegresar from '../components/BotonRegresar';


function RegistrarUsuario() {

    const {usuario} = useParams();
    const {nombre} = useParams();
    const {rol} = useParams();
    const {sesion} = useParams();

    const [nombreUsuario, setNombreUsuario] = useState('');
    const [mail, setMail] = useState('');
    const [contraseña, setContraseña] = useState('');
    const [celular, setCelular] = useState('');
    const [años, setAños] = useState('');

    const [rolUsuario, setRolUsuario] = useState('administrador');
    const [area, setArea] = useState('general');

    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');

    const coleccionUsuarios = collection(db, "usuarios");

// /usuarios/:nombre/:usuario/:rol/:sesion
    const volverAUsuarios = () => {
        navigate(`/usuarios/${nombre}/${usuario}/${rol}/${sesion}`);
      }


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Registrar usuario</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>

            <ContenedorFormulario>
                <ContenedorTituloRegistro>
                    <h1>Agregar usuario</h1>
                </ContenedorTituloRegistro>


                <form>
                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Nombre y apellido:</TituloCamposRegistro>
                        <CamposRegistro
                            className='campos'
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Mail:</TituloCamposRegistro>
                        <CamposRegistro
                            className='campos'
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Contraseña:</TituloCamposRegistro>
                        <CamposRegistro
                            className='campos'
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Celular:</TituloCamposRegistro>
                        <CamposRegistro
                            className='campos'
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Años en la empresa:</TituloCamposRegistro>
                        <CamposRegistro
                            className='campos'
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <EspacioSelectsRegistro>
                        <ContenedorCamposRegistro>
                            <TituloCamposRegistro>Cargo/área de trabajo:</TituloCamposRegistro>
                            <SelectArea
                                area={area}
                                setArea={setArea}
                            />
                        </ContenedorCamposRegistro>

                        <ContenedorCamposRegistro>
                            <TituloCamposRegistro>Rol:</TituloCamposRegistro>
                            <SelectRol
                                rol={rolUsuario}
                                setRol={setRolUsuario}
                            />
                        </ContenedorCamposRegistro>
                    </EspacioSelectsRegistro>

                </form>
                <BotonRegresar onClick={volverAUsuarios} className='boton-regreso' ><i class="fa-solid fa-arrow-left"></i>Volver a usuarios</BotonRegresar>



            </ContenedorFormulario>

        </>
    )
}

export default RegistrarUsuario;
