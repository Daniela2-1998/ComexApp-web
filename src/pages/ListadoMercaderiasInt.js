import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Link } from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import '../css/Mercaderias.css';

import { ContenedorMercaderias, TituloMercaderias, ContenedorPrecioStockListado,
    ContenedorListado, Elemento, TituloMercaderiaListado, DescripcionMercaderiaListado, ContenidoListado, ProveedorListado,
    PrecioStockListado, EstadoListado
 } from '../components/ElementosMercaderias';

import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import BotonRegresar from '../components/BotonRegresar';

// Import de SweetAlert2 para el modal de alerta de confirmación de eliminación.
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { collection, getDocs, doc, deleteDoc } from 'firebase/firestore';




// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);



function ListadoMercaderiasInt() {

    const { nombre } = useParams();
    const { rol } = useParams();
    const { usuario } = useParams();
    const { sesion } = useParams();

    const [mercaderias, setMercaderias] = useState('');

    const navigate = useNavigate();

    const aListadoMercaderias = () => {
        navigate(`/comercio-exterior/listado-mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
    }

    // Función volver atrás.
    const volverAtras = () => {
        navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
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
                if (eliminarMercaderia(id)) {
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

                    <ContenedorListado>
                        {mercaderias ?
                            mercaderias.map((mercaderia) => {

                                return (

                                    <Elemento
                                        key={mercaderia.id}
                                        data-valor={mercaderia.id}
                                    >
                                        <TituloMercaderiaListado>{mercaderia.producto}</TituloMercaderiaListado>
                                        <ContenidoListado>
                                            <DescripcionMercaderiaListado>{mercaderia.descripcion}</DescripcionMercaderiaListado>
                                            <ProveedorListado>{mercaderia.proveedor}</ProveedorListado>
                                            <ContenedorPrecioStockListado>
                                                <PrecioStockListado>USD {mercaderia.precio}</PrecioStockListado>
                                                <PrecioStockListado>Stock: {mercaderia.stock}</PrecioStockListado>
                                            </ContenedorPrecioStockListado>
                                            {mercaderia.estado === 'disponible'
                                                ?
                                                <EstadoListado className='disponible'>{mercaderia.estado}</EstadoListado>
                                                :
                                                <EstadoListado className='sin-stock'>{mercaderia.estado}</EstadoListado>
                                            }

                                        </ContenidoListado>
                                    </Elemento>
                                )
                            })

                            :
                            ''
                        }
                    </ContenedorListado>


                </ContenedorMercaderias>

                <BotonRegresar onClick={volverAtras} className='boton-volver-mercaderias'>Regresar</BotonRegresar>

            </ContenedorGeneralInicio >
        </>
    )
}

export default ListadoMercaderiasInt;
