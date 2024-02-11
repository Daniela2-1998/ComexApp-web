import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { Helmet, HelmetProvider } from "react-helmet-async";

// Imports estilos.
import styled from 'styled-components';

// Import Firebase.
import { db } from '../firebase/FirebaseConfig';
import { getDocs, collection, doc, deleteDoc } from "firebase/firestore";

// Import de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Import componentes
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import { TituloMercaderias } from '../components/ElementosMercaderias';
import BotonRegresar from '../components/BotonRegresar';



// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




function CategoriasYProveedores() {

    const { nombre } = useParams();
    const { rol } = useParams();
    const { usuario } = useParams();
    const { sesion } = useParams();

    const [categorias, setCategorias] = useState('');
    const [proveedores, setProveedores] = useState('');

    const categoriasCollection = collection(db, "categorias");
    const proveedoresCollection = collection(db, "proveedores");

    const navigate = useNavigate();



    const obtenerCategorias = async () => {
        const data = await getDocs(categoriasCollection);

        setCategorias(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        );
    }

    const obtenerProveedores = async () => {
        const data = await getDocs(proveedoresCollection);

        setProveedores(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        );
    }


    useEffect(() => {
        obtenerCategorias();
        obtenerProveedores();
    }, [])


    const eliminarCategoria = async (id) => {
        const documentoCategoria = doc(db, "categorias", id);
        await deleteDoc(documentoCategoria);
        obtenerCategorias();
    }


    // Funcion de confirmacion para Sweet Alert 2.
    const confirmarEliminarCategoria = (id) => {
        new MySwal({
            title: "¿Deseas eliminar la categoría?",
            text: "Eliminar es una acción irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                // Uso de la función para eliminar registro.
                eliminarCategoria(id);
                if (eliminarCategoria(id)) {
                    new MySwal(
                        '¡Eliminación éxitosa!',
                        'El registro fue eliminado.',
                        'success'
                    )
                }

            }
        })
    }


    // Función volver atrás.
    const volverAMercaderias = () => {
        navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Categorías y proveedores</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>


            <ContenedorGeneralInicio>

                <Encabezado pasarElRol={rol} />

                <MenuOpcionesInicio pasarElRol={rol} pasarNombre={nombre} pasarSesion={sesion} pasarUsuario={usuario} />

                <TituloMercaderias>Listados de categorías y proveedores</TituloMercaderias>


                <ContenedorListados>
                    <ContenedorListado>
                        <Subtitulos>Categorías:</Subtitulos>
                        <Listado>
                            {categorias ?
                                categorias.map((categoria) => {

                                    return (
                                        <Registro
                                            key={categoria.id}
                                            data-valor={categoria.id}
                                        >
                                            <label>{categoria.categoria}</label>
                                            <OpcionesBotones>
                                                <Link to={`/editar-categoria/${nombre}/${usuario}/${rol}/${sesion}/${categoria.id}`} className="icono btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmarEliminarCategoria(categoria.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                            </OpcionesBotones>
                                        </Registro>

                                    )
                                })

                                :
                                ''
                            }
                        </Listado>
                    </ContenedorListado>
                    <ContenedorListado>
                        <Subtitulos>Proveedores:</Subtitulos>
                        <Listado>
                            {proveedores ?
                                proveedores.map((proveedor) => {

                                    return (
                                        <Registro
                                            className='registro'
                                            key={proveedor.id}
                                            data-valor={proveedor.id}
                                        >
                                            <label>{proveedor.proveedor}</label>
                                            <CategoriaDeProveedor>{proveedor.categoria}</CategoriaDeProveedor>

                                            <OpcionesBotones>
                                                <Link to={`/editar-proveedor/${nombre}/${usuario}/${rol}/${sesion}/${proveedor.id}`} className="icono btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                                <button onClick={() => { confirmarEliminarCategoria(proveedor.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                            </OpcionesBotones>
                                        </Registro>

                                    )
                                })

                                :
                                ''
                            }
                        </Listado>
                    </ContenedorListado>
                </ContenedorListados>

                <BotonRegresar onClick={volverAMercaderias} className='boton-volver-mercaderias'>Volver a mercaderías</BotonRegresar>

            </ContenedorGeneralInicio >
        </>
    )
}

const Subtitulos = styled.h3`
    margin-top: 2%;
    margin-left: 10%;
    color: #1A1594;
    text-align: left;
`;

const ContenedorListados = styled.div`
    width: 100%;
    display: flex;
`;

const ContenedorListado = styled.div`
    width: 80%;
    margin-left: 7%;
    justify-content: space-around;
    display: flex;
    flex-direction: column;
`;

const Listado = styled.div`
    width: 100%;
    height: fit-content;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`;

const Registro = styled.div`
    width: 70%;
    height: 50px;
    margin-left: 10%;
    margin-bottom: 3%;
    padding: 1.5%;
    border-radius: 20px;
    background-color: #d7d6d6;
    color: #1A1594;
    display: flex;
    justify-content: space-evenly;
    font-weight: bolder;
    box-shadow: 1px 1px 1px 1px;
`;

const CategoriaDeProveedor = styled.label`
  width: 35%;
  padding: 1%;
  border-radius: 20px;
  color: #fff;
  background-color: #1A1594;
`;

const OpcionesBotones = styled.div`
  width: 35%;
  height: 50px;
  margin-top: -2%;
  padding: 1.5%;
`;


export default CategoriasYProveedores;
