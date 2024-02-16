import React, { useState, useEffect } from 'react';

import { Link } from 'react-router-dom';

// Import de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Import componentes
import { ContenedorTituloTabla, EncabezadoTabla, RegistroTabla } from './ElementosTablas';

// Import estilos
import '../css/Tabla.css';

// Imports Firebase
import { collection, deleteDoc, doc, getDocs, query, where } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';




// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



function TablaExportadores({pasarRol, pasarUsuario, pasarNombre, pasarSesion}) {

    const [exportadores, setExportadores] = useState([]);

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


    const rol = pasarRol;
    const usuario = pasarUsuario;
    const nombre = pasarNombre;
    const sesion = pasarSesion;


    const consulta = query(
        collection(db, 'participantesComex'),
        where('cargo', '==', 'exportador'),
    );


    // Función recupero de exportadores de Firebase.
    const obtenerExportadores = async () => {
        const data = await getDocs(consulta);
        setExportadores(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        );
    }
   

    // Función eliminar registro.
    const eliminarExportadores = async (id) => {
        const documentoExportador = doc(db, "participantesComex", id);
        await deleteDoc(documentoExportador);
        obtenerExportadores();
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
          eliminarExportadores(id);
          Swal.fire(
              '¡Eliminación éxitosa!',
              'El registro fue eliminado.',
              'success'
          )

      }
  })
  }


  // Uso de useEffect para obtener usuarios al cargar la página.
  useEffect( () => {
    obtenerExportadores();
  }, [] )



    return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>

                        <ContenedorTituloTabla>
                            <h5>Administrar exportadores</h5>
                            <Link to={`/comercio-exterior/registrar/${usuario}/${nombre}/${rol}/${sesion}`} className='btn boton-registro'><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar participante</Link>
                        </ContenedorTituloTabla>

                        <table className='table table-ligth table-hover'>
                            <thead>
                                <tr>
                                    <EncabezadoTabla>ID</EncabezadoTabla>
                                    <EncabezadoTabla>Empleado</EncabezadoTabla>
                                    <EncabezadoTabla>Empresa</EncabezadoTabla>
                                    <EncabezadoTabla>Cargo</EncabezadoTabla>
                                    <EncabezadoTabla>Mail</EncabezadoTabla>
                                    <EncabezadoTabla>Teléfono</EncabezadoTabla>
                                    <EncabezadoTabla>CUIT</EncabezadoTabla>
                                    <EncabezadoTabla>País</EncabezadoTabla>
                                    <EncabezadoTabla>Productos</EncabezadoTabla>
                                    <EncabezadoTabla>Estado</EncabezadoTabla>
                                    <EncabezadoTabla>Acciones</EncabezadoTabla>
                                </tr>
                            </thead>
                            <tbody className='borde-tabla'>
                                {exportadores.map((expo) => (
                                    <tr key={expo.id}>
                                        <RegistroTabla>{expo.id}</RegistroTabla>
                                        <RegistroTabla>{expo.empleado}</RegistroTabla>
                                        <RegistroTabla>{expo.empresa}</RegistroTabla>
                                        <RegistroTabla>{expo.cargo}</RegistroTabla>
                                        <RegistroTabla>{expo.mail}</RegistroTabla>
                                        <RegistroTabla>{expo.telefono}</RegistroTabla>
                                        <RegistroTabla>{expo.CUIT}</RegistroTabla>
                                        <RegistroTabla>{expo.pais}</RegistroTabla>
                                        <RegistroTabla>{expo.productos}</RegistroTabla>
                                        <RegistroTabla>{expo.estado}</RegistroTabla>
                                        <RegistroTabla>
                                            <Link to={`/editar-usuario/${usuario}/${nombre}/${rol}/${sesion}/${expo.id}`} className="icono btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => { confirmarEliminar(expo.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                        </RegistroTabla>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
    )
}




export default TablaExportadores;
