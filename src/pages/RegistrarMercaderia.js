import React, { useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';

import { doc, setDoc } from 'firebase/firestore';

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


import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';


// Alerta de confirmación de borrado.
const MySwal = withReactContent(Swal);




function RegistrarMercaderia() {


  const { usuario } = useParams();
  const { nombre } = useParams();
  const { rol } = useParams();
  const { sesion } = useParams();

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

  // Función para almacenar producto.
  const almacenar = async (e) => {
    e.preventDefault();

    // Verificación de que los campos no estén vacíos.
    if (producto === '' || stock === '' || precio === '') {
      cambiarEstadoAlerta(true);
      cambiarAlerta({
        tipo: 'error',
        mensaje: 'Debes completar todos los campos.'
      });
      return;
    }



    // Vinculación con los campos.
    await setDoc(doc(db, "mercaderiasInt", producto), 
    { producto: producto, stock: stock, precio: precio, proveedor: proveedor, descripcion: descripcion, categoria: categoria, estado: estado });

    new MySwal({
      title: "Ingreso éxitoso",
      text: "Producto ingresado al sistema.",
      icon: "success",
      button: "aceptar",
    });

    navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
  }




  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Registrar mercaderías internacionales</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>

      <ContenedorFormulario id='tamaño-contenedor-formulario-mercaderias'>
        <ContenedorTituloRegistro>
          <h1>Agregar mercadería exterior</h1>
        </ContenedorTituloRegistro>

        <FormularioRegistro onSubmit={almacenar} id='tamaño-formulario-mercaderias'>

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

export default RegistrarMercaderia;
