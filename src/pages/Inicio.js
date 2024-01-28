import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { Helmet, HelmetProvider } from "react-helmet-async";

// Imports estilos.
import styled from 'styled-components';
import '../css/Inicio.css';

// Import Firebase.
import { db } from '../firebase/FirebaseConfig';
import { getDoc, doc } from "firebase/firestore";

// Import componentes
import Encabezado from '../components/Encabezado';
import MenuOpcionesInicio from '../components/MenuOpcionesInicio';

// Import páginas.


function Inicio() {

  // Estados y parámetro.
  const {usuario} = useParams();

  const [nombre, setNombre] = useState('');
  const [rol, setRol] = useState('');
  const [area, setArea] = useState('');

  

  // Función de recupero de datos relevantes del usuario.
  const recuperarNombreRolYArea = async (usuario) => {
    const usuarioFirebase = await getDoc(doc(db, "usuarios", usuario));
    if (usuarioFirebase.exists()) {
      setNombre(usuarioFirebase.data().nombre);
      setRol(usuarioFirebase.data().rol);
      setArea(usuarioFirebase.data().area);
    }
  }

  const pasarElRol = (rol) => {
    setRol(rol);
  }


  useEffect(() => {
    recuperarNombreRolYArea(usuario);
  }, []);


  return (
    <>
      <HelmetProvider>
        <Helmet>
          <title>Inicio de {nombre}</title>
          <link rel='icon' href="../images/logo.png" />
        </Helmet>
      </HelmetProvider>

      <ContenedorGeneralInicio>

        <Encabezado pasarElRol={rol} />

        <MenuOpcionesInicio pasarElRol={rol} />

        <ContenedorSaludoEImagen>
          <ContenedorBienvenida>
            <h1>¡Bienvenido a ComexApp!</h1>
            <h4>Sesión de {nombre}</h4>
            <p>
              En este sistema podrás gestionar las operaciones nacionales e internacionales de la empresa, llevar una agenda personal o general de contactos 
              y administrar el stock de mercaderías, suministros y materias primas. 
            </p>
          </ContenedorBienvenida>

          <figure className='imagen'></figure>
        </ContenedorSaludoEImagen>

      </ContenedorGeneralInicio>
    </>
  )
}



const ContenedorGeneralInicio = styled.div`
  display: flex;
  flex-direction: column;
`;

const ContenedorSaludoEImagen = styled.div`
  display: flex;
`;

const ContenedorBienvenida = styled.div`
  width: 25%;
  background-color: #1A1594;
`;



export default Inicio;
