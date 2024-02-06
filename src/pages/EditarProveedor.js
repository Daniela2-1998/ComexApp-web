import React, { useState,useEffect } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

// Imports estilos
import '../css/TamañosFormularios.css';

// Imports componentes
import {
  ContenedorFormulario, ContenedorTituloRegistro, ContenedorCamposRegistro, TituloCamposRegistro, FormularioRegistro,
  CamposRegistro, ContenedorBotonesRegistro, BotonIngresoRegistro
} from '../components/ElementosFormulario';
import BotonRegresar from '../components/BotonRegresar';
import Alerta from '../components/Alerta';
import SelectCategoria from '../components/SelectCategoria';



function RegistrarProveedor() {

  const { usuario } = useParams();
  const { nombre } = useParams();
  const { rol } = useParams();
  const { sesion } = useParams();

  const { id } = useParams();

  const [proveedor, setProveedor] = useState('');
  const [pais, setPais] = useState('');
  const [categoria, setCategoria] = useState('general');
  const [estado, setEstado] = useState('');

  const navigate = useNavigate();

  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState('');


  // Función volver atrás.
  const volverAMercaderias = () => {
    navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
  }

  // Función recupero proveedor específico.
  const obtenerProveedorById = async (id) => {
    // Recuperación del proveedor según ID.
    const proveedorFirebase = await getDoc(doc(db, "usuarios", id));

    // Si hay usuario, se recupera la información y se la guarda en un estado para usarla en los campos.
    if (proveedorFirebase.exists()) {
        setProveedor(proveedorFirebase.data().proveedor);
        setPais(proveedorFirebase.data().pais);
        setCategoria(proveedorFirebase.data().categoria);
        setEstado(proveedorFirebase.data().estado);
    } else {
        console.log("No existe el proveedor solicitado.");
    }
}

// La función se ejecuta una única vez al abrir la página.
useEffect(() => {
    obtenerProveedorById(id)
}, []);


// Función para actualizar la información del proveedor.
const actualizarProveedor = async (e) => {
  // Evita que se recargue la página en caso de error.
  e.preventDefault();


  const prov = doc(db, "proveedores", id)
  const data = { proveedor: proveedor, pais: pais, categoria: categoria, estado: estado };
  await updateDoc(prov, data);
  navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
}



  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Editar proveedor</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>

      <ContenedorFormulario className='contenedor-proveedores'>
        <ContenedorTituloRegistro>
          <h1>Editar proveedor</h1>
        </ContenedorTituloRegistro>

        <FormularioRegistro onSubmit={actualizarProveedor}>

          <ContenedorCamposRegistro>
            <TituloCamposRegistro>Proveedor:</TituloCamposRegistro>
            <CamposRegistro
              value={proveedor}
              onChange={(e) => setProveedor(e.target.value)}
              type="text"
            />
          </ContenedorCamposRegistro>

          <ContenedorCamposRegistro>
            <TituloCamposRegistro>País:</TituloCamposRegistro>
            <CamposRegistro
              value={pais}
              onChange={(e) => setPais(e.target.value)}
              type="text"
            />
          </ContenedorCamposRegistro>

          <ContenedorCamposRegistro>
            <TituloCamposRegistro>Estado:</TituloCamposRegistro>
            <CamposRegistro
              value={estado}
              onChange={(e) => setEstado(e.target.value)}
              type="text"
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

export default RegistrarProveedor;
