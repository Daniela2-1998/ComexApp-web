import React, { useState, useEffect } from 'react';

import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import '../css/Mercaderias.css';

import ContenedorGeneralInicio from '../components/ContenedorGeneral';
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';
import BotonRegresar from '../components/BotonRegresar';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { collection, getDocs } from 'firebase/firestore';



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


    const aRegistrarCategoria = () => {
        navigate(`/categoria-producto/${nombre}/${usuario}/${rol}/${sesion}`);
    }


    const aRegistrarProveedor = () => {
        navigate(`/proveedor-producto/${nombre}/${usuario}/${rol}/${sesion}`);
    }



    const mercaderiasCollection = collection(db, "mercaderiasInt");

    // Función recupero de categorías de Firebase.
    const obtenerMercaderias = async () => {
        const data = await getDocs(mercaderiasCollection);

        setMercaderias(
            data.docs.map((doc) => ({ ...doc.data(), id: doc.id }))

        );
    }

    useEffect(() => {
        obtenerMercaderias();
    }, [])



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

                <div className='contenedor-mercaderias'>
                    <h1 className='titulo-mercaderias'>Mercaderias internacionales</h1>

                    <div className='espacio-botones-merc'>
                        <button className='botones-mercaderias agregar-merc' onClick={aRegistrarMercaderias}>Agregar mercadería</button>
                        <button className='botones-mercaderias listado'>Ver listado</button>
                        <BotonRegresar className='botones-mercaderias'>Volver atrás</BotonRegresar>
                    </div>

                    <div className='espacio-botones-merc'>
                        <button className='botones-mercaderias agregar-cat' onClick={aRegistrarCategoria}>Agregar categoría</button>
                        <button className='botones-mercaderias agregar-prov' onClick={aRegistrarProveedor}>Agregar proveedor</button>
                        <button className='botones-mercaderias catyprov'>categorias y proveedores</button>
                    </div>


                    <div className='espacio-cards'>

                        {mercaderias ?
                            mercaderias.map((mercaderia) => {



                                return (
                                    <>
                                        <div
                                            className='card-merc'
                                            key={mercaderia.id}
                                            data-valor={mercaderia.id}
                                        >
                                            <h3 className='cartel-producto'>{mercaderia.producto}</h3>

                                            <div className='espacio-descripcion'>
                                                <label className='descripcion-producto'>Precio: USD{mercaderia.precio}</label>
                                                <label className='descripcion-producto'>Disponible: {mercaderia.stock}</label>
                                                <label className='descripcion-producto'>Estado: {mercaderia.estado}</label>
                                                <label className='descripcion-producto'>Proveedor: {mercaderia.proveedor}</label>
                                                <label className='descripcion-producto categoria'>{mercaderia.categoria}</label>
                                            </div>
                                        </div>
                                    </>
                                )
                            })
                            :
                            <div className='card-merc'>

                            </div>
                        }


                    </div>
                </div>

            </ContenedorGeneralInicio>
        </>
    )
}

export default MercaderiasInt
