import React, { useState, useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams, Link } from 'react-router-dom';

// Imports Firebase
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';

import styled from 'styled-components';

import '../css/Logistica.css';

import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import { Titulo } from '../components/ElementosParticipantes';
import { OpcionesIndividualesMercaderias, BotonesMercaderias }from '../components/ElementosMercaderias';
import { DevolucionConsulta, EmpresaConsulta, ContenedorRespuestaConsulta, NombreCampoConsulta, LabelConsulta, LabelActivoConsulta, LabelInactivoConsulta } from './ConsultarLogistica';
import BotonRegresar from '../components/BotonRegresar';


// Import de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



function LogisticaRegistrados() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();
    const { medio } = useParams();

    const [compañias, setCompañias] = useState([]);

    const [id, setId] = useState('');
    const [empleado, setEmpleado] = useState('');
    const [empresa, setEmpresa] = useState('');
    const [mail, setMail] = useState('');
    const [telefono, setTelefono] = useState('');
    const [CUIT, setCUIT] = useState('');
    const [pais, setPais] = useState('');
    const [productosAsociados, setProductosAsociados] = useState('');

    const [participante, setParticipante] = useState('exportador');
    const [estado, setEstado] = useState('activo');

    const navigate = useNavigate();

    const consulta = query(
        collection(db, 'participantesComex'),
        where('cargo', '==', "logistica"),
        where('medio', '==', medio),
    );

    const obtenerParticipantes = async () => {
        const data = await getDocs(consulta);
        setCompañias(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    useEffect(() => {
        obtenerParticipantes();
    }, [])


    const eliminarMaritima = async (id) => {
        const documentoMar = doc(db, "participantesComex", id);
        await deleteDoc(documentoMar);
        obtenerParticipantes();
    }



    // Funcion de confirmacion para Sweet Alert 2.
    const confirmarEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar la marítima?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
        }).then((result) => {

            if (result.isConfirmed) {
                // Uso de la función para eliminar registro.
                eliminarMaritima(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )

            }
        })
    }

    const atras = () => {
        if (medio === 'terrestre') {
            navigate(`/comercio-exterior/logistica/terrestre/${nombre}/${usuario}/${rol}/${sesion}`);
        } else if (medio === 'marítimo') {
            navigate(`/comercio-exterior/logistica/maritimo/${nombre}/${usuario}/${rol}/${sesion}`);
        } else if (medio === 'aereo'){
            navigate(`/comercio-exterior/logistica/aereo/${nombre}/${usuario}/${rol}/${sesion}`);
        }
    }



    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Logística internacional - {nombre}</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>

            <Encabezado pasarElRol={rol} />
            <MenuOpcionesInicio pasarElRol={rol} />

            <Titulo>Listado de empresas de {medio}</Titulo>


            {compañias ?
                compañias.map((comp) => {

                    return (
                        <DevolucionConsulta
                            key={comp.id}
                            data-valor={comp.id}
                        >
                            <EmpresaConsulta>{comp.empresa}</EmpresaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>ID:</NombreCampoConsulta>
                                <LabelConsulta>{comp.id}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Empleado:</NombreCampoConsulta>
                                <LabelConsulta>{comp.empleado}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Mail:</NombreCampoConsulta>
                                <LabelConsulta>{comp.mail}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Teléfono:</NombreCampoConsulta>
                                <LabelConsulta>{comp.telefono}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>CUIT:</NombreCampoConsulta>
                                <LabelConsulta>{comp.CUIT}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>País:</NombreCampoConsulta>
                                <LabelConsulta>{comp.pais}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Productos:</NombreCampoConsulta>
                                <LabelConsulta>{comp.productos}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Medio:</NombreCampoConsulta>
                                <LabelConsulta>{comp.medio}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <ContenedorRespuestaConsulta>
                                <NombreCampoConsulta>Requisitos:</NombreCampoConsulta>
                                <LabelConsulta>{comp.requisitos}</LabelConsulta>
                            </ContenedorRespuestaConsulta>

                            <OpcionesIndividualesMercaderias>
                                <Link to={`/comercio-exterior/editar-participante/${nombre}/${usuario}/${rol}/${sesion}/${comp.id}`} className="icono btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                <button onClick={() => { confirmarEliminar(comp.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                            </OpcionesIndividualesMercaderias>

                            {comp.estado === 'activo'
                                ?
                                <LabelActivoConsulta>{comp.estado}</LabelActivoConsulta>
                                :
                                <LabelInactivoConsulta>{comp.estado}</LabelInactivoConsulta>
                            }


                        </DevolucionConsulta>

                    )

                })

                :
                ''
            }
            <BotonRegresar className='boton-logistica-regresar' onClick={atras}>Volver a {medio}</BotonRegresar>

        </>
    )
}

export default LogisticaRegistrados;

