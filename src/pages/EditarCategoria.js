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



function RegistrarCategoria() {

  const { usuario } = useParams();
  const { nombre } = useParams();
  const { rol } = useParams();
  const { sesion } = useParams();

  const { id } = useParams();

  const [categoria, setCategoria] = useState('');
  const [estado, setEstado] = useState('');

  const navigate = useNavigate();

  const [estadoAlerta, cambiarEstadoAlerta] = useState(false);
  const [alerta, cambiarAlerta] = useState('');


  // Función volver atrás.
  const volverAMercaderias = () => {
    navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
  }

  const obtenerCategoriaById = async (id) => {
    const categoriaFirebase = await getDoc(doc(db, "categorias", id));

    if (categoriaFirebase.exists()) {
        setCategoria(categoriaFirebase.data().categoria);
        setEstado(categoriaFirebase.data().estado);
    } else {
        console.log("No existe la categoria solicitado.");
    }
}

// La función se ejecuta una única vez al abrir la página.
useEffect(() => {
   obtenerCategoriaById(id)
}, []);


// Función para actualizar la información del proveedor.
const actualizarCategoria = async (e) => {
  // Evita que se recargue la página en caso de error.
  e.preventDefault();


  const cat = doc(db, "categorias", id)
  const data = { categoria: categoria, estado: estado };
  await updateDoc(cat, data);
  navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
}



  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Editar categoria</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>

      <ContenedorFormulario className='contenedor-categorias'>
        <ContenedorTituloRegistro>
          <h1>Editar categoría</h1>
        </ContenedorTituloRegistro>

        <FormularioRegistro onSubmit={actualizarCategoria}>

          <ContenedorCamposRegistro>
            <TituloCamposRegistro>Categoría:</TituloCamposRegistro>
            <CamposRegistro
              value={categoria}
              onChange={(e) => setCategoria(e.target.value)}
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

export default RegistrarCategoria;
