import React, { useState, useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';

import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Imports estilos
import {
    ContenedorFormulario, ContenedorTituloRegistro, ContenedorCamposRegistro, ContenedorCamposDescripcionRegistro, 
    TituloCamposRegistro, FormularioRegistro, CamposRegistro, CamposDescripcionRegistro, ContenedorBotonesRegistro, BotonIngresoRegistro
  } from '../components/ElementosFormulario';
  
  import SelectCategoria from '../components/SelectCategoria';
  import SelectEstadoMercaderia from '../components/SelectEstadoMercaderia';
  import SelectProveedor from '../components/SelectProveedor';
  import BotonRegresar from '../components/BotonRegresar';
  import Alerta from '../components/Alerta';
  
  
  import '../css/Mercaderias.css';


function EditarMercaderia() {

    const { usuario } = useParams();
    const { nombre } = useParams();
    const { rol } = useParams();
    const { sesion } = useParams();

    const { id } = useParams();

    const [producto, setProducto] = useState('');
    const [stock, setStock] = useState(0);
    const [precio, setPrecio] = useState(0.0);
    const [proveedor, setProveedor] = useState('propio');
    const [categoria, setCategoria] = useState('general');
    const [estado, setEstado] = useState('disponible');
    const [descripcion, setDescripcion] = useState('');

    const navigate = useNavigate();

    const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
    const [alerta, cambiarAlerta] = useState('');



    // Función volver atrás.
    const volverAMercaderias = () => {
        navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
    }



    const obtenerMercaderiaById = async (id) => {
        const mercaderiaFirebase = await getDoc(doc(db, "mercaderiasInt", id));
    
        if (mercaderiaFirebase.exists()) {
            setProducto(mercaderiaFirebase.data().producto);
            setStock(mercaderiaFirebase.data().stock);
            setPrecio(mercaderiaFirebase.data().precio);
            setProveedor(mercaderiaFirebase.data().proveedor);
            setCategoria(mercaderiaFirebase.data().categoria);
            setEstado(mercaderiaFirebase.data().estado);
            setDescripcion(mercaderiaFirebase.data().descripcion);
        } else {
            console.log("No existe la mercaderia solicitado.");
        }
    }
    
    // La función se ejecuta una única vez al abrir la página.
    useEffect(() => {
       obtenerMercaderiaById(id)
    }, []);

    

    const actualizarMercaderia = async (e) => {
        e.preventDefault();

        const mer = doc(db, "mercaderiasInt", id);
        const data = { producto: producto, stock: stock, precio: precio, proveedor: proveedor, descripcion: descripcion, categoria: categoria, estado: estado };
        await updateDoc(mer, data);
        navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
    }


    return (
        <>
            <HelmetProvider>
                <Helmet>
                    <title>Modificar mercaderías internacionales</title>
                    <link rel='icon' href="../images/logo.png" />
                </Helmet>
            </HelmetProvider>

            <ContenedorFormulario id='tamaño-contenedor-formulario-mercaderias'>
                <ContenedorTituloRegistro>
                    <h1>Modificar mercadería exterior</h1>
                </ContenedorTituloRegistro>

                <FormularioRegistro onSubmit={actualizarMercaderia} id='tamaño-formulario-mercaderias'>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Producto:</TituloCamposRegistro>
                        <CamposRegistro
                            value={producto}
                            onChange={(e) => setProducto(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Stock:</TituloCamposRegistro>
                        <CamposRegistro
                            value={stock}
                            onChange={(e) => setStock(e.target.value)}
                            type="number"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Precio:</TituloCamposRegistro>
                        <CamposRegistro
                            value={precio}
                            onChange={(e) => setPrecio(e.target.value)}
                            type="number"
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro id='espacios-select'>
                        <TituloCamposRegistro>Proveedor:</TituloCamposRegistro>
                        <SelectProveedor
                            proveedor={proveedor}
                            setProveedor={setProveedor}
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposDescripcionRegistro>
                        <TituloCamposRegistro>Descripción:</TituloCamposRegistro>
                        <CamposDescripcionRegistro
                            value={descripcion}
                            onChange={(e) => setDescripcion(e.target.value)}
                            type="text"
                        />
                    </ContenedorCamposDescripcionRegistro>

                    <ContenedorCamposRegistro id='espacios-select-estado'>
                        <TituloCamposRegistro>Estado:</TituloCamposRegistro>
                        <SelectEstadoMercaderia
                            estado={estado}
                            setEstado={setEstado}
                        />
                    </ContenedorCamposRegistro>

                    <ContenedorCamposRegistro>
                        <TituloCamposRegistro>Categoría:</TituloCamposRegistro>
                        <SelectCategoria
                            categoria={categoria}
                            setCategoria={setCategoria}
                        />
                    </ContenedorCamposRegistro>



                    <ContenedorBotonesRegistro>
                        <BotonIngresoRegistro typeof='submit'>Ingresar</BotonIngresoRegistro>
                        <BotonRegresar onClick={volverAMercaderias}>Volver a mercaderías</BotonRegresar>
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

export default EditarMercaderia;
