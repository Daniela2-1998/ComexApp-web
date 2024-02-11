import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import '../css/Mercaderias.css';

import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import BotonRegresar from '../components/BotonRegresar';

import {ContenedorMercaderias, TituloMercaderias, EspacioBotonesMercaderia, BotonesMercaderias, ContenedorCardsMercaderias, 
    CardMercaderias, NombreMercaderia, ContenedorInformacionMercaderias, DescripcionMercaderias, ContenedorPrecioYStockMercaderias,
    PrecioYStockMercaderias, EstadoMercaderias, ProveedorMercaderias, CategoriaMercaderias, OpcionesIndividualesMercaderias} from '../components/ElementosMercaderias';

// Import de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';




// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



function MercaderiasInt() {

    const { nombre } = useParams();
    const { rol } = useParams();
    const { usuario } = useParams();
    const { sesion } = useParams();

    const [mercaderias, setMercaderias] = useState('');

    const navigate = useNavigate();

    const aRegistrarMercaderias = () => {
        navigate(`/comercio-exterior/registrar-mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    // Función volver atrás.
    const volverAtras = () => {
        navigate(`/comercio-exterior/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    const aRegistrarCategoria = () => {
        navigate(`/categoria-producto/${nombre}/${usuario}/${rol}/${sesion}`);
    }


    const aRegistrarProveedor = () => {
        navigate(`/proveedor-producto/${nombre}/${usuario}/${rol}/${sesion}`);
    }


    const aListadoProveedoresYCategorias = () => {
        navigate(`/listado-proveedores-y-categorias/${nombre}/${usuario}/${rol}/${sesion}`);
    }


    const mercaderiasCollection = collection(db, "mercaderiasInt");

    // Función obtener mercaderías
    const obtenerMercaderias = async () => {
        const data = await getDocs(mercaderiasCollection);

        setMercaderias(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        );
    }

    useEffect(() => {
        obtenerMercaderias();
    }, [])
    
    


    // Función eliminar mercadería
    const eliminarMercaderia = async (id) => {
        const documentoMercaderia = doc(db, "mercaderiasInt", id);
        await deleteDoc(documentoMercaderia);
        obtenerMercaderias();
    }



    
    // Funcion de confirmacion para Sweet Alert 2.
    const confirmarEliminar = (id) => {
        new MySwal({
            title: "¿Deseas eliminar este producto?",
            text: "Eliminar es una acción irreversible",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Si, borrar'
        }).then((result) => {

            if (result.isConfirmed) {
                // Uso de la función para eliminar registro.
                eliminarMercaderia(id);
                if(eliminarMercaderia(id)){
                new MySwal(
                    '¡Eliminación éxitosa!',
                    'El registro fue eliminado.',
                    'success'
                )
                }

            }
        })
    }



    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Mercaderías internacionales - {nombre}</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>

            <ContenedorGeneralInicio>

                <Encabezado pasarElRol={rol} />

                <MenuOpcionesInicio pasarElRol={rol} />

                <ContenedorMercaderias>
                    <TituloMercaderias>Mercaderias internacionales</TituloMercaderias>

                    <EspacioBotonesMercaderia>
                        <BotonesMercaderias className='agregar-merc' onClick={aRegistrarMercaderias}>Agregar mercadería</BotonesMercaderias>
                        <BotonesMercaderias className='listado'>Ver listado</BotonesMercaderias>
                        <BotonRegresar className='botones-mercaderias' onClick={volverAtras}>Volver atrás</BotonRegresar>
                    </EspacioBotonesMercaderia>

                    <EspacioBotonesMercaderia>
                        <BotonesMercaderias className='agregar-cat' onClick={aRegistrarCategoria}>Agregar categoría</BotonesMercaderias>
                        <BotonesMercaderias className='agregar-prov' onClick={aRegistrarProveedor}>Agregar proveedor</BotonesMercaderias>
                        <BotonesMercaderias className='catyprov' onClick={aListadoProveedoresYCategorias}>Categorias y proveedores</BotonesMercaderias>
                    </EspacioBotonesMercaderia>


                    <ContenedorCardsMercaderias>
                        {mercaderias ?
                            mercaderias.map((mercaderia) => {

                                return (

                                    <CardMercaderias
                                        key={mercaderia.id}
                                        data-valor={mercaderia.id}
                                    >
                                        <NombreMercaderia>{mercaderia.producto}</NombreMercaderia>

                                        <ContenedorInformacionMercaderias>
                                            <DescripcionMercaderias>{mercaderia.descripcion}</DescripcionMercaderias>
                                            <ContenedorPrecioYStockMercaderias>
                                                <PrecioYStockMercaderias>USD {mercaderia.precio}</PrecioYStockMercaderias>
                                                <PrecioYStockMercaderias>Stock: {mercaderia.stock}</PrecioYStockMercaderias>
                                            </ContenedorPrecioYStockMercaderias>
                                            {mercaderia.estado === 'disponible'
                                                ?
                                                <EstadoMercaderias className='disponible'>{mercaderia.estado}</EstadoMercaderias>
                                                :
                                                <EstadoMercaderias className='sin-stock'>{mercaderia.estado}</EstadoMercaderias>
                                            }

                                            <ProveedorMercaderias>Proveedor: {mercaderia.proveedor}</ProveedorMercaderias>
                                            <CategoriaMercaderias>{mercaderia.categoria}</CategoriaMercaderias>
                                        </ContenedorInformacionMercaderias>

                                        <OpcionesIndividualesMercaderias>
                                            <Link to={`/comercio-exterior/editar-mercaderia/${nombre}/${usuario}/${rol}/${sesion}/${mercaderia.id}`} className="icono btn btn-light"><i className="fa-solid fa-pencil"></i></Link>
                                            <button onClick={() => { confirmarEliminar(mercaderia.id) }} className="btn btn-danger"><i className="fa-solid fa-trash"></i></button>
                                        </OpcionesIndividualesMercaderias>
                                    </CardMercaderias>
                                )
                            })

                            :
                            ''
                        }
                    </ContenedorCardsMercaderias>


                </ContenedorMercaderias>

            </ContenedorGeneralInicio >
        </>
    )
}

export default MercaderiasInt
