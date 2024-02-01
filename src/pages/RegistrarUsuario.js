import React, { useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';

import { doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, getAuth } from 'firebase/auth';

// Imports componentes
import SelectRol from '../components/SelectRol';
import SelectArea from '../components/SelectArea';

// Imports estilos
import {
    ContenedorFormulario, ContenedorTituloRegistro, ContenedorCamposRegistro, TituloCamposRegistro, FormularioRegistro,
    CamposRegistro, EspacioSelectsRegistro, ContenedorBotonesRegistro, BotonIngresoRegistro
} from '../components/ElementosFormulario';
import BotonRegresar from '../components/BotonRegresar';
import Alerta from '../components/Alerta';



function RegistrarUsuario() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();

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

    // Función volver atrás.
    const volverAUsuarios = () => {
        navigate(`/usuarios/${nombre}/${usuario}/${rol}/${sesion}`);
    }


    // Función para almacenar usuario.
    const almacenar = async (e) => {
        e.preventDefault();

        // Verificación de que los campos no estén vacíos.
        if (nombreUsuario === '' || mail === '' || contraseña === '' || celular === '' || años === '') {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: 'Debes completar todos los campos.'
            });
            return;
        }


        // Verificación de mail válido como usuario único.
        const expresionRegularMail = /[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+/;

        if (!expresionRegularMail.test(mail)) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "Por favor ingresa un mail válido para el usuario."
            });
            return;
        }

        // Verificación de que la contraseña tenga más de 6 caracteres.
        if (contraseña.length < 6) {
            cambiarEstadoAlerta(true);
            cambiarAlerta({
                tipo: 'error',
                mensaje: "La contraseña debe tener al menos 6 caracteres."
            });
            return;
        }

        // Vinculación con los campos.
        await setDoc(doc(db, "usuarios", mail), { nombre: nombreUsuario, mail: mail, contraseña: contraseña, celular: celular, años: años, rol: rolUsuario, area: area });

        // Creación de usuario de autenticación.
        const auth = getAuth();
        createUserWithEmailAndPassword(auth, mail, contraseña)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log(user);
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(errorCode + " - " + errorMessage)
                // ..
            });
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

                <FormularioRegistro onSubmit={almacenar}>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Nombre y apellido:</TituloCamposRegistro>
                        <CamposRegistro
                            value={nombreUsuario}
                            onChange={(e) => setNombreUsuario(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Mail:</TituloCamposRegistro>
                        <CamposRegistro
                            value={mail}
                            onChange={(e) => setMail(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Contraseña:</TituloCamposRegistro>
                        <CamposRegistro
                            value={contraseña}
                            onChange={(e) => setContraseña(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Celular:</TituloCamposRegistro>
                        <CamposRegistro
                            value={celular}
                            onChange={(e) => setCelular(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Años:</TituloCamposRegistro>
                        <CamposRegistro
                            value={años}
                            onChange={(e) => setAños(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <EspacioSelectsRegistro>
                        <ContenedorCamposRegistro>
                            <TituloCamposRegistro>Área:</TituloCamposRegistro>
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

                    <ContenedorBotonesRegistro>
                        <BotonIngresoRegistro typeof='submit'>Ingresar</BotonIngresoRegistro>
                        <BotonRegresar onClick={volverAUsuarios}>Volver a usuarios</BotonRegresar>
                    </ContenedorBotonesRegistro>

                </FormularioRegistro>
            </ContenedorFormulario>

            <Alerta
                tipo={alerta.tipo}
                mensaje={alerta.mensaje}
                estadoAlerta={estadoAlerta}
                cambiarEstadoAlerta={cambiarEstadoAlerta}
            />


        </>
    )
}

export default RegistrarUsuario;
