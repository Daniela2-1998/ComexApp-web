import React, { useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';

import { doc, setDoc } from 'firebase/firestore';

// Imports estilos
import '../css/TamañosFormularios.css';
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

  // Función para almacenar categoria.
  const almacenar = async (e) => {
    e.preventDefault();

    // Verificación de que los campos no estén vacíos.
    if (proveedor === '' || pais === ''||categoria === '') {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Debes completar todos los campos.'
      });
      return;
    }

    // Vinculación con los campos.
    await setDoc(doc(db, "proveedores", proveedor), { proveedor: proveedor, pais: pais, categoria: categoria, estado: estado });

    navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
  }


  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Registrar proveedor</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>

      <ContenedorFormulario className='contenedor-proveedores'>
        <ContenedorTituloRegistro>
          <h1>Agregar proveedor</h1>
        </ContenedorTituloRegistro>

        <FormularioRegistro onSubmit={almacenar}>

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
