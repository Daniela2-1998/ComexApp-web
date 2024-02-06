import React, { useState } from 'react';

import { Helmet, HelmetProvider } from 'react-helmet-async';

import { useNavigate, useParams } from 'react-router-dom';

// Imports firebase
import { db } from '../firebase/FirebaseConfig';

import { doc, setDoc } from 'firebase/firestore';

// Imports estilos
import {
  ContenedorFormulario, ContenedorTituloRegistro, ContenedorCamposRegistro, TituloCamposRegistro, FormularioRegistro,
  CamposRegistro, EspacioSelectsRegistro, ContenedorBotonesRegistro, BotonIngresoRegistro
} from '../components/ElementosFormulario';
import SelectCategoria from '../components/SelectCategoria';
import SelectEstadoMercaderia from '../components/SelectEstadoMercaderia';
import SelectProveedor from '../components/SelectProveedor';
import BotonRegresar from '../components/BotonRegresar';
import Alerta from '../components/Alerta';

//import {useStorage } from "reactfirebase";
//import {useStorage} from "firebase/storage";
import { getStorage, ref, uploadBytes } from "firebase/storage";



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

  const [imagen, setImagen] = useState();

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
    await setDoc(doc(db, "mercaderiasInt", producto), { producto: producto, stock: stock, precio: precio, proveedor: proveedor, categoria: categoria, estado: estado, img: imagen });


    navigate(`/comercio-exterior/mercaderias/${nombre}/${usuario}/${rol}/${sesion}`);
  }

  //OBTENIENDO LA IMAGEN
  const changeImagen = e => {
    setImagen(e.target.files[0]);
    console.log(imagen);

  }


  //FUNCION PARA GUARDAR LA IMAGEN EN FIREBASE
  /*const uploadImage = async () => {
    const storage = getStorage();
    try {
      const newRef = storage.ref('images').child(imagen.name); // nombre del archivo
      setRef(newRef);
      await newRef.put(imagen);
      let urlImagen = await newRef.getDownloadURL()
      console.log('la ul de la imagen es' + urlImagen);
    } catch (error) {
      alert(error);
    }
  };
*/

  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Registrar mercaderías internacionales</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>

      <ContenedorFormulario>
        <ContenedorTituloRegistro>
          <h1>Agregar mercadería exterior</h1>
        </ContenedorTituloRegistro>

        <FormularioRegistro onSubmit={almacenar}>

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

          <ContenedorCamposRegistro>
            <TituloCamposRegistro>Subir imágen:</TituloCamposRegistro>
            <CamposRegistro
              value={imagen}
              name='imagen'
              onChange={(e) => changeImagen}
              type="file"
            />
          </ContenedorCamposRegistro>

          <ContenedorCamposRegistro>
            <TituloCamposRegistro>Proveedor:</TituloCamposRegistro>
            <SelectProveedor
              proveedor={proveedor}
              setProveedor={setProveedor}
            />
          </ContenedorCamposRegistro>

          <ContenedorCamposRegistro>
            <TituloCamposRegistro>Categoría:</TituloCamposRegistro>
            <SelectCategoria
              categoria={categoria}
              setCategoria={setCategoria}
            />
          </ContenedorCamposRegistro>

          <ContenedorCamposRegistro>
            <TituloCamposRegistro>Estado:</TituloCamposRegistro>
            <SelectEstadoMercaderia
              estado={estado}
              setEstado={setEstado}
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
