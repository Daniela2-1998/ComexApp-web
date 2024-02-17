import React, { useState, useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams, Link } from 'react-router-dom';

// Import de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Imports Firebase
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';

import { Titulo, ContenedorCardsParticipantes, CardParticipante, ContenedorNombreParticipante, DescripcionParticipante, 
    InformacionParticipante, IDParticipante, ParticipanteActivo, ParticipanteInactivo } from '../components/ElementosParticipantes';
import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import { ContenedorMercaderias, EspacioBotonesMercaderia, BotonesMercaderias } from '../components/ElementosMercaderias';
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import BotonRegresar from '../components/BotonRegresar';

import '../css/Mercaderias.css';
import '../css/Comercio.css';


// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



function Importadores() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();

    const [importadores, setImportadores] = useState([]);

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


    // Función volver atrás.
    const volverAComex = () => {
        navigate(`/comercio-exterior/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aRegistrarParticipante = () => {
        navigate(`/comercio-exterior/registrar/${nombre}/${usuario}/${rol}/${sesion}`);
    }



    const consulta = query(
        collection(db, 'participantesComex'),
        where('cargo', '==', 'importador'),
    );


    // Función recupero de exportadores de Firebase.
    const obtenerImportadores = async () => {
        const data = await getDocs(consulta);
        setImportadores(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
    }


    // Función eliminar registro.
    const eliminarImportadores = async (id) => {
        const documentoImportador = doc(db, "participantesComex", id);
        await deleteDoc(documentoImportador);
        obtenerImportadores();
    }



    // Funcion de confirmacion para Sweet Alert 2.
    const confirmarEliminar = (id) => {
        MySwal.fire({
            title: '¿Desea eliminar al exportador?',
            text: "Esta acción no se puede revertir.",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Eliminar'
        }).then((result) => {

            if (result.isConfirmed) {
                // Uso de la función para eliminar registro.
                eliminarImportadores(id);
                Swal.fire(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )

            }
        })
    }



    useEffect(() => {
        obtenerImportadores();
    }, [])



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
                <Titulo>Importadores</Titulo>

                <ContenedorMercaderias>

                    <EspacioBotonesMercaderia>
                        <BotonesMercaderias className='agregar-merc' onClick={aRegistrarParticipante}>Agregar participante</BotonesMercaderias>
                        <BotonRegresar className='botones-mercaderias' onClick={volverAComex}>Volver atrás</BotonRegresar>
                    </EspacioBotonesMercaderia>

                    <ContenedorCardsParticipantes>
                        {importadores ?
                            importadores.map((importador) => {

                                return (
                                    <CardParticipante
                                        key={importador.id}
                                        data-valor={importador.id}
                                    >
                                        <ContenedorNombreParticipante>
                                            <h2>{importador.empleado}</h2>
                                        </ContenedorNombreParticipante>

                                        
                                        <DescripcionParticipante>
                                            <IDParticipante>ID: {importador.id}</IDParticipante>
                                            <InformacionParticipante>Nombre: {importador.empleado}</InformacionParticipante>
                                            <InformacionParticipante>Empresa: {importador.empresa}</InformacionParticipante>
                                            <InformacionParticipante>Mail: {importador.mail}</InformacionParticipante>
                                            <InformacionParticipante>Número: {importador.telefono}</InformacionParticipante>
                                            <InformacionParticipante>CUIT: {importador.CUIT}</InformacionParticipante>
                                            <InformacionParticipante>País: {importador.pais}</InformacionParticipante>
                                            <InformacionParticipante>Productos: {importador.productos}</InformacionParticipante>
                                            {importador.estado === 'activo'
                                                ?
                                                <ParticipanteActivo>{importador.estado}</ParticipanteActivo>
                                                :
                                                <ParticipanteInactivo>{importador.estado}</ParticipanteInactivo>
                                            }
                                        </DescripcionParticipante>
                                    </CardParticipante>
                                )

                            })

                            :
                            ''
                        }
                    </ContenedorCardsParticipantes>
                </ContenedorMercaderias>

                <BotonRegresar onClick={volverAComex} className='boton-regresar-participantes'>Volver a comercio exterior</BotonRegresar>

            </ContenedorGeneralInicio>

        </>
    )
}

export default Importadores;
