import React, { useState, useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

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



function EditarUsuario() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();

    const { id } = useParams();


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


    // Función recupero usuario específico.
    const obtenerUsuarioById = async (id) => {
        // Recuperación del usuario según ID.
        const usuarioFirebase = await getDoc(doc(db, "usuarios", id));

        // Si hay usuario, se recupera la información y se la guarda en un estado para usarla en los campos.
        if (usuarioFirebase.exists()) {
            setNombreUsuario(usuarioFirebase.data().nombre);
            setMail(usuarioFirebase.data().mail);
            setContraseña(usuarioFirebase.data().contraseña);
            setCelular(usuarioFirebase.data().celular);
            setAños(usuarioFirebase.data().años);
            setRolUsuario(usuarioFirebase.data().rol);
            setArea(usuarioFirebase.data().area);
        } else {
            console.log("No existe el usuario solicitado.");
        }
    }

    // La función se ejecuta una única vez al abrir la página.
    useEffect(() => {
        obtenerUsuarioById(id)
    }, []);

        // Función para actualizar la información del usuario.
        const actualizarUsuario = async (e) => {
            // Evita que se recargue la página en caso de error.
            e.preventDefault();
    
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
            if(contraseña.length  < 6){
                cambiarEstadoAlerta(true);
                cambiarAlerta({
                    tipo: 'error',
                    mensaje: "La contraseña debe tener al menos 6 caracteres."
                });
                return;
            }
    
            const user = doc(db, "usuarios", id)
            const data = { nombre: nombreUsuario, mail: mail, contraseña: contraseña, celular: celular, años: años, rol: rolUsuario, area: area };
            await updateDoc(user, data);
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
                    <h1>Editar usuario</h1>
                </ContenedorTituloRegistro>

                <FormularioRegistro onSubmit={actualizarUsuario}>

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
                            type="password"
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

                    <ContenedorBotonesRegistro>
                        <BotonIngresoRegistro typeof='submit'>Editar</BotonIngresoRegistro>
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

export default EditarUsuario;
