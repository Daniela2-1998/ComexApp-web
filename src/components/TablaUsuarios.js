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
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../firebase/FirebaseConfig';




// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



function TablaUsuarios() {

    const [usuarios, setUsuarios] = useState([]);

    const usuariosCollection = collection(db, "usuarios");

    
    // Función recupero de usuarios de Firebase.
    const obtenerUsuarios = async () => {
        const data = await getDocs(usuariosCollection);
        setUsuarios(
            data.docs.map( (doc) => ({...doc.data(), id:doc.id}))
        );
    }
   

    // Función eliminar registro.
    const eliminarUsuario = async (id) => {
        const documentoUsuario = doc(db, "usuarios", id);
        await deleteDoc(documentoUsuario);
        obtenerUsuarios();
    }


    
  // Funcion de confirmacion para Sweet Alert 2.
  const confirmarEliminar = (id) => {
    MySwal.fire({
      title: '¿Desea eliminar al usuario?',
      text: "Esta acción no se puede revertir.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Eliminar'
  }).then((result) => {

      if (result.isConfirmed) {
          // Uso de la función para eliminar registro.
          eliminarUsuario(id);
          Swal.fire(
              '¡Eliminación éxitosa!',
              'El registro fue eliminado.',
              'Éxito'
          )

      }
  })
  }


  // Uso de useEffect para obtener usuarios al cargar la página.
  useEffect( () => {
    obtenerUsuarios();
  }, [] )



    return (
            <div className='container'>
                <div className='row'>
                    <div className='col'>

                        <ContenedorTituloTabla>
                            <h5>Administrar usuarios</h5>
                            <Link to="/registrar-usuario" className='btn boton-registro'><i class="fa-solid fa-plus fa-beat fa-lg"></i>Agregar usuario</Link>
                        </ContenedorTituloTabla>

                        <table className='table table-ligth table-hover'>
                            <thead>
                                <tr>
                                    <EncabezadoTabla>Nombre y apellido</EncabezadoTabla>
                                    <EncabezadoTabla>Mail</EncabezadoTabla>
                                    <EncabezadoTabla>Celular</EncabezadoTabla>
                                    <EncabezadoTabla>Rol</EncabezadoTabla>
                                    <EncabezadoTabla>Área</EncabezadoTabla>
                                    <EncabezadoTabla>Años</EncabezadoTabla>
                                    <EncabezadoTabla>Acciones</EncabezadoTabla>
                                </tr>
                            </thead>
                            <tbody className='borde-tabla'>
                                {usuarios.map((usuario) => (
                                    <tr key={usuario.id}>
                                        <RegistroTabla>{usuario.nombre}</RegistroTabla>
                                        <RegistroTabla>{usuario.mail}</RegistroTabla>
                                        <RegistroTabla>{usuario.celular}</RegistroTabla>
                                        <RegistroTabla>{usuario.rol}</RegistroTabla>
                                        <RegistroTabla>{usuario.area}</RegistroTabla>
                                        <RegistroTabla>{usuario.años}</RegistroTabla>
                                        <RegistroTabla>
                                            <Link to={`/editar-usuario/${usuario.id}`} className="icono btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => { confirmarEliminar(usuario.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
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




export default TablaUsuarios;
